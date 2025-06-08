const API_KEY = "cca9dfe83cb94fcc90e16112774201a7";
const BASE_URL = "https://api.rawg.io/api";

const apiConfig = {
  API_KEY,
  BASE_URL,
  endpoints: {
    genres: "/genres",
    gamesByDate: () => "/games",
    gamesByGenre: () => "/games",
    gameDetails: (id) => `/games/${id}`,
    gameSearch: () => "/games",
  },
};

export default apiConfig;
