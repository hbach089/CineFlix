
let div=document.createElement('div');
div.setAttribute("id", "divwithclasses");

let lol='wtf',clicked=false;

async function DisplayMovies(){
  if(div.innerHTML){
    div.innerHTML='';
  }
  let word=document.getElementById('searchit').value;/*localStorage.getItem('word')*/
  sessionStorage.removeItem("reloading");
    const url = 'https://movie-database-alternative.p.rapidapi.com/?s='+word+'&r=json&page=2';
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
      // console.log(result);
      // console.log(result.Search);
      lol='nice';
            
      for(let i in result.Search){
        
        if(option=='home'){
          let classdiv = document.createElement('div');
          classdiv.classList.add('divit');

          let figElem = document.createElement('figure');
          let imageElem = document.createElement('img');
          imageElem.src = result.Search[i].Poster;

          let checkImageSrc=imageElem.src.slice(imageElem.src.length-3,imageElem.src.length);
          if(checkImageSrc=='N/A'){
            continue;
          }
          let figCaptionElem = document.createElement('figcaption');
          // figCaptionElem.textContent = result.Search[i].Title+", "+result.Search[i].Year+"\r\n"+result.Search[i].Type;
          figCaptionElem.innerHTML=result.Search[i].Title+", "+result.Search[i].Year+"<br>"+result.Search[i].Type;

          figElem.appendChild(imageElem);
          figElem.appendChild(figCaptionElem);
          // console.log(figElem);
          
          classdiv.appendChild(figElem);
          document.body.appendChild(classdiv);
          // console.log(figElem);
          div.appendChild(classdiv);
          console.log(result.Search[i].Type);
        }
        else if(option==result.Search[i].Type){
          let classdiv = document.createElement('div');
          classdiv.classList.add('divit');

          let figElem = document.createElement('figure');
          let imageElem = document.createElement('img');
          imageElem.src = result.Search[i].Poster;

          let checkImageSrc=imageElem.src.slice(imageElem.src.length-3,imageElem.src.length);
          if(checkImageSrc=='N/A'){
            continue;
          }
          let figCaptionElem = document.createElement('figcaption');
          figCaptionElem.textContent = result.Search[i].Title+", "+result.Search[i].Year;
          
          figElem.appendChild(imageElem);
          figElem.appendChild(figCaptionElem);
          // console.log(figElem);
          
          classdiv.appendChild(figElem);
          document.body.appendChild(classdiv);
          // console.log(figElem);
          div.appendChild(classdiv);
          console.log(result.Search[i].Type);
        }
        
      }
      document.body.appendChild(div);

      
    } catch (error) {
      console.error(error);
    }
  // div.scrollIntoView();
  console.log(option+'  and   '+clicked+" LOOOOOLmao");
  if(option=='home' && clicked==true){
    div.scrollIntoView();  
    // let d=document.createElement('h2');
    d.innerHTML="FEATURED";
    document.body.appendChild(d);
  }
  else if(option=='movie' && clicked==true){
    div.scrollIntoView();  
    // let d=document.createElement('h2');
    d.innerHTML="movies";
    document.body.appendChild(d);
  }
  else if(option=='series' && clicked==true){
    div.scrollIntoView();  
    // let d=document.createElement('h2');
    d.innerHTML="TV";
    document.body.appendChild(d);
  }
  else if(option=='game' && clicked==true){
    div.scrollIntoView();  
    // let d=document.createElement('h2');
    d.innerHTML="GAMING";
    document.body.appendChild(d);
  }
  clicked=false;
}


document.getElementById('btnit').addEventListener('click',function(){
  // sessionStorage.setItem('reloading',true);
  // let word=document.getElementById('searchit').value;
  // localStorage.setItem('word',word);
  // window.location.reload();
  clicked=true;
  if(div.innerHTML){
    div.innerHTML='';
  }
  console.log(option+' sur quoi on clique');
  DisplayMovies();
});

// window.onload=function(){
//   var reloading = sessionStorage.getItem("reloading");
//   console.log(reloading);
//   if(reloading){
//     DisplayMovies();
//   }
// }

document.getElementById('nav_l1').addEventListener('click',function(){
  console.log("LOOOOL");
})

