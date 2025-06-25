import axiosClient from "./axiosClient";
import apiConfig from "../config/apiConfig";
import axios from "axios";

/**
 * Fetch genres
 * @returns 
 */
export const fetchGenres = async () => {
  const response = await axiosClient.get(apiConfig.endpoints.genres);
  return response.data;
};

/**
 * Fetch games by date
 * @param {*} startDate 
 * @param {*} endDate 
 * @param {*} page 
 * @returns 
 */
export const fetchGamesByDate = async (startDate, endDate, page = 1) => {
  const response = await axiosClient.get(apiConfig.endpoints.gamesByDate(), {
    params: {
      dates: `${startDate},${endDate}`,
      page,
    },
  });
  return response.data;
};

/**
 * Fetch games by genre
 * @param {*} genre 
 * @param {*} page 
 * @returns 
 */
export const fetchGamesByGenre = async (genre, page = 1) => {
  const response = await axiosClient.get(apiConfig.endpoints.gamesByGenre(), {
    params: {
      genres: genre,
      page,
    },
  });
  return response.data;
};

/**
 * Fetch game details
 * @param {*} id 
 * @returns 
 */
export const fetchGameDetails = async (id) => {
  const response = await axiosClient.get(apiConfig.endpoints.gameDetails(id));
  return response.data;
};

/**
 * Fetch game by query
 * @param {*} gameName 
 * @param {*} page 
 * @returns 
 */
export const searchGames = async (gameName, page = 1) => {
  const response = await axiosClient.get(apiConfig.endpoints.gameSearch(), {
    params: {
      search: gameName,
      page,
      page_size: 20,
    },
  });
  return response.data;
};

/**
 * Fetch game screenshots
 * @param {*} gameId 
 * @returns 
 */
export const fetchGameScreenshots = async (gameId) => {
  const response = await axiosClient.get(`/games/${gameId}/screenshots`);
  return response.data.results;
};


export const fetchGameMovies = async (gameId, gameName) => {
  try {
    // RAWG
    const rawgRes = await axiosClient.get(`/games/${gameId}/movies`);
    const rawgResults = rawgRes.data.results;

    if (rawgResults?.length > 0) {
      return rawgResults.map(movie => ({
        source: "rawg",
        name: movie.name,
        preview: movie.preview,
        videoUrl: movie.data?.max || movie.data['480'],
      }));
    }

    // YouTube fallback
    const ytUrl = apiConfig.endpoints.youtubeSearch(`${gameName} trailer`);
    const ytRes = await axios.get(ytUrl);
    const ytVideo = ytRes.data.items?.[0];

    if (ytVideo) {
      return [{
        source: "youtube",
        name: ytVideo.snippet.title,
        preview: ytVideo.snippet.thumbnails.high.url,
        videoUrl: `https://www.youtube.com/watch?v=${ytVideo.id.videoId}`,
      }];
    }

    return [];
  } catch (error) {
    console.error("Errore nel fetch dei trailer:", error);
    return [];
  }
};


//-------------------
// Migliori giochi della settimana (ultimo 7 giorni) ordinati per rating
export const fetchTopGamesOfWeek = async (page = 1) => {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const response = await axiosClient.get(apiConfig.endpoints.gamesByDate(), {
    params: {
      dates: `${formatDate(lastWeek)},${formatDate(today)}`,
      ordering: "-rating",
      page,
    },
  });
  return response.data;
};

// Migliori giochi del mese (ultimo mese) ordinati per rating
export const fetchTopGamesOfMonth = async (page = 1) => {
  const today = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(today.getMonth() - 1);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const response = await axiosClient.get(apiConfig.endpoints.gamesByDate(), {
    params: {
      dates: `${formatDate(lastMonth)},${formatDate(today)}`,
      ordering: "-rating",
      page,
    },
  });
  return response.data;
};

// Giochi usciti nel 2023 ordinati per rating
export const fetchGamesOf2023 = async (page = 1) => {
  const response = await axiosClient.get(apiConfig.endpoints.gamesByDate(), {
    params: {
      dates: "2023-01-01,2023-12-31",
      ordering: "-rating",
      page,
    },
  });
  return response.data;
};

// Giochi usciti nel 2022 ordinati per rating
export const fetchGamesOf2022 = async (page = 1) => {
  const response = await axiosClient.get(apiConfig.endpoints.gamesByDate(), {
    params: {
      dates: "2022-01-01,2022-12-31",
      ordering: "-rating",
      page,
    },
  });
  return response.data;
};
