import React, { useState, useEffect } from "react";
import { fetchAuth } from "../helpers/fetchAuth";
import { useToken } from "../customHooks/useToken";
import { Navigate } from "react-router-dom";
import "../styles/login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const { isValidToken } = useToken();

  // Cuando isValidToken cambia, actualiza el estado de carga
  useEffect(() => {
    setIsLoading(false);
  }, [login]);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);

    const body = {
      email: email,
      password: password,
    };

    try {
      const { token, id } = await fetchAuth(body);
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      if (token !== undefined) {
        setLogin(!login);
      }else{
        alert("Usuario o contraseña incorrectos");
        setIsLoading(false);
        return
      }
      
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }

  };

  if(login || isValidToken) return <Navigate to="/" />;

  // Mientras se verifica la validez del token, mostramos un mensaje de carga
  if (isLoading) {
    return (
      <div className="login">
        <div className="form-container">
          <p>Cargando, espere por favor...</p>
        </div>
      </div>
    )
  }

  // Si no estamos cargando y el token no es válido, mostramos el formulario de inicio de sesión
  return (
    <div className="login">
      <div className="form-container">
        <form onSubmit={handleLogin}>
          <h1 className="letra-borde">Log-in</h1>
          <div className="input-container">
            <label className="letra-borde">
              Correo electrónico:
              <input
                type="email"
                value={email}
                autocomplete="email"
                placeholder="Introduzca email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="input-container">
            <label className="letra-borde">
              Contraseña:
              <input
                type="password"
                value={password}
                autocomplete="current-password"
                placeholder="Introduzca contraseña"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="button-container">
            <button type="submit" className="basketball">Iniciar sesión</button>
          </div>
          <a className="enlace-registro letra-borde" href="/register">¿No tienes cuenta? Regístrate aquí</a>
        </form>
      </div>
    </div>
  );
};
