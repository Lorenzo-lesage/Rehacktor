import axiosClient from "./axiosClient";
import apiConfig from "../config/apiConfig";

export const fetchGenres = async () => {
  const response = await axiosClient.get(apiConfig.endpoints.genres);
  return response.data;
};

export const fetchGamesByDate = async (startDate, endDate, page = 1) => {
  const response = await axiosClient.get(apiConfig.endpoints.gamesByDate(), {
    params: {
      dates: `${startDate},${endDate}`,
      page,
    },
  });
  return response.data;
};

export const fetchGamesByGenre = async (genre, page = 1) => {
  const response = await axiosClient.get(apiConfig.endpoints.gamesByGenre(), {
    params: {
      genres: genre,
      page,
    },
  });
  return response.data;
};

export const fetchGameDetails = async (id) => {
  const response = await axiosClient.get(apiConfig.endpoints.gameDetails(id));
  return response.data;
};

export const searchGames = async (gameName) => {
  const response = await axiosClient.get(apiConfig.endpoints.gameSearch(), {
    params: {
      search: gameName,
    },
  });
  return response.data;
};

export const fetchGameScreenshots = async (gameId) => {
  const response = await axiosClient.get(`/games/${gameId}/screenshots`);
  return response.data.results;
};