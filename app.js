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