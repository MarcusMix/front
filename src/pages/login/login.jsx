// Login.js
import React from 'react';
import './login.css'; // Importar o CSS associado
import Input from '../../components/input/input';
import Button from '../../components/button/button';


const Login = () => {
  return (
    <div className="form-box">
      <form className="form">
        <span className="title">Faça login</span>
        <span className="subtitle">Crie uma conta grátis.</span>
        <div className="form-container">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Senha" />
        </div>
        <Button type="submit" label="Realizar login" />
      </form>
      <div className="form-section">
        <p>Não tem uma conta? <a href="/cadastrar">Cadastrar-se</a></p>
      </div>
    </div>
  );
};

export default Login;
