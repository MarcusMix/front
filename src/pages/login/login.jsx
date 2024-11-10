// Login.js
import React, { useState } from 'react';
import './login.css';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import getDataFunction from '../../api/api';

import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleLoginUser = async (event) => {
    event.preventDefault();
  
    try {
      const response = await getDataFunction("auth/login", "POST", JSON.stringify({ email, password }));
      
      if (response) { 
        console.log("ok");
        localStorage.setItem("token", response); 
        toast.success('Login realizado com sucesso!');
        navigate('/');
      } else {
        toast.error('Falha no login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Erro de conexão com o servidor.');
    }
  }

  return (
    <div className="form-box">
      <form className="form" onSubmit={handleLoginUser}>
        <span className="title">Faça login</span>
        <span className="subtitle">Crie uma conta grátis.</span>
        <div className="form-container">
          <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
          <Input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
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
