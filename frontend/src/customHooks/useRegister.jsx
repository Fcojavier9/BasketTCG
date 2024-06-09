import { useState } from "react";
import { fetchAuth } from "../helpers/fetchAuth";
import { fetchData } from "../helpers/fetchData";

const ENDPOINT = "insertUsuario";
const METODO = "POST";

export const useRegister = () => {
  const [diferente, setDiferente] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [repassword, setRepassword] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !username || !password || !repassword) return;
    if (password !== repassword) {
      setDiferente(true);
      return;
    } else {
      setDiferente(false);
    }

    setIsLoading(true);

    const body = {
      email: email,
      username: username,
      password: password,
    };

    try {
      const { data, isLoading, error } = await fetchData(
        ENDPOINT,
        METODO,
        null,
        body
      );
      if (error === 400) {
        alert(data);
        setIsLoading(false);
        return;
      }

      const body2 = {
        email: email,
        password: password,
      };

      try {
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

  return {
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
  };
};
