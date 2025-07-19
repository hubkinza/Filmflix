// API key and base URL
const apiKey = "ac575a88671f952e2c572e2556c26cda";
const baseURL = "https://api.themoviedb.org/3";

// movieId from the URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movieId");