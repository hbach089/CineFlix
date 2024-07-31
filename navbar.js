navObj={
  'n1':document.getElementById('nav_l1'),
  'n2':document.getElementById('nav_l2'),
  'n3':document.getElementById('nav_l3'),
  'n4':document.getElementById('nav_l4'),
};
let ptag=document.createElement('p');

navObj['n1'].addEventListener('click',function(){
  ptag.innerHTML='movies omgggg'
  navObj['n1'].style.pointerEvents = 'none';
  for(let i in navObj){
    if(i!='n1'){
      console.log(i+" et "+navObj[i]);
      navObj[i].style.pointerEvents = 'auto';
    }
  }
  document.body.appendChild(ptag);
});

navObj['n2'].addEventListener('click',function(){
  ptag.innerHTML='shows';
  navObj['n2'].style.pointerEvents = 'none';
  for(let i in navObj){
    if(i!='n2'){
      console.log(i+" et "+navObj[i]);
      navObj[i].style.pointerEvents = 'auto';
    }
  }
  document.body.appendChild(ptag);
});

navObj['n3'].addEventListener('click',function(){
  ptag.innerHTML='GAMESSS';
  navObj['n3'].style.pointerEvents = 'none';
  for(let i in navObj){
    if(i!='n3'){
      console.log(i+" et "+navObj[i]);
      navObj[i].style.pointerEvents = 'auto';
    }
  }
  document.body.appendChild(ptag);
});

navObj['n4'].addEventListener('click',function(){
  ptag.innerHTML='Alll erythang!';
  navObj['n4'].style.pointerEvents = 'none';
  for(let i in navObj){
    if(i!='n4'){
      console.log(i+" et "+navObj[i]);
      navObj[i].style.pointerEvents = 'auto';
    }
  }
  document.body.appendChild(ptag);
});
