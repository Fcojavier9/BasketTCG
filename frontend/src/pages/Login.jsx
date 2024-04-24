import React, { useState, useEffect } from "react";
import { fetchAuth } from "../helpers/fetchAuth";
import { useToken } from "../customHooks/useToken";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Inicialmente, el componente está cargando
  const { token, isValidToken } = useToken();

  useEffect(() => {
    // Cuando isValidToken cambia, dejamos de mostrar el mensaje de carga
    setIsLoading(false);
  }, [isValidToken]);

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevenir el envío del formulario por defecto
    if (!email || !password) return;

    setIsLoading(true); // Al iniciar sesión, volvemos a mostrar el mensaje de carga

    const body = {
      email: email,
      password: password,
    };

    try {
      const { data } = await fetchAuth(body);
      localStorage.setItem("token", data);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setIsLoading(false); // Al completar el inicio de sesión, dejamos de mostrar el mensaje de carga
    }
  };

  // Si ya tenemos un token válido, redirigimos al usuario a la página principal
  if (isValidToken) {
    return <Navigate to="/" />;
  }

  // Mientras se verifica la validez del token, mostramos un mensaje de carga
  if (isLoading) {
    return <p>Cargando, espere por favor...</p>;
  }

  // Si no estamos cargando y el token no es válido, mostramos el formulario de inicio de sesión
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <label>
          Correo electrónico:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};
