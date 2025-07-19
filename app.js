var apiKey = "ac575a88671f952e2c572e2556c26cda";// API key
var baseURL = "https://api.themoviedb.org/3"; // API base URL

// get page elements
var searchInput = document.getElementById("searchInput");
var genreFilter = document.getElementById("genreFilter");
var yearFilter = document.getElementById("yearFilter");
var ratingFilter = document.getElementById("ratingFilter");
var movieContainer = document.getElementById("movieContainer");
var errorMessage = document.getElementById("errorMessage");
var resetButton = document.getElementById("resetFilters");
var genresList = [];
// when page loads
document.addEventListener("DOMContentLoaded", function () {
    getGenres();
    addYearsToFilter();
    getMovies();

    // filter typing
    searchInput.addEventListener("input", function () {
        getMovies();
    });

    // genre change
    genreFilter.addEventListener("change", function () {
        getMovies();
    });

    // year change
    yearFilter.addEventListener("change", function () {
        getMovies();
    });

    // rating change
    ratingFilter.addEventListener("change", function () {
        getMovies();
    });

    // reset button
    resetButton.addEventListener("click", function () {
        searchInput.value = "";
        genreFilter.value = "";
        yearFilter.value = "";
        ratingFilter.value = "";
        getMovies();
    });
});
// get genre list
function getGenres() {
    var url = baseURL + "/genre/movie/list?api_key=" + apiKey;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            genresList = data.genres;
            genreFilter.innerHTML = "<option value=''>All Genres</option>";

            for (var i = 0; i < genresList.length; i++) {
                var option = document.createElement("option");
                option.value = genresList[i].id;
                option.textContent = genresList[i].name;
                genreFilter.appendChild(option);
            }
        });
}
// add years dropdown
function addYearsToFilter() {
    var currentYear = new Date().getFullYear();
    yearFilter.innerHTML = "<option value=''>All Years</option>";

    for (var y = currentYear; y >= 1980; y--) {
        var option = document.createElement("option");
        option.value = y;
        option.textContent = y;
        yearFilter.appendChild(option);
    }
}
// get movie list
function getMovies() {
    var searchText = searchInput.value;
    var selectedGenre = genreFilter.value;
    var selectedYear = yearFilter.value;
    var selectedRating = ratingFilter.value;

    var apiUrl = baseURL + "/discover/movie?api_key=" + apiKey + "&sort_by=popularity.desc";

    if (searchText !== "") {
        apiUrl = baseURL + "/search/movie?api_key=" + apiKey + "&query=" + encodeURIComponent(searchText);
    }

    if (selectedGenre !== "") {
        apiUrl += "&with_genres=" + selectedGenre;
    }

    if (selectedYear !== "") {
        apiUrl += "&primary_release_year=" + selectedYear;
    }

    if (selectedRating !== "") {
        apiUrl += "&vote_average.gte=" + selectedRating;
    }

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            movieContainer.innerHTML = "";

            if (!data.results || data.results.length === 0) {
                errorMessage.classList.remove("hidden");
                return;
            }

            errorMessage.classList.add("hidden");

            for (var i = 0; i < data.results.length; i++) {
                var movieCardHTML = createMovieCard(data.results[i]);
                movieContainer.innerHTML += movieCardHTML;
            }
        })
        .catch(function (error) {
            console.log(error);
            errorMessage.textContent = "API Error. Please try again.";
            errorMessage.classList.remove("hidden");
        });
}
// make movie card
function createMovieCard(movieObj) {
    var posterImageUrl;

    if (movieObj.poster_path) {
        posterImageUrl = "https://image.tmdb.org/t/p/w300" + movieObj.poster_path;
    } else {
        posterImageUrl = "https://via.placeholder.com/300x450?text=No+Image";
    }

    var releaseYear;

    if (movieObj.release_date) {
        releaseYear = movieObj.release_date.split("-")[0];
    } else {
        releaseYear = "N/A";
    }

    var html = `
    <a href="movie-details.html?movieId=${movieObj.id}" class="movie-card">
        <img src="${posterImageUrl}" alt="${movieObj.title}" />
        <div class="movie-info">
            <h3>${movieObj.title}</h3>
            <p>Rating: ${movieObj.vote_average} | Year: ${releaseYear}</p>
        </div>
    </a>
`;


    return html;
}
