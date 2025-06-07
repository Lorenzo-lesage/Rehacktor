import { useState, useEffect } from 'react';
import axios from 'axios';
import apiConfig from '../config/apiConfig';

function useGameScreenshots(gameId) {
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const response = await axios.get(
          `${apiConfig.BASE_URL}/games/${gameId}/screenshots`,
          {
            params: {
              key: apiConfig.API_KEY,
            },
          }
        );
        setScreenshots(response.data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScreenshots();
  }, [gameId]);

  return { screenshots, loading, error };
}

export default useGameScreenshots;
