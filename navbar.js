navObj={
  'n1':document.getElementById('nav_l1'),
  'n2':document.getElementById('nav_l2'),
  'n3':document.getElementById('nav_l3'),
  'n4':document.getElementById('nav_l4'),
};
let div=document.createElement('div');
let h1=document.createElement('h1');
let h3=document.createElement('h3');

// window.onload=navL1()

function navL1(){
  navObj['n1'].style.pointerEvents = 'none';
  for(let i in navObj){
    if(i!='n1'){
      console.log(i+" et "+navObj[i]);
      navObj[i].style.pointerEvents = 'auto';
    }
  } 
  h1.innerHTML='Unleash the Power of CineFlix';
  h3.innerHTML="Check out our Offerings!";

  div.setAttribute("id", "messageBox");
  
  div.appendChild(h1);
  div.appendChild(h3);
  document.body.appendChild(div);
};


navObj['n2'].addEventListener('click',function(){
 
  navObj['n2'].style.pointerEvents = 'none';
  for(let i in navObj){
    if(i!='n2'){
      console.log(i+" et "+navObj[i]);
      navObj[i].style.pointerEvents = 'auto';
    }
  }  

  h1.innerHTML='LOOOOOOOL';
  h3.innerHTML='wtf!';
  div.setAttribute("id", "messageBox");
  
  div.appendChild(h1);
  div.appendChild(h3);
  document.body.appendChild(div);
});

navObj['n3'].addEventListener('click',function(){
  navObj['n3'].style.pointerEvents = 'none';
  for(let i in navObj){
    if(i!='n3'){
      console.log(i+" et "+navObj[i]);
      navObj[i].style.pointerEvents = 'auto';
    }
  }
});

navObj['n4'].addEventListener('click',function(){
  navObj['n4'].style.pointerEvents = 'none';
  for(let i in navObj){
    if(i!='n4'){
      console.log(i+" et "+navObj[i]);
      navObj[i].style.pointerEvents = 'auto';
    }
  }
});
