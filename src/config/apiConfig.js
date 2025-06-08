const API_KEY = "cca9dfe83cb94fcc90e16112774201a7";
const BASE_URL = "https://api.rawg.io/api";

const apiConfig = {
  API_KEY,
  BASE_URL,
  endpoints: {
    genres: `${BASE_URL}/genres?key=${API_KEY}`,
    gamesByDate: (startDate, endDate, page = 1) =>
      `${BASE_URL}/games?key=${API_KEY}&dates=${startDate},${endDate}&page=${page}`,
    gamesByGenre: (genre, page = 1) =>
      `${BASE_URL}/games?key=${API_KEY}&genres=${genre}&page=${page}`,
    gameDetails: (id) => `${BASE_URL}/games/${id}?key=${API_KEY}`,
    gameSearch: (gameName) =>
      `${BASE_URL}/games?key=${API_KEY}&search=${gameName}`,
  },
};

export default apiConfig;
