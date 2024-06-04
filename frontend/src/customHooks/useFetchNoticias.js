import { useState, useEffect } from 'react';

export const useFetchNoticias = () => {
  const token = localStorage.getItem('token');
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await fetch('http://localhost:8200/noticias', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setNoticias(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (token) {
      fetchNoticias();
    }
  }, [token]);

  return { noticias, loading, error };
};