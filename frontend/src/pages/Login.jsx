import React, { useState } from "react";
import { useFetchData } from "../customHooks/useFetchData";

export const Login = ({ endPoint, metodo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault(); // Prevenir el envío del formulario por defecto
    if (!email || !password) return;

    setIsLoading(true);

    const body = {
      email: email,
      password: password,
    };

    const { data, isLoading } = useFetchData(endPoint, metodo, body);
    setData(data);
    setIsLoading(isLoading);
    console.log(data)
  };

  return (
    <>
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Iniciar sesión</button>
        </form>
        {isLoading && <p>Cargando, espere por favor...</p>}
        {data && (
          <div>
            <p>Email: {data.email}</p>
            <p>Password: {data.password}</p>
          </div>
        )}
      </div>
    </>
  );
};
