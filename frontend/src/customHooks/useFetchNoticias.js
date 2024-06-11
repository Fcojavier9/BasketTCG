import { useState, useEffect } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

export const useFetchNoticias = () => {
  const token = localStorage.getItem('token');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await fetch(`${apiUrl}noticias`, {
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