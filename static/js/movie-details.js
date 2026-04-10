// API key and base URL
var apiKey = "ac575a88671f952e2c572e2556c26cda";
var baseURL = "https://api.themoviedb.org/3";

// movieId from the URL
var urlParams = new URLSearchParams(window.location.search);
var movieId = urlParams.get("movieId");

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

// function for trailer from YouTube
function fetchMovieTrailer(id) {
    var url = baseURL + "/movie/" + id + "/videos?api_key=" + apiKey;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // for loop to get trailers
            var trailers = [];
            for (var i = 0; i < data.results.length; i++) {
                var video = data.results[i];
                if (video.site === "YouTube" && video.type === "Trailer") {
                    trailers.push(video);
                }
            }

            // If trailer, then show 
            if (trailers.length > 0) {
                var trailerKey = trailers[0].key;
                var iframe = document.createElement("iframe");
                iframe.width = "560";
                iframe.height = "315";
                iframe.src = "https://www.youtube.com/embed/" + trailerKey;
                iframe.allowFullscreen = true;

                document.getElementById("trailerContainer").appendChild(iframe);
            } else {
                document.getElementById("trailerContainer").textContent = "No trailer available.";
            }
        })
        .catch(function () {
            document.getElementById("trailerContainer").textContent = "Failed to load trailer.";
        });
}
