const API_KEY = "169792d0d9d043a69b438aadb36ad49e";
const BASE_URL = "https://api.rawg.io/api";

const apiConfig = {
  API_KEY,
  BASE_URL,
  endpoints: {
    genres: `${BASE_URL}/genres?key=${API_KEY}`,
    gamesByDate: (startDate, endDate, page = 1) =>
      `${BASE_URL}/games?key=${API_KEY}&dates=${startDate},${endDate}&page=${page}`,
  },
};

export default apiConfig;
