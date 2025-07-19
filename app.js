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
