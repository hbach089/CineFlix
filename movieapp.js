let a=0;


async function DisplayMovies(){
  sessionStorage.removeItem("reloading");
    const url = 'https://movie-database-alternative.p.rapidapi.com/?s='+localStorage.getItem('word')+'&r=json&page=2';
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
      console.log(result);
      console.log(result.Search);

      let div=document.createElement('div');
      div.setAttribute("id", "divwithclasses");
      for(let i in result.Search){

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
        console.log(figElem);
        
        classdiv.appendChild(figElem);
        document.body.appendChild(classdiv);
        console.log(figElem);
        div.appendChild(classdiv);
        document.body.appendChild(div);
      }
      
    } catch (error) {
      console.error(error);
    }
}


document.getElementById('btnit').addEventListener('click',function(){
  sessionStorage.setItem('reloading',true);
  let word=document.getElementById('searchit').value;
  localStorage.setItem('word',word);
  window.location.reload();
});

window.onload=function(){
  var reloading = sessionStorage.getItem("reloading");
  console.log(reloading);
  if(reloading){
    DisplayMovies();
  }
}

document.getElementById('nav_l1').addEventListener('click',function(){
  console.log("LOOOOL");
})