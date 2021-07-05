const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
getMovies();

const main = document.getElementById('main');
const form = document.getElementById("form");
const search = document.getElementById("search");
const btn = document.getElementById("btn");


getMovies(APIURL)

async function getMovies(URL){
  const resp =  await fetch(URL);
  const respData = await resp.json();
//  
  console.log(respData);
  showMovies(respData.results, main, btn, moviesDisplay, current_page);
  

}

let current_page = 1;
let moviesDisplay = 6;

function showMovies(movies, main, btn, moviesDisplay, page){
    // clear initial display
    main.innerHTML = '';
    page--;
    let start = moviesDisplay * page;
    let end = start + moviesDisplay;
    let paginatedNum = movies.slice(start,end);
    paginatedNum.forEach(movie => {
      const {poster_path, title, vote_average, overview} = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
        <img src="${IMGPATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getMoviesByRate(vote_average)}">${vote_average}</span>
        </div>    
        <div class="overview">
                <h3>Overview:${overview}</h3>
        </div>
        
        `;
      main.appendChild(movieEl);
// return respData;

}) 
    
 setupPagination(movies, main, btn, moviesDisplay, page);
} 

 function setupPagination(movies, main, btn, moviesDisplay, page){

    btn.innerHTML = "";
     let pageCount = Math.ceil(movies.length/moviesDisplay)
         for (let i = 1; i < pageCount+1; i++){
             
            let button = document.createElement("button");
             button.innerText = i;
              if (page == i){
                 button.classList.add('active');
                 console.log(button);
           }
             button.addEventListener('click', ()=>{
                 page = i;
                 showMovies(movies, main, btn, moviesDisplay, page);
                 let current_btn = document.querySelector("button.active");
                 current_btn.classList.remove("active");
                 button.classList.add("active")
            })
        
            btn.appendChild(button);
        }

//    btn.appendChild(button);
 }
       

function getMoviesByRate(vote){
    if (vote >= 8){
        return "green";
    }
    else if (vote >=5){
        return "orange"
    }
    else{
        return "red"
    }
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    

const searchTerm = search.value;

if (searchTerm){
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
}

});

