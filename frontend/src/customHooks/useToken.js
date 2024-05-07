import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useToken = () => {
  const [token, setToken] = useState(null);
  const [isValidToken, setIsValidToken] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const validateToken = async () => {
      // Recuperar el token del localStorage
      const storedToken = localStorage.getItem("token");

      // Verificar si hay un token almacenado
      if (storedToken) {
        setToken(storedToken);
        try {
          const response = await fetch("http://localhost:8200/usuarios", {
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
        }
      } else {
        // No hay token almacenado
        setIsValidToken(false);
      }
    };

    validateToken();
  }, [location]);

  return { isValidToken };
};
