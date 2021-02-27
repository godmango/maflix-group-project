const API_KEY = "3cd1c18091a1d48a1f168e8bc2667d61";

let movieList = [];
let popularPage = 1;
let latestPage = 1;
let peoplePage = 1;
let searchPage = 1;

const urlOptions = {
  category: "person",
  searchBy: "popular",
};

//getting data for popular movies
const getArticle = async () => {
  const response = await fetch(
    //this is url for getting popular data
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${popularPage}`
  );
  const data = await response.json();
  renderArticles(data.results, "movie-list");
};

// getting data for latest movies
const getLatest = async () => {
  let link = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${latestPage}`;
  const data = await fetch(link);
  const result = await data.json();
  console.log("GOT DATA", result);
  renderArticles(result.results, "movie-list");
};

const renderArticles = (data, location) => {
  let theMovieList = data
    .map((movieData) => {
      // onClick="showModal(${movieData.id})" can be added if needed
      return `<div class="singleMovieDiv">
      <img class="everyImage" src="https://image.tmdb.org/t/p/w220_and_h330_face${movieData.poster_path}" alt=""/>
      <h3>${movieData.title}</h3>
  <p class="makeItalic">${movieData.release_date}</p>
  <p>Rating: ${movieData.vote_average}/10</p>
  </div>`;
    })
    .join("");

  movieList.push(theMovieList);

  document.getElementById(location).innerHTML = movieList;
};

// end of popular -----------------------------------------------

// popular actors/actresses
const getURL = (urlOptions) => {
  // let url = Object.keys(urlOptions).reduce((url, option, type) => {
  //   if (urlOptions[option] || urlOptions[type]) {
  //     url += `${urlOptions[option]}/`;
  //   }
  //   return url;
  // }, `https://api.themoviedb.org/3/`);
  // url += `?api_key=${API_KEY}&language=en-US&page=${peoplePage}`;
  let url = `https://api.themoviedb.org/3/person/popular/?api_key=${API_KEY}&language=en-US&page=${peoplePage}`;
  console.log(url);
  return url;
};

const getActors = async () => {
  const response = await fetch(
    //this is url for getting popular data
    getURL(urlOptions)
  );
  const data = await response.json();
  console.log(data);
  renderActorList(data.results);
};

const renderActorList = (data) => {
  console.log(data);
  let actors = data
    .map((person) => {
      if (person.known_for_department === "Acting") {
        person.known_for_department = "Actor";
      } else if (person.known_for_department === "Production") {
        person.known_for_department = "Producer";
      }
      if (person.profile_path === null) {
        return `<div class="singleMovieDiv">
      <img class="everyImage" src="images/defaultUser.jpg" alt=""/>
      <h3>${person.name}</h3>
      <p>Occupation: ${person.known_for_department}</p>
      <p>Starred in: ${person.known_for[0].title}</p>
      </div>`;
      }
      return `<div class="singleMovieDiv">
      <img class="everyImage" src="https://image.tmdb.org/t/p/w220_and_h330_face${person.profile_path}" alt=""/>
      <h3>${person.name}</h3>
      <p>Occupation: ${person.known_for_department}</p>
      <p>Starred in: ${person.known_for[0].title}</p>
      </div>`;
    })
    .join("");
  movieList.push(actors);
  document.getElementById("movie-list").innerHTML = movieList;
};

// end of popular people ----------------------------------------------

// search function
const startSearch = () => {
  let input = document.getElementById("search").value;
  let url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${input}&page=${searchPage}`;

  getSearchData(url);
};

const getSearchData = async (url) => {
  let spaceData = await fetch(url);
  let dataDone = await spaceData.json();
  console.log("get data done and tranlate to HTML", dataDone);
  console.log("Choose", dataDone.results);
  let data = dataDone.results;

  let paragraph = data
    .map((element) => {
      if (element.known_for_department === "Acting") {
        element.known_for_department = "Actor";
      } else if (element.known_for_department === "Production") {
        element.known_for_department = "Producer";
      }
      if (element.poster_path === null) {
        return `<div class="singleMovieDiv">
       <img class="everyImage" src="images/question.png" alt="${element.title}">
       <h3>${element.title} </h3>
       <p>Movie</p>
       <p class="makeItalic">${element.release_date}</p>
      <p>Rating: ${element.vote_average}/10</p>
      </div>`;
      }
      if (element.media_type === "movie") {
        return `<div class="singleMovieDiv">
       <img class="everyImage" src="https://image.tmdb.org/t/p/w220_and_h330_face${element.poster_path}" alt="${element.title}">
       <h3>${element.title} </h3>
       <p>Movie</p>
       <p class="makeItalic">${element.release_date}</p>
      <p>Rating: ${element.vote_average}/10</p>
      </div>`;
      }
      if (element.media_type === "tv") {
        return `<div class="singleMovieDiv">
       <img class="everyImage" src="https://image.tmdb.org/t/p/w220_and_h330_face${element.poster_path}" alt="${element.original_name}">
       <h3>${element.original_name} </h3>
       <p>TV Series</p>
       <p class="makeItalic">${element.first_air_date}</p>
      <p>Rating: ${element.vote_average}/10</p>
      </div>`;
      }
      if (element.media_type === "person") {
        if (element.profile_path === null) {
          return `<div class="singleMovieDiv">
        <img class="everyImage" src="images/defaultUser.jpg" alt=""/>
        <h3>${element.name}</h3>
        <p>Occupation: ${element.known_for_department}</p>
        <p>Starred in: ${element.known_for[0].title}</p>
        </div>`;
        }
        return `<div class="singleMovieDiv">
      <img class="everyImage" src="https://image.tmdb.org/t/p/w220_and_h330_face${element.profile_path}" alt=""/>
      <h3>${element.name}</h3>
      <p>Occupation: ${element.known_for_department}</p>
      <p>Starred in: ${element.known_for[0].title}</p>
      </div>`;
      }
    })
    .join(" ");

  // document.getElementById("main").innerHTML = paragraph;
  movieList.push(paragraph);
  document.getElementById("movie-list").innerHTML = movieList;
};
//end of search function -----------------------------------------

// just to create modal if needed
// const showModal = (movieID) => {
//   alert("here");
//   let modal = document.getElementById("mainModal");
//   modal.style.display = "block";
//   modal.childNodes[1].innerHTML = `${movieID}`;
// };

//button functions and display
const loadMorePopular = () => {
  popularPage++;
  getArticle();
};

const loadMoreLatest = () => {
  latestPage++;
  getLatest();
};

const loadMorePeople = () => {
  peoplePage++;
  getActors();
};
const loadMoreSearch = () => {
  searchPage++;
  startSearch();
};

let emptyMovieList = () => {
  movieList = [];
  document.getElementById("movie-list").innerHTML = movieList;
};

let hideButtonPop = () => {
  let popButton = document.getElementById("pop");
  popButton.style.display = "none";
};
let showButtonPop = () => {
  let popButton = document.getElementById("pop");
  popButton.style.display = "inline-block";
};
let hideButtonLat = () => {
  let latButton = document.getElementById("lat");
  latButton.style.display = "none";
};
let showButtonLat = () => {
  let latButton = document.getElementById("lat");
  latButton.style.display = "inline-block";
};
let hideButtonPep = () => {
  let pepButton = document.getElementById("pep");
  pepButton.style.display = "none";
};
let showButtonPep = () => {
  let pepButton = document.getElementById("pep");
  pepButton.style.display = "inline-block";
};
let hideButtonSer = () => {
  let serButton = document.getElementById("ser");
  serButton.style.display = "none";
};
let showButtonSer = () => {
  let serButton = document.getElementById("ser");
  serButton.style.display = "inline-block";
};

const homepage = () => {
  console.log("homepage working");
  popularPage = 1;
  emptyMovieList();
  getArticle();
  hideButtonLat();
  hideButtonPep();
  hideButtonSer();
  showButtonPop();
};

const latestMovies = () => {
  console.log("latest movie working");
  latestPage = 1;
  emptyMovieList();
  getLatest();
  hideButtonPop();
  hideButtonPep();
  hideButtonSer();
  showButtonLat();
};

const actorsAndActress = () => {
  console.log("actress working");
  peoplePage = 1;
  emptyMovieList();
  getActors();
  hideButtonPop();
  hideButtonLat();
  hideButtonSer();
  showButtonPep();
};

const searchButton = () => {
  console.log("search working");
  searchPage = 1;
  emptyMovieList();
  startSearch();
  hideButtonPop();
  hideButtonLat();
  hideButtonPep();
  showButtonSer();
};

getArticle();
