const API_KEY = "3cd1c18091a1d48a1f168e8bc2667d61";

let movieList = [];

const getArticle = async () => {
  const response = await fetch(
    //this is url for getting popular data
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  const data = await response.json();
  console.log(data);
  renderArticles(data.results);
};

const renderArticles = (data) => {
  console.log(data);
  let theMovieList = data
    .map((movieData) => {
      return `<h3>Title: ${movieData.title}</h3>
      <img src="http://image.tmdb.org/t/p/w220_and_h330_face${movieData.poster_path}" alt=""/>
  <p>${movieData.overview}</p>`;
    })
    .join("");
  document.getElementById("movie-list").innerHTML = theMovieList;
};
getArticle();
