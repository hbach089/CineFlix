
document.getElementById('monthly').addEventListener('click',function(){
  document.getElementById('monthly').style.color='black';
  document.getElementById('monthly').style.backgroundColor='rgba(207, 207, 25, 0.731)';

  document.getElementById('yearly').style.color='white';
  document.getElementById('yearly').style.backgroundColor='blueviolet';
  
  document.getElementById('price1').innerHTML='$7.99/Monthly';
  document.getElementById('price2').innerHTML='$12.99/Monthly';
  document.getElementById('price3').innerHTML='$16.99/Monthly';

});

document.getElementById('yearly').addEventListener('click',function(){
  document.getElementById('monthly').style.color='white';
  document.getElementById('monthly').style.backgroundColor='blueviolet';

  document.getElementById('yearly').style.color='black';
  document.getElementById('yearly').style.backgroundColor='rgba(207, 207, 25, 0.731)';

  document.getElementById('price1').innerHTML='$95.88/Yearly';
  document.getElementById('price2').innerHTML='$155.88/Yearly';
  document.getElementById('price3').innerHTML='$203.88/Yearly';
  
});

