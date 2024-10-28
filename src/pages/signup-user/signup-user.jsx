// Login.js
import React from 'react';
import './signup-user.css';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Title from '../../components/title/Title';
import FormBox from '../../components/form-box/FormBox';
import FormContainer from '../../components/form-container/FormContainer';


const SignUpUser = () => {
  return (
    <FormBox>
      <form className="form">
        <Title>Crie uma conta grátis.</Title>
        <FormContainer>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Senha" />
        </FormContainer>
        <Button type="submit" label="Cadastrar-se" />
      </form>
      <div className="form-section">
        <p>Já tem uma conta? <a href="/login">Fazer login</a></p>
      </div>
    </FormBox>
  );
};

export default SignUpUser;
