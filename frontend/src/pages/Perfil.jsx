import { useState } from 'react';
import { InfoCard } from '../components/InfoCard';
import '../styles/perfil.css';

// Componente principal del panel de usuario
export const Perfil = () => {
  const [name, setName] = useState('Usuario Ejemplo');
  const [username, setUsername] = useState('usuario123');
  const [email, setEmail] = useState('usuario@example.com');
  const [password, setPassword] = useState('********');

  const handleClick = () => {
    console.log(name)
    console.log(username)
    console.log(email)
    console.log(password)
  }
  

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="user-panel">
      <InfoCard title="Nombre" value={name} onChange={handleNameChange} onClick={handleClick} type={"text"}/>
      <InfoCard title="Usuario" value={username} onChange={handleUsernameChange} onClick={handleClick} type={"text"}/>
      <InfoCard title="Correo" value={email} onChange={handleEmailChange} onClick={handleClick} type={"email"}/>
      <InfoCard title="Contraseña" value={password} onChange={handlePasswordChange} onClick={handleClick} type={"password"}/>
    </div>
  );
};