import { useEffect, useState, useCallback } from "react";

function useFetchSolution(initialUrl) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [url, updateUrl] = useState(initialUrl);

  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
  */

  /**
   * Method to load the data
   */
  const load = useCallback(async () => {
    setData(null);
    if (!url) {
      setError("Error URL");
      return;
    } else {
      setError(null);
    }
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  /*
  |-----------------------------------------------------
  | Hook
  |-----------------------------------------------------
  */

  useEffect(() => {
    load();
  }, [load]);

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return { url, loading, error, data, load, updateUrl };
}

export default useFetchSolution;
