const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;


const BASE_URL = "https://api.rawg.io/api";
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3"; // opzionale, ma utile

const apiConfig = {
  RAWG_API_KEY,
  YOUTUBE_API_KEY,
  BASE_URL,
  YOUTUBE_BASE_URL,
  endpoints: {
    genres: "/genres",
    gamesByDate: () => "/games",
    gamesByGenre: () => "/games",
    gameDetails: (id) => `/games/${id}`,
    gameSearch: () => "/games",
    youtubeSearch: (query) =>
      `/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}`,
  },
};

export default apiConfig;
