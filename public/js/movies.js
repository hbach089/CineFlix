const socket = io.connect('http://localhost:5555');

    let div=document.createElement('div');
    div.setAttribute("id", "divwithclasses");

    let option='';
    let list;
    document.getElementById('btnit').addEventListener('click',function(){
      socket.emit('retrieveJSON',[document.getElementById('searchit').value,option]);
      socket.on('JSONretrieved',(receivedObj)=>{
        
        list=undefined;
        list=JSON.parse(JSON.stringify(receivedObj));
        dipslayMovies(list);
      })
    });
    let cnt=0;

    function dipslayMovies(list){
      if(div.innerHTML){
        div.innerHTML='';
      }   
      
      for(let i in list){
        if(option=='home'){
          let classdiv = document.createElement('div');
          classdiv.classList.add('divit');

          let figElem = document.createElement('figure');
          figElem.setAttribute("id", i);

          let imageElem = document.createElement('img');
          imageElem.src = list[i][2];

          let figCaptionElem = document.createElement('figcaption');
          figCaptionElem.innerHTML=list[i][0]+", "+list[i][1]+"<br>"+'<i>'+list[i][3]+'</i>';

          figElem.appendChild(imageElem);
          figElem.appendChild(figCaptionElem);

          classdiv.appendChild(figElem);
          document.body.appendChild(classdiv);
          document.getElementById(i).addEventListener('click',function(){
            location.href='http://localhost:5555/movies/Prices'
          })
          
          div.appendChild(classdiv);
        }
        else if(option==list[i][3]){
          let classdiv = document.createElement('div');
          classdiv.classList.add('divit');

          let figElem = document.createElement('figure');
          figElem.setAttribute("id", i);

          let imageElem = document.createElement('img');
          imageElem.src = list[i][2];

          let figCaptionElem = document.createElement('figcaption');
          figCaptionElem.innerHTML=list[i][0]+", "+list[i][1]+"<br>"+'<i>'+list[i][3]+'</i>';

          figElem.appendChild(imageElem);
          figElem.appendChild(figCaptionElem);
          
          classdiv.appendChild(figElem);
          document.body.appendChild(classdiv);
          document.getElementById(i).addEventListener('click',function(){
            location.href='http://localhost:5555/movies/Prices'
          })
         
          div.appendChild(classdiv);
          cnt+=1;
        }
        
      }
      document.body.appendChild(div)
      div.scrollIntoView();
    }



    navObj={
      'n1':document.getElementById('nav_l1'),
      'n2':document.getElementById('nav_l2'),
      'n3':document.getElementById('nav_l3'),
      'n4':document.getElementById('nav_l4'),
    };

    let divText=document.createElement('div');
    divText.setAttribute("id", "messageBox");

    let image = document.createElement('img');
    image.setAttribute('id','famimg');

    let h1=document.createElement('h1');
    let h3=document.createElement('h3');

    let d=document.createElement('h2');

    window.onload=navL1();
    // image.src='fam.png';
    function navL1(){
      console.log("LOL");
      option='home';
      navObj['n1'].style.pointerEvents = 'none';
      for(let i in navObj){
        if(i!='n1'){
          navObj[i].style.pointerEvents = 'auto';
        }
      }

      divText.innerHTML='';
      image.src='/images/fam.png';
      h1.innerHTML='Unleash the Power of CineFlix';
      h3.innerHTML="Check out our Offerings!";

      divText.appendChild(h1);
      divText.appendChild(h3);

      document.body.appendChild(divText);
      document.body.appendChild(image);  

      dipslayMovies(list);

    };

    navObj['n2'].addEventListener('click',function(){
      option='movie';
      navObj['n2'].style.pointerEvents = 'none';
      for(let i in navObj){
        if(i!='n2'){
          navObj[i].style.pointerEvents = 'auto';
        }
      }  
      

      divText.innerHTML='';

      image.src = "/images/movie.png";

      h1.innerHTML='Your Movie Adventure Starts Here';
      h3.innerHTML="Up Up and Away!";

      divText.appendChild(h1);
      divText.appendChild(h3);

      document.body.appendChild(divText);
      document.body.appendChild(image);
      dipslayMovies(list);

    });

    navObj['n3'].addEventListener('click',function(){
      option='series';
      navObj['n3'].style.pointerEvents = 'none';
      for(let i in navObj){
        if(i!='n3'){
          navObj[i].style.pointerEvents = 'auto';
        }
      }
      divText.innerHTML='';

      image.src = "/images/series.png";

      h1.innerHTML='Binge-Worthy TV Awaits';
      h3.innerHTML='Tune into Greatness...';

      divText.appendChild(h1);
      divText.appendChild(h3);

      document.body.appendChild(divText);
      document.body.appendChild(image);
      
      dipslayMovies(list);

    });

    navObj['n4'].addEventListener('click',function(){
      option='game';
      navObj['n4'].style.pointerEvents = 'none';
      for(let i in navObj){
        if(i!='n4'){
          navObj[i].style.pointerEvents = 'auto';
        }
      }

      divText.innerHTML='';

      image.src = "/images/games.png";
      
      h1.innerHTML='From Screen to Console';
      h3.innerHTML='Relive the Action!';


      divText.appendChild(h1);
      divText.appendChild(h3);

      document.body.appendChild(divText);
      document.body.appendChild(image);
      
      dipslayMovies(list);

    });

    document.getElementById('searchit').addEventListener('click',function(){
      window.scrollTo(0, 0);
    })

    // document.getElementById('logout').addEventListener('click',function(){
    //   window.location.replace('http://localhost:5555/');
    // })
    document.getElementById('s1').addEventListener('click',function(){
      window.location.replace('http://localhost:5555/User/Update');
    })
    document.getElementById('s2').addEventListener('click',function(){
      window.location.replace('http://localhost:5555/User/Delete');
    })
    document.getElementById('s3').addEventListener('click',function(){
      window.location.replace('http://localhost:5555/');
    })