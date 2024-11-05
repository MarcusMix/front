// pages/SignUpService.js
import React from 'react';
import './signup-service.css'; // Importar o CSS específico
import FormBox from '../../components/form-box/FormBox';
import FormContainer from '../../components/form-container/FormContainer';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Subtitle from '../../components/subtitle/Subtitle';
import TitleNew from '../../components/title/Title';


const SignUpService = () => {
  return (
    <div className="fix">
    <FormBox>
      <form className="form">
        <TitleNew>Conta de Prestador de Serviço.</TitleNew>
        <Subtitle>Dados pessoais</Subtitle> 
        <FormContainer>
          <Input type="nome" placeholder="Nome completo" />
          {/* mudar descricao para area */}
          <Input type="descricao" placeholder="Descrição do perfil" />
          <Input type="experiencia" placeholder="Experiência" />
          <Input type="imagem" placeholder="Imagem" />
        </FormContainer>
        <Subtitle>Endereço</Subtitle> 
        <Button type="submit" label="Cadastrar Perfil de Prestador" />
      </form>
    </FormBox>
    </div>
  );
};

export default SignUpService;
