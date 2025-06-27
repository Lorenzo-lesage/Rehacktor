const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const BASE_URL = "https://api.rawg.io/api";
const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3"; 

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
    similarGames: (id) => `/games/${id}/suggested`,

    youtubeSearch: (query) =>
      `${YOUTUBE_BASE_URL}/search?part=snippet&q=${encodeURIComponent(
        query
      )}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`,
  },
};

export default apiConfig;
