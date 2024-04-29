import React, { useState, useEffect } from "react";
import { fetchAuth } from "../helpers/fetchAuth";
import { Navigate } from "react-router-dom";
import "../styles/register.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [diferente, setDiferente] = useState(false);
  const [register, setRegister] = useState(false);
  const [isLoading, setIsLoading] = useState();

  // Cuando isValidToken cambia, actualiza el estado de carga
  useEffect(() => {
    setIsLoading(false);
  }, [register]);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password || !repassword) return;
    if (password !== repassword) {
      setDiferente(true);
      return;
    }else{
      setDiferente(false)
    }

    setIsLoading(true);

    const body = {
      email: email,
      password: password,
    };

    try {
      const { data } = await fetchAuth(body);
      setRegister(!register);
    } catch (error) {
      console.error("Error al registrar:", error);
    }

  };

  if(register) return <Navigate to="/" />;

  // Mientras se verifica la validez del token, mostramos un mensaje de carga
  if (isLoading) {
    return <p>Cargando, espere por favor...</p>;
  }

  // Si no estamos cargando y el token no es válido, mostramos el formulario de inicio de sesión
  return (
    <div className="register">
      <div className="form-container">
        <form onSubmit={handleLogin}>
          <h1>Sign-up</h1>
          <div className="input-container">
            <label className="input-label-email">
              Correo electrónico:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="input-container">
            <label className="input-label-password">
              Contraseña:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="input-container">
            <label className="input-label-password">
              Repite contraseña:
              <input
                type="password"
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
              />
              {diferente && <p className="password-diferentes">Las contraseñas no coinciden</p>}
            </label>
          </div>
          <div className="button-container">
            <button type="submit" className="basketball">Registrarse</button>
          </div>
          <a className="enlace-password" href="/recuperarPassword">¿Has olvidado tu contraseña?</a>
        </form>
      </div>
    </div>
  );
};
