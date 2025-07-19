// API key and base URL
const apiKey = "ac575a88671f952e2c572e2556c26cda";
const baseURL = "https://api.themoviedb.org/3";

// movieId from the URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movieId");
if (movieId) {
    fetchMovieDetails(movieId);
    fetchMovieTrailer(movieId);
} else {
    document.getElementById("movieTitle").textContent = "No movie selected.";
    document.getElementById("movieOverview").textContent = "";
}
// Get the movie title and description
function fetchMovieDetails(id) {
    var url = baseURL + "/movie/" + id + "?api_key=" + apiKey;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.getElementById("movieTitle").textContent = data.title;
            document.getElementById("movieOverview").textContent = data.overview;
        })
        .catch(function () {
            document.getElementById("movieTitle").textContent = "Failed to load movie.";
            document.getElementById("movieOverview").textContent = "";
        });
}
