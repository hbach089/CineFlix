navObj={
  'n1':document.getElementById('nav_l1'),
  'n2':document.getElementById('nav_l2'),
  'n3':document.getElementById('nav_l3'),
  'n4':document.getElementById('nav_l4'),
};

let divText=document.createElement('div');
let option='';
divText.setAttribute("id", "messageBox");

let image = document.createElement('img');
image.setAttribute('id','famimg');

let h1=document.createElement('h1');
let h3=document.createElement('h3');

let d=document.createElement('h2');

window.onload=navL1();

async function navL1(){
  option='home';
  navObj['n1'].style.pointerEvents = 'none';
  for(let i in navObj){
    if(i!='n1'){
      navObj[i].style.pointerEvents = 'auto';
    }
  }

  divText.innerHTML='';
  image.src='fam.png';
  h1.innerHTML='Unleash the Power of CineFlix';
  h3.innerHTML="Check out our Offerings!";

  divText.appendChild(h1);
  divText.appendChild(h3);

  document.body.appendChild(divText);
  document.body.appendChild(image);  
  if(lol=='nice'){
    // window.scrollTo(0, 547.3333129882812);
    // if(window.scrollY!=547.3333129882812){
    //   console.log('niceeeeeee');
    //   div.scrollIntoView();  
    // }
    // d.innerHTML="FEATURED";
    // document.body.appendChild(d);
    let dispCnt=await DisplayMovies();
    if(dispCnt==0){
      d.innerHTML="";
    }
    else{
      d.innerHTML="FEATURED";
    }
    document.body.appendChild(d);
  }
};


navObj['n2'].addEventListener('click',async function(){
  option='movie';
  navObj['n2'].style.pointerEvents = 'none';
  for(let i in navObj){
    if(i!='n2'){
      // console.log(i+" et "+navObj[i]);
      navObj[i].style.pointerEvents = 'auto';
    }
  }  
  

  divText.innerHTML='';

  image.src = "movie.png";

  h1.innerHTML='Your Movie Adventure Starts Here';
  h3.innerHTML="Up Up and Away!";

  divText.appendChild(h1);
  divText.appendChild(h3);

  document.body.appendChild(divText);
  document.body.appendChild(image);
  if(lol=='nice'){
    // window.scrollTo(0, 547.3333129882812);
    // if(window.scrollY!=547.3333129882812){
    //   console.log('niceeeeeee');
    //   div.scrollIntoView();  
    // }
    // let d=document.createElement('h2');
    // d.innerHTML="MOVIES";
    // document.body.appendChild(d);
    let dispCnt=await DisplayMovies();
    if(dispCnt==0){
      d.innerHTML="";
    }
    else{
      d.innerHTML="MOVIES";
    }
    
    document.body.appendChild(d);
  }
});

navObj['n3'].addEventListener('click',async function(){
  option='series';
  navObj['n3'].style.pointerEvents = 'none';
  for(let i in navObj){
    if(i!='n3'){
      // console.log(i+" et "+navObj[i]);
      navObj[i].style.pointerEvents = 'auto';
    }
  }
  divText.innerHTML='';

  image.src = "series.png";

  h1.innerHTML='Binge-Worthy TV Awaits';
  h3.innerHTML='Tune into Greatness...';

  divText.appendChild(h1);
  divText.appendChild(h3);

  document.body.appendChild(divText);
  document.body.appendChild(image);
  if(lol=='nice'){
    // window.scrollTo(0, 547.3333129882812);
    // if(window.scrollY!=547.3333129882812){
    //   console.log('niceeeeeee');
    //   div.scrollIntoView();  
    // }
    // let d=document.createElement('h2');
    // d.innerHTML="TV";
    // document.body.appendChild(d);
    let dispCnt=await DisplayMovies();
    if(dispCnt==0){
      d.innerHTML="";
    }
    else{
      d.innerHTML="TV";
    }
    
    document.body.appendChild(d);
  }
});

navObj['n4'].addEventListener('click',async function(){
  option='game';
  navObj['n4'].style.pointerEvents = 'none';
  for(let i in navObj){
    if(i!='n4'){
      // console.log(i+" et "+navObj[i]);
      navObj[i].style.pointerEvents = 'auto';
    }
  }

  divText.innerHTML='';

  image.src = "games.png";
  
  h1.innerHTML='From Screen to Console';
  h3.innerHTML='Relive the Action!';


  divText.appendChild(h1);
  divText.appendChild(h3);

  document.body.appendChild(divText);
  document.body.appendChild(image);
  if(lol=='nice'){
    // window.scrollTo(0, 547.3333129882812);
    // if(window.scrollY!=547.3333129882812){
    //   console.log('niceeeeeee');
    //   div.scrollIntoView();  
    // }
    // let d=document.createElement('h2');
    
    let dispCnt=await DisplayMovies();
    if(dispCnt==0){
      d.innerHTML="";
    }
    else{
      d.innerHTML="GAMING";
    }
    
    document.body.appendChild(d);
  }
});

document.getElementById('searchit').addEventListener('click',function(){
  window.scrollTo(0, 0);
})