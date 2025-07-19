const apiKey = "ac575a88671f952e2c572e2556c26cda"; // API key
const baseURL = "https://api.themoviedb.org/3"; // API base URL

const movieContainer = document.getElementById("movieContainer"); // movie section
const errorMessage = document.getElementById("errorMessage"); // error box
// get top-rated movies
async function fetchTopRatedMovies() {
    try {
        // make API call
        const res = await fetch(`${baseURL}/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`);
        const data = await res.json(); // get JSON data
        const topRated = data.results.filter(movie => movie.vote_average >= 8); // only good movies

        // if movies found
        if (topRated.length > 0) {
            displayMovies(topRated); // show movies
        } else {
            errorMessage.classList.remove("hidden"); // show error
        }
    } catch (error) {
        console.error("Error fetching top-rated movies:", error); // log error
        errorMessage.classList.remove("hidden"); // show error
    }
}
