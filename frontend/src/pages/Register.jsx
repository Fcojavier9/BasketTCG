import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useRegister } from "../customHooks/useRegister";
import { useToken } from "../customHooks/useToken";
import "../styles/register.css";

export const Register = () => {
  const { isValidToken, validateToken } = useToken();

  const {
    email,
    diferente,
    isLoading,
    password,
    register,
    repassword,
    username,
    handleLogin,
    setEmail,
    setIsLoading,
    setPassword,
    setRepassword,
    setUsername,
  } = useRegister();

  useEffect(() => {
    validateToken(localStorage.getItem("token"));
  }, [register]);

  useEffect(() => {
    if(isValidToken){
      setIsLoading(false);
    }
  }, [isValidToken]);

  // Mientras se verifica la validez del token, mostramos un mensaje de carga
  if (isLoading) {
    return (
      <div className="login">
        <div className="form-container-register">
          <p>Cargando, espere por favor...</p>
        </div>
      </div>
    )
  }

  if(register && !isLoading && isValidToken) return <Navigate to="/" />;

  // Si no estamos cargando y el token no es válido, mostramos el formulario de inicio de sesión
  return (
    <div className="register">
      <div className="form-container-register">
        <form onSubmit={handleLogin}>
          <h1 className="letra-borde h1-class-register">Sign-up</h1>
          <div className="input-container-register">
            <label className="letra-borde">
              Correo electrónico:
              <input
                type="email"
                value={email}
                autoComplete="email"
                placeholder="Introduzca email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="input-container-register">
            <label className="letra-borde">
              Nombre de usuario:
              <input
                type="text"
                value={username}
                autoComplete="username"
                placeholder="Introduzca usuario"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="input-container-register">
            <label className="letra-borde">
              Contraseña:
              <input
                type="password"
                value={password}
                autoComplete="current-password"
                placeholder="Introduzca contraseña"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="input-container-register">
            <label className="letra-borde">
              Repite contraseña:
              <input
                type="password"
                value={repassword}
                autoComplete="new-password"
                placeholder="Vuelva a introducir contraseña"
                onChange={(e) => setRepassword(e.target.value)}
              />
            </label>
            {diferente && <p className="password-diferentes">Las contraseñas no coinciden</p>}
          </div>
          <div className="button-container-register">
            <button type="submit" className="basketball-register">Registrarse</button>
          </div>
          <a className="enlace-password letra-borde" href="mailto:basket@aetherdocks.xyz">¿Has olvidado tu contraseña?</a>
        </form>
      </div>
    </div>
  );
};
