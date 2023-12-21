import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './connexion.css';

const LoginForm = () => {
  const [pseudo, setPseudo] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/connexion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pseudo, mot_de_passe: motDePasse }),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la requête API:', error);
    }
  };

  return (
    <div >
      <h1>Connexion</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="pseudo">Pseudo:</label>
        <input
          type="text"
          id="pseudo"
          name="pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          required
        />
        <br />
        <label htmlFor="motDePasse">Mot de passe:</label>
        <input
          type="password"
          id="motDePasse"
          name="mot_de_passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
        <br />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
