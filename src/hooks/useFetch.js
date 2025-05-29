import { useEffect, useState } from "react";

function useFetch(url) {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
  */

  useEffect(() => {
    let isCancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        await new Promise((res) => setTimeout(res, 1000)); // DA RIMUOVERE!!!!!!!!
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        if (!isCancelled) {
          setData(json);
          setError(null);
        }
      } catch (error) {
        if (!isCancelled) {
          setError(error.message);
          setData(null);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isCancelled = true;
    };
  }, [url]);

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return { data, error, loading };
}

export default useFetch;
