import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const apiUrl = "http://localhost:8200/";

export const useToken = () => {
  const location = useLocation();
  const [isLoadingToken, setIsLoadingToken] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [token, setToken] = useState(null);

  // Recuperar el token del localStorage
  const storedToken = localStorage.getItem("token");

  const validateToken = async (storedToken) => {
    // Verificar si hay un token almacenado
    if (storedToken) {
      setIsLoadingToken(true);
      setToken(storedToken);
      try {
        const response = await fetch(`${apiUrl}usuarios`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedToken}`, // Usar storedToken aquí en lugar de token
          },
        });
  
        if (response.status === 200) {
          // El token es válido
          setIsValidToken(true);
        } else {
          // El token no es válido
          setIsValidToken(false);
        }
      } catch (error) {
        console.error("Error al validar el token:", error);
        // Manejar el error de manera adecuada, por ejemplo, configurando un estado de error
        setIsValidToken(false);
      }finally{
        setIsLoadingToken(false);
      }
    } else {
      // No hay token almacenado
      setIsValidToken(false);
      setIsLoadingToken(false);
    }
  };

  useEffect(() => {
    validateToken(storedToken);
  }, [location]);

  return { isValidToken, validateToken, isLoadingToken };
};

