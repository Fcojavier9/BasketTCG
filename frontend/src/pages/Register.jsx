import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "../styles/register.css";
import { fetchData } from "../helpers/fetchData";
import { fetchAuth } from "../helpers/fetchAuth";
import { useToken } from "../customHooks/useToken";

const ENDPOINT = "insertUsuario";
const METODO = "POST";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [diferente, setDiferente] = useState(false);
  const [register, setRegister] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const { isValidToken, validateToken } = useToken();

  useEffect(() => {
    validateToken(localStorage.getItem("token"));
  }, [register]);

  useEffect(() => {
    if(isValidToken){
      setIsLoading(false);
    }
  }, [isValidToken]);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !username|| !password || !repassword) return;
    if (password !== repassword) {
      setDiferente(true);
      return;
    }else{
      setDiferente(false)
    }

    setIsLoading(true);

    const body = {
      email: email,
      username: username,
      password: password,
    };

    try {
      const { data, isLoading, error } = await fetchData(ENDPOINT, METODO, null, body);
      if(error === 400) {
        alert(data);
        setIsLoading(false);
        return
      };

      const body2 = {
        email: email,
        password: password,
      };

      try{
        setIsLoading(true);
        const { token, id } = await fetchAuth(body2);
        localStorage.setItem("token", token);
        localStorage.setItem("id", id); 
      } catch (error) {
        console.error("Error al loguearse tras registrar:", error);
      }
      
      setRegister(!register);
    } catch (error) {
      console.error("Error al registrar:", error);
    }

  };

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

  if(register && !isLoading && isValidToken) return <Navigate to="/" />;

  // Si no estamos cargando y el token no es válido, mostramos el formulario de inicio de sesión
  return (
    <div className="register">
      <div className="form-container">
        <form onSubmit={handleLogin}>
          <h1 className="letra-borde">Sign-up</h1>
          <div className="input-container">
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
          <div className="input-container">
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
          <div className="input-container">
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
          <div className="input-container">
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
          <div className="button-container">
            <button type="submit" className="basketball">Registrarse</button>
          </div>
          <a className="enlace-password letra-borde" href="/recuperarPassword">¿Has olvidado tu contraseña?</a>
        </form>
      </div>
    </div>
  );
};