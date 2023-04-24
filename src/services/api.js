import axios from "axios";

// BASE DA URL: https://api.themoviedb.org/3/
// URL DA API: movie/550?api_key=9b88409acc876e8783a1eca393413417

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;