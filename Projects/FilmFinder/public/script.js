const tmdbKey = '4139065743fab6ddaba5e119611cf67c';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list' 
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = tmdbBaseUrl+genreRequestEndpoint+requestParams
  try{
    const response = await fetch(urlToFetch)
    if(response.ok){
      const jsonResponse = await response.json()
      console.log(response )
      var genres = jsonResponse.genres
      return genres
    }
  }catch(error){
    console.log(error)
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie'
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`
  const urlToFetch = tmdbBaseUrl+discoverMovieEndpoint+requestParams
  try{
    const response = await fetch(urlToFetch)
    if(response.ok){
      const jsonResponse = await response.json()
      console.log(response )
      var movies  = jsonResponse.results
      return movies
    }
  }catch(error){
    console.log(error)
  }
};
//getMovies()
const getMovieInfo = async (movie) => {
  let movieId = movie.id

  const movieEndpoint = `/movie/${movieId}`
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = tmdbBaseUrl+movieEndpoint+requestParams
  try{
    const response = await fetch(urlToFetch)
    if(response.ok){
      const movieInfo = await response.json()
      console.log(response )
      return movieInfo
    }
  }catch(error){
    console.log(error)
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async() => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies()

  const randomMovie = await getRandomMovie(movies)
  const info = await getMovieInfo(randomMovie)
  displayMovie(info)

};


getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;