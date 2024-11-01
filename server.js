import express, { urlencoded } from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import crypto from 'crypto';
import sqlite3 from 'sqlite3';
import session from 'express-session';
import { resolve } from 'node:path';
import { rejects } from 'node:assert';

const port_no=5555;
const app=express();

app.use(session({
  secret:'secret-key',
  resave:false,
  saveUninitialized:false
}));


let loginStateChanged = false;

const db=new sqlite3.Database('./movies.db',(err)=>{
  if(err){
    console.log(err.message);
  }
  console.log('Connected to database!');
})

const server = createServer(app);``
const io = new Server(server);


let getAPIinfo={};

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(urlencoded({extended:true}));

/**
 * If user already logged in, automatically redirect him to homepage
 */
app.get('/',(req,res)=>{
  if(req.session.user){
    res.redirect('/movies');
  }
  else{
    res.render('index',{data:''})
  }
})
  

/**
 * Logout route
 */
app.all('/logout',(req,res)=>{
  loginStateChanged=false;

  //Destroys user session object
  req.session.destroy((err)=>{
    if(err){
      res.status(500).send('Internal server error!');
    }
    else{
      res.redirect('/')
    }
  });
})

/**
 * Render movies page
 */
app.get('/movies',(req,res)=>{
  if(req.session.user){
    res.render('movies');
  }
  else{
    res.redirect('/');
  }
})


/**
 * After user login or signup,
 * post data to homepage
 */
app.post('/movies',async (req,res)=>{
    const sessionData=req.session;
    loginStateChanged=false;
    if(req.body.Submit=='Login'){
      let uname=req.body.uname;
      let pword=req.body.pword;
      if(pword=='' && uname==''){
            res.status(200).json({data:{message:'Enter valid credentials!',bgcolor:'upcolor',loginOrsignup:'login',uname:uname,pword:pword}});
          }
      else if(pword==''){
        res.status(200).json({data:{message:'Please enter a password!',fieldval:uname,bgcolor:'pcolor',loginOrsignup:'login',uname:uname,pword:pword}});
      }
      else if(uname==''){
        res.status(200).json({data:{message:'Please enter a username!',fieldval:pword,bgcolor:'ucolor',loginOrsignup:'login',uname:uname,pword:pword}});
      }
      //If both fields have been completed
      else{
          // Promise to verify if user (username,password) coresponds to an entry in the database
          try{
            // On a resolve, redirect to /movies route, i.e successful login 
            await userInDatabase(uname,pword);
            loginStateChanged=true;

            sessionData.user=uname;
            sessionData.SignedIn=false;

            res.status(200).json({data:{message:'redirectOnSuccess'}});
          }
          catch(error){
            // On a reject, render the index page with an error message, i.e failed login
            console.log(error);
            res.status(200).json({data:{message:'Wrong credentials! Try again or sign up.',loginOrsignup:'login'}})
          }
        }
    }  
    else if(req.body.Submit=='SignUp'){
      //If any of the signup fields are empty
        if(req.body.reguname=='' || req.body.regpword=='' || req.body.regconfpword==''){
          res.status(200).json({data:{message:'Please Complete all Fields!',loginOrsignup:'signup'}});
        }
        //If the signup fields have all been completed
        else{
          let uname_verify=verifyUsername(req.body.reguname);
          let pword_verify=verifyPassword(req.body.regpword);
          let pwordsEqual=passwordEqualConf(req.body.regpword,req.body.regconfpword);
          
          let uname=req.body.reguname,pword=req.body.regpword;
  
          let uuid=crypto.randomUUID();
  
          //If the username or passwords does not match the corresponding syntax, 
          // or the password and confirm passwords do not match
          if(uname_verify==false || pword_verify==false || pwordsEqual==false){
            res.status(200).json({data:{message:'Passwords Must Match!',loginOrsignup:'signup',m1:uname_verify,m2:pword_verify,m3:pwordsEqual}});
          }
          else{
            //Promise to find if username is taken
            try{
              //Promise will always resolve for uuid
              let checkeduuid=await checkUUIDexits(uuid,res);
  
              //Promise may reject if username exists
              let checkeduname=await checkUnamexists(uname,res);
              
              sessionData.user=checkeduname;
              sessionData.uid=checkeduuid;
              sessionData.SignedIn=true;
              //Insert in the database
              const sql='INSERT INTO User(uid,username,password) VALUES (?,?,?)';
              db.run(sql,[checkeduuid,checkeduname,pword],function(err){
                if(err){
                  console.log(err);
                  res.status(500).send('Internal server error');
                }
              })
              //If all is good, Promise is resolved and we redirect to /movies route
              loginStateChanged = true;
              res.status(200).json({data:{message:'redirectOnSuccess'}});
            }
            //If username exists, index page is rendered
            catch(error){
              console.log(error);
              res.status(200).json({data:{message:'Username: '+uname+' is already in use!',loginOrsignup:'signup'}});
            }
          }
        }    
    } 
})

/**
 * View pricing page, when user clicks on movies displayed
 */
app.get('/movies/Prices',(req,res)=>{
  if(req.session.user){
    res.render('priceofferings')
  }
  else{
    res.redirect('/');
  }
})

/**
 * User Update or Delete page (based on button clicked in options)
 */
app.get('/User/:UpdOrDel',async(req,res)=>{
  let userUid;
  if(req.session.user){
    try{
      //find user uuid in database
      userUid=await findUser(req.session.user,res);
    }
    catch(err){
      res.status(500).send("Internal Sever Error.");
      console.log(err);
    }
    res.render('uptoordel',{data:{UpdOrDel:req.params.UpdOrDel,uuid:userUid.uid}});
  }
  else{
    res.redirect('/');
  }
  
})


/**
 * Route when user submits data to delete or update.
 */
app.post('/User/:UptOrDel',async(req,res)=>{
  let uname=req.body.uname;
  let pword=req.body.pword;
  let confpword=req.body.confpword;

  //If any fields are empty
  if(uname=='' || pword=='' || confpword==''){
    res.status(200).json({message:'Please Complete all Fields!',errm:'e1'})
  }
  else{
    try{
      //checks if user is in Database
      await userInDatabase(uname,pword);
      res.status(200).json({message:'success'});
    }
    catch{
      //wrong credentials
      res.status(200).json({message:'Wrong Credentials. Try again!',errm:'e3'});
    }
  }
})


/**
 * Route if user successfuly authenticated to update credentials
 */
app.get('/User/Update/:urlUUID',async(req,res)=>{
  if(req.session.user){
    try{
        //find user credentials based on UUID of logged in user
        let userCreds=await findUserToUpdate(req.params.urlUUID);
        res.render('changeFields',{data:{uuid:req.params.urlUUID,uname:userCreds.username,pword:userCreds.password}});
    }
    catch(error){
      res.status(500).send("Internal Server Error");
    }
  }
  else{
    res.redirect('/');
  }
  
})

/**
 * Put route for updating user credentials (on button click)
 */
app.put('/User/Update/:urlUUID',async(req,res)=>{
  let putuname=req.body.uname, putpword=req.body.pword;
  let dbuname,dbpword;

  try{
    //find user credentials based on UUID of logged in user
    let userCreds=await findUserToUpdate(req.params.urlUUID);
    dbuname=userCreds.username;
    dbpword=userCreds.password;
  }
  catch(error){
    res.status(500).send("Internal Server Error");
  }

  //error handling when user submits data
  if(putuname=='' || putpword==''){
    res.status(200).json({message:'Fields Cannot be Empty!'});
  }
  else if(putuname==dbuname && putpword==dbpword){
    res.status(200).json({message:'Please Update at Least One of the Fields!'});
  }
  else{
    if((verifyUsername(putuname)==false || verifyPassword(putpword)==false)){
      res.status(200).json({message:'Credentials must Follow Correct Format!'});
    }
    else{
      //When user enters valid credentials
        try{
          //async function that updates user in database
          await updateUser(req.params.urlUUID,putuname,putpword);
          res.status(200).json({message:'SUCCESS ON UPDATE!!.'});
        }
        catch(err){
          res.status(500).send("Internal Server Error");
        }
    }
    
  }
 
  //get le uname et pword de la db et affiche sur la page.
  //sinon, si on appuie sur le btn, on update dans la db avec les valeurs qu on veut!
  // res.send('MESSAGE INHIAR MFFFFF');
})

/**
 * Delete user route
 */
app.delete('/User/Delete/:urlUUID',async(req,res)=>{
  //try catch, delete user on success et redirect au homepage(index), sinon internal server error
  try{
    //function that deletes user in database based on UUID of logged in user
    await deleteUser(req.params.urlUUID);
    res.status(200).json({message:'success'});
  }
  catch(error){
    res.status(500).send('Interal Server Error');
  }
})


//Delete the user from the DB
function deleteUser(uuid){
  return new Promise((resolve,reject)=>{
    const sql='DELETE FROM User WHERE uid = (?)';
    db.run(sql, [uuid], (err) => {
      if(err)
          reject(err);
      else
          resolve();
    });
  })
}




//Socket IO to dynamically display API data
io.on('connection',(socket)=>{
  let obj;
  // socks=socket;
  socket.on("HIIII",(msg)=>{
    console.log(msg);
  })
  socket.on('retrieveJSON',(nameNsection)=>{
    api(nameNsection).then(ret=>{
      obj=ret;
      socket.emit('JSONretrieved',obj); 
    })
  })
})


//Username must be at least 6 chars long
function verifyUsername(uname){
  return uname.length>=6;
}

//Password must be contain a number and a special char
function verifyPassword(pword){
  console.log(pword+'      et    '+pword.length);
  let hasNumber = /\d/;
  let hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  let ans=hasNumber.test(pword) && hasSpecialChar.test(pword);
  return ans && pword.length>=7; 
}

//Password and confirm password must match
function passwordEqualConf(pword,confpword){
  return !(pword!=confpword);
}

//Verify if UUID already exists
function checkUUIDexits(uuid,res){
  return new Promise(function(resolve){
    getUUID(uuid,res);
    function getUUID(uuid,res){
      const sqlselect='SELECT uid,username FROM User WHERE uid=?';
      db.get(sqlselect,[uuid],(err,rows)=>{
        if (err){
          console.log(err);
          res.status(500).send('Internal server error');
        }
        else{
          console.log(rows);
          if(rows){
            if(rows.uid==uuid){
              while(uuid==rows.uid){
                uuid=crypto.randomUUID();
                getUUID(uuid,res);
              }
            }
          }
          resolve(uuid);
        }
      })
    }
  })
}

//Verify if username already in use
function checkUnamexists(uname,res){
  return new Promise((resolve,reject)=>{
    const sql='SELECT username FROM User WHERE username=?';
    db.get(sql,[uname],(err,rows)=>{
      if(err){
        console.log(err);
        res.status(500).send('Internal server error');
      }
      else{
        console.log(rows);
        if(rows==undefined){
          resolve(uname);
        }
        else{
          reject(undefined);
        }
      }
    })
  })            
}

//Verfiy if username/password exists in database (when user tries to login)
function userInDatabase(uname,pword){
  return new Promise((resolve,reject)=>{
    const sql='SELECT username,password FROM User WHERE username=? AND password=?';
    db.get(sql,[uname,pword],(err,rows)=>{
      if(err){
        res.status(500).send("Internal server database error");
      }
      else{
        if(rows){
          resolve(true);
        }
        else{
          reject(false);
        }
      }
    })
  })
}

//find full user credentials (including uuid) based on username
function findUser(uname,res){
  return new Promise((resolve,reject)=>{
    const sql='SELECT uid,username,password FROM User WHERE username=?';
    db.get(sql,[uname],(err,rows)=>{
      if(err){
        res.status(500).send("Internal server database error");
      }
      else{
        if(rows){
          resolve(rows);
        }
        else{
          reject(undefined);
        }
      }
    })
  })
}

//Finds user to update based on uuid
function findUserToUpdate(uuid){
  return new Promise((resolve,reject)=>{
    const sql='SELECT username,password FROM User WHERE uid=?';
    db.get(sql,[uuid],(err,rows)=>{
      if(err){
        res.status(500).send("Internal server database error");
      }
      else{
        if(rows){
          resolve(rows);
        }
        else{
          reject(undefined);
        }
      }
    })
  })
}

//Update user in database based on uuid of logged in user
function updateUser(uuid,newuname,newpword){
  return new Promise((resolve,reject)=>{
    const sql='UPDATE User SET username=(?),password=(?) WHERE uid=(?)';
    db.run(sql,[newuname,newpword,uuid],(err)=>{
      if(err){
        reject(err);
      }
      else{
        resolve(true);
      }
    });
  });
}

//Function that performs API call (Movie Database Alternative API )
async function api(searchVal){
  const url = 'https://movie-database-alternative.p.rapidapi.com/?s='+searchVal[0]+'&r=json&page=2';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '731e5a6f55mshc5cc4c1d3740e9dp1cc44fjsnbe080a73f098',
      'x-rapidapi-host': 'movie-database-alternative.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    
    //Object of arrays that contains info about each movie (Title, Year, Poster, Type)
    for(let i in result.Search){
        let arr=[];
        arr[0]=result.Search[i].Title;
        arr[1]=result.Search[i].Year;
        arr[2]=result.Search[i].Poster;
        arr[3]=result.Search[i].Type;
        getAPIinfo['m'+i]=arr;
    }
  } catch (error) {
    console.error(error);
  }
  return getAPIinfo;
}

server.listen(port_no, () => {
  console.log('listening on *:'+port_no);
});






// PASSE UNE AUTRE VALEUR DANS LE DATA POUR LA COULEUR DES CHAMPS USERNAME ET PASSWORD!!!!!