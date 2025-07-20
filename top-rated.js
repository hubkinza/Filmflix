
// API details
var apiKey = "ac575a88671f952e2c572e2556c26cda";
var baseURL = "https://api.themoviedb.org/3";


var movieContainer = document.getElementById("movieContainer"); // movie section container
var errorMessage = document.getElementById("errorMessage"); // error message div

// Fetch top-rated movies
async function fetchTopRatedMovies() {
    try {
        // API request
        const res = await fetch(baseURL + "/movie/top_rated?api_key=" + apiKey + "&language=en-US&page=1");
        const data = await res.json(); // parse response

        // Filter by rating
        var topRated = data.results.filter(function (movie) {
            return movie.vote_average >= 8; // only top-rated
        });

        // Show movies or error
        if (topRated.length > 0) {
            displayMovies(topRated); // render movies
        } else {
            errorMessage.classList.remove("hidden"); // show no results error
        }
    } catch (error) {
        console.error("Error fetching top-rated movies:", error); // log issue
        errorMessage.classList.remove("hidden"); // show fetch error
    }
}

// Render movie cards
function displayMovies(movies) {
    movieContainer.innerHTML = ""; // clear old results

    movies.forEach(function (movie) {
        var card = document.createElement("div"); // create card
        card.className = "movie-card"; // assign class

        // Add movie content
        card.innerHTML =
            '<img src="https://image.tmdb.org/t/p/w500' + movie.poster_path + '" alt="' + movie.title + '">' +
            '<div class="movie-info">' +
            '<h3>' + movie.title + '</h3>' +
            '<p>Rating: ' + movie.vote_average + '</p>' +
            '</div>';

        movieContainer.appendChild(card); // add to container
    });
}

// Run on page load
fetchTopRatedMovies();
