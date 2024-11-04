import React, { useState } from 'react';
import './signup-user.css';
import Input from '../../components/input/input'; // Componente de Input
import Button from '../../components/button/button';
import Title from '../../components/title/Title';
import FormBox from '../../components/form-box/FormBox';
import FormContainer from '../../components/form-container/FormContainer';
import getDataFunction from '../../api/api'; // Função para fazer requisições
import Subtitle from '../../components/subtitle/Subtitle';

const SignUpUser = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    addressDTO: {
      id: null,
    },
  });

  const [addressData, setAddressData] = useState({
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevAddressData) => ({ ...prevAddressData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificação dos campos de endereço
    if (!addressData.street || !addressData.number || !addressData.neighborhood || !addressData.city || !addressData.state) {
      console.error('Todos os campos de endereço devem ser preenchidos.');
      return;
    }

    console.log('Address Data Before POST:', addressData); // Verifique os dados do endereço antes do POST

    try {
      // Salvar o endereço primeiro
      const addressResponse = await getDataFunction('address', 'POST', addressData);
      
      if (addressResponse && addressResponse.id) {
        console.log('Address data saved successfully:', addressResponse);

        // Atualizar userData com o ID do endereço
        const userDataWithAddress = {
          ...userData,
          addressDTO: {
            id: addressResponse.id,
          },
        };

        console.log('User Data With Address:', userDataWithAddress); // Verifique os dados do usuário antes do POST

        // Salvar o usuário com o ID do endereço
        const userResponse = await getDataFunction('user', 'POST', userDataWithAddress);
        console.log('User data saved successfully:', userResponse);
      } else {
        throw new Error('Failed to save address data.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Houve um erro ao salvar os dados. Verifique os campos e tente novamente.'); // Mensagem para o usuário
    }
  };

  return (
    <FormBox>
      <form className="form" onSubmit={handleSubmit}>
        <Title>Crie uma conta grátis.</Title>
        <FormContainer>
          <Input 
            type="text" 
            name="name" 
            placeholder="Nome" 
            value={userData.name} 
            onChange={handleUserChange} 
            required
          />
          <Input 
            type="email" 
            name="email" 
            placeholder="Email" 
            value={userData.email} 
            onChange={handleUserChange} 
            required
          />
          <Input 
            type="password" 
            name="password" 
            placeholder="Senha" 
            value={userData.password} 
            onChange={handleUserChange} 
            required
          />
        </FormContainer>
        <Subtitle>Endereço</Subtitle>
        <FormContainer>
          <Input 
            type="text" 
            name="street" 
            placeholder="Rua" 
            value={addressData.street} 
            onChange={handleAddressChange} 
            required
          />
          <Input 
            type="text" 
            name="number" 
            placeholder="Número" 
            value={addressData.number} 
            onChange={handleAddressChange} 
            required
          />
          <Input 
            type="text" 
            name="neighborhood" 
            placeholder="Bairro" 
            value={addressData.neighborhood} 
            onChange={handleAddressChange} 
            required
          />
          <Input 
            type="text" 
            name="city" 
            placeholder="Cidade" 
            value={addressData.city} 
            onChange={handleAddressChange} 
            required
          />
          <Input 
            type="text" 
            name="state" 
            placeholder="Estado" 
            value={addressData.state} 
            onChange={handleAddressChange} 
            required
          />
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
