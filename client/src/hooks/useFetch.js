import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url, skip = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('usefetch rendered...');

  useEffect(() => {
    if (!skip) {
      const source = axios.CancelToken.source();

      axios
        .get(url, { cancelToken: source.token })
        .then((payload) => {
          setLoading(false);
          setData(payload.data);
        })
        .catch((err) => {
          setError(err.message);
        });
      // Clean up pending requests.
      return () => {
        source.cancel();
      };
    }
  }, [url, skip]);

  return { data, loading, error };
};

export default useFetch;
