

const monthly=document.getElementById('monthly');
const yearly=document.getElementById('yearly');

const basic=document.getElementById('price1'),premium=document.getElementById('price2'),family=document.getElementById('price3');

monthly.addEventListener('click',function(){
  monthly.style.color='black';
  monthly.style.backgroundColor='rgba(207, 207, 25, 0.731)';

  yearly.style.color='white';
  yearly.style.backgroundColor='blueviolet';
  
  basic.innerHTML='$7.99/Monthly';
  premium.innerHTML='$12.99/Monthly';
  family.innerHTML='$16.99/Monthly';
});

yearly.addEventListener('click',function(){
  monthly.style.color='white';
  monthly.style.backgroundColor='blueviolet';

  yearly.style.color='black';
  yearly.style.backgroundColor='rgba(207, 207, 25, 0.731)';

  basic.innerHTML='$95.88/Yearly';
  premium.innerHTML='$155.88/Yearly';
  family.innerHTML='$203.88/Yearly';
});

