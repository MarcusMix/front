import React, { useState } from 'react';
import './signup-service.css'; // Importar o CSS específico
import FormBox from '../../components/form-box/FormBox';
import FormContainer from '../../components/form-container/FormContainer';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import Subtitle from '../../components/subtitle/Subtitle';
import TitleNew from '../../components/title/Title';
import { toast } from 'react-hot-toast'; // Importando o toast
import { sendImageBlob } from '../../api/image';

const SignUpService = ({ userId }) => {
  // Estado para os dados do prestador de serviço
  const [serviceProviderData, setServiceProviderData] = useState({
    name: '',
    description: '',
    experience: '',
    userId: userId, // Agora isso será passado como uma prop
  });
  const [imageFile, setImageFile] = useState(null); // Estado para armazenar o arquivo da imagem

  // Manipulador de mudança para atualizar o estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceProviderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para lidar com a mudança no input de arquivo
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificação de campos obrigatórios antes de enviar
    if (!serviceProviderData.name || !serviceProviderData.description || !serviceProviderData.experience || !imageFile || !serviceProviderData.userId) {
      toast.error('Todos os campos são obrigatórios.');
      return;
    }

    // Cria um FormData para enviar os dados como multipart/form-data
    const formData = new FormData();
    formData.append('serviceProviderDTO', new Blob([JSON.stringify(serviceProviderData)], { type: 'application/json' }));
    formData.append('imageFile', imageFile);

    // Log para depuração
    console.log('Dados enviados:', serviceProviderData);
    console.log('Arquivo de imagem:', imageFile);

    try {
      const response = await sendImageBlob('http://localhost:8080/service-provider', 'POST', formData);

      if (response) {
        toast.success('Prestador de serviço cadastrado com sucesso!');
        // Limpar os campos do formulário
        setServiceProviderData({
          name: '',
          description: '',
          experience: '',
          userId: userId, // Redefinindo conforme necessário
        });
        setImageFile(null); // Limpa o campo de imagem
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast.error('Houve um erro ao cadastrar o prestador de serviço. Tente novamente.');
    }
  };

  return (
    <div className="fix">
      <FormBox>
        <form className="form" onSubmit={handleSubmit}>
          <TitleNew>Conta de Prestador de Serviço.</TitleNew>
          <Subtitle>Dados pessoais</Subtitle>
          <FormContainer>
            <Input
              type="text"
              name="name"
              placeholder="Nome completo"
              value={serviceProviderData.name}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="description"
              placeholder="Descrição do perfil"
              value={serviceProviderData.description}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="experience"
              placeholder="Experiência"
              value={serviceProviderData.experience}
              onChange={handleChange}
            />
            <Input
              type="file"
              name="imageFile"
              onChange={handleFileChange}
            />
          </FormContainer>
          <Button type="submit" label="Cadastrar Perfil de Prestador" />
        </form>
      </FormBox>
    </div>
  );
};

export default SignUpService;
