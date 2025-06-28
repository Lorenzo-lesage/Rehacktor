import axiosClient from "./axiosClient";
import apiConfig from "../config/apiConfig";
import axios from "axios";

/**
 * Fetch genres
 */
export const fetchGenres = async () => {
  const response = await axiosClient.get(apiConfig.endpoints.genres);
  return response.data;
};

/**
 * Fetch games by genre
 * @param {string} genre
 * @param {number} page
 * @param {string} ordering
 */
export const fetchGamesByGenre = async (
  genre,
  page = 1,
  ordering = "-relevance"
) => {
  const response = await axiosClient.get(apiConfig.endpoints.gamesByGenre(), {
    params: {
      genres: genre,
      page,
      ordering,
    },
  });
  return response.data;
};

/**
 * Fetch game details
 */
export const fetchGameDetails = async (id) => {
  const response = await axiosClient.get(apiConfig.endpoints.gameDetails(id));
  return response.data;
};

/**
 * Search games by name with optional ordering
 * @param {string} gameName
 * @param {number} page
 * @param {string} ordering
 * @returns {Promise}
 */
export const searchGames = async (
  gameName,
  page = 1,
  ordering = "-relevance"
) => {
  const response = await axiosClient.get(apiConfig.endpoints.gameSearch(), {
    params: {
      search: gameName,
      page,
      page_size: 20,
      ordering,
    },
  });
  return response.data;
};

/**
 * Fetch game screenshots
 */
export const fetchGameScreenshots = async (gameId) => {
  const response = await axiosClient.get(`/games/${gameId}/screenshots`);
  return response.data.results;
};

/**
 * Fetch game movies (RAWG + fallback YouTube)
 */
export const fetchGameMovies = async (gameId, gameName) => {
  try {
    const rawgRes = await axiosClient.get(`/games/${gameId}/movies`);
    const rawgResults = rawgRes.data.results;

    if (rawgResults?.length > 0) {
      return rawgResults.map((movie) => ({
        source: "rawg",
        name: movie.name,
        preview: movie.preview,
        videoUrl: movie.data?.max || movie.data["480"],
      }));
    }

    // YouTube fallback
    const ytUrl = apiConfig.endpoints.youtubeSearch(`${gameName} trailer`);
    const ytRes = await axios.get(ytUrl);
    const ytVideo = ytRes.data.items?.[0];

    if (ytVideo) {
      return [
        {
          source: "youtube",
          name: ytVideo.snippet.title,
          preview: ytVideo.snippet.thumbnails.high.url,
          videoUrl: `https://www.youtube.com/watch?v=${ytVideo.id.videoId}`,
        },
      ];
    }

    return [];
  } catch (error) {
    console.error("Errore nel fetch dei trailer:", error);
    return [];
  }
};

/**
 * Utility per formattare date ISO yyyy-mm-dd
 */
const formatDate = (date) => date.toISOString().split("T")[0];

/**
 * Fetch top games of the week
 * @param {number} page
 * @param {string} ordering
 */
export const fetchTopGamesOfWeek = async (
  page = 1,
  ordering = "-relevance"
) => {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  const response = await axiosClient.get(apiConfig.endpoints.gamesByDate(), {
    params: {
      dates: `${formatDate(lastWeek)},${formatDate(today)}`,
      ordering,
      page,
    },
  });
  return response.data;
};

/**
 * Fetch top games of the month
 */
export const fetchTopGamesOfMonth = async (
  page = 1,
  ordering = "-relevance"
) => {
  const today = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(today.getMonth() - 1);

  const response = await axiosClient.get(apiConfig.endpoints.gamesByDate(), {
    params: {
      dates: `${formatDate(lastMonth)},${formatDate(today)}`,
      ordering,
      page,
    },
  });
  return response.data;
};

/**
 * Fetch new and trending games
 */
export const fetchNewAndTrendingGames = async (
  page = 1,
  ordering = "-released"
) => {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  const response = await axiosClient.get(apiConfig.endpoints.gamesByDate(), {
    params: {
      dates: `${formatDate(lastWeek)},${formatDate(today)}`,
      ordering,
      page,
    },
  });

  return response.data;
};

/**
 * Fetch coming soon games
 */
export const fetchComingSoonGames = async (
  page = 1,
  ordering = "-relevance"
) => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 365);

  const response = await axiosClient.get(apiConfig.endpoints.gamesByDate(), {
    params: {
      dates: `${formatDate(today)},${formatDate(nextWeek)}`,
      ordering,
      page,
    },
  });

  return response.data;
};

/**
 * Fetch games from year start
 */
export const fetchGamesFromYearStart = async (
  page = 1,
  ordering = "-relevance"
) => {
  const today = new Date();
  const yearStart = new Date(today.getFullYear(), 0, 1);

  const response = await axiosClient.get(apiConfig.endpoints.gamesByDate(), {
    params: {
      dates: `${formatDate(yearStart)},${formatDate(today)}`,
      ordering,
      page,
      page_size: 20,
    },
  });

  return response.data;
};

/**
 * Fetch best games of last year
 */
export const fetchGamesOfLastYear = async (
  page = 1,
  ordering = "-relevance"
) => {
  const now = new Date();
  const lastYear = now.getFullYear() - 1;

  const start = `${lastYear}-01-01`;
  const end = `${lastYear}-12-31`;

  const response = await axiosClient.get(apiConfig.endpoints.gamesByDate(), {
    params: {
      dates: `${start},${end}`,
      ordering,
      page,
      page_size: 20,
    },
  });

  return response.data;
};

/**
 * Fetch all games
 */
export const fetchAllGames = async (
  page = 1,
  ordering = "-released"
) => {
  const response = await axiosClient.get(apiConfig.endpoints.gamesByDate(), {
    params: {
      ordering,
      page,
      page_size: 20,
    },
  });
  return response.data;
};

/**
 * Fetch top 250 all-time games
 * @returns
 */
export const fetchTopAllTimeGames = async () => {
  const pageSize = 40;
  const totalGames = 250;
  const pagesNeeded = Math.ceil(totalGames / pageSize);
  const allGames = [];

  for (let page = 1; page <= pagesNeeded; page++) {
    const { data } = await axiosClient.get("/games", {
      params: {
        ordering: "relevance",
        page,
        page_size: pageSize,
      },
    });

    allGames.push(...data.results);
    if (allGames.length >= totalGames) break;
  }

  return allGames.slice(0, totalGames);
};

/**
 * Fetch similar games (fallback)
 */
export const fetchSimilarGamesFallback = async (game) => {
  const genre = game.genres?.[0]?.slug;
  const tag = game.tags?.[0]?.slug;

  const params = {
    ordering: "-rating",
    page: 1,
    page_size: 10,
  };

  if (genre) params.genres = genre;
  if (tag) params.tags = tag;

  try {
    const response = await axiosClient.get("/games", { params });

    const filtered = response.data.results
      .filter((g) => g.id !== game.id)
      .slice(0, 4);

    return filtered;
  } catch (error) {
    console.error("Errore nel fetch dei giochi simili (fallback):", error);
    return [];
  }
};
