import React, { useState } from "react";
import { Button } from "@mui/material"; // Importe o Button do Material-UI
import Input from "../../components/input/input";
import { jwtDecode } from 'jwt-decode'; // Importe a função jwtDecode

const OfferedServiceForm = ({ providerId, onClose }) => {
    // Recebe o ID do provider e a função para fechar o modal

    const [serviceData, setServiceData] = useState({
        name: '',
        description: '',
        price: 0,
        serviceProviderId: providerId, // ID do prestador recebido como prop
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setServiceData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Obter o token do localStorage

        const formData = new FormData();
        formData.append('offeredServiceDTO', new Blob([JSON.stringify(serviceData)], { type: 'application/json' })); // Serializa o objeto serviceData como JSON
        formData.append('imageFile', serviceData.image); // Adiciona a imagem

        try {
            const response = await fetch('http://localhost:8080/offered-service', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`, // Incluir o token no header
                },
                body: formData,
            });

            if (response.ok) {
                // Sucesso: mostrar mensagem e atualizar a página
                alert("Serviço criado com sucesso!"); // Você pode usar uma biblioteca como o 'react-hot-toast' para mensagens mais personalizadas
                onClose(); // Fecha o modal
                window.location.reload(); // Recarrega a página
            } else {
                // Erro: mostrar mensagem de erro
                alert("Erro ao criar serviço.");
            }
        } catch (error) {
            console.error("Erro ao criar serviço:", error);
            alert("Erro ao criar serviço.");
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <Input
                type="text"
                name="name"
                placeholder="Nome do serviço"
                value={serviceData.name}
                onChange={handleChange}
            />
            <Input
                type="text"
                name="description"
                placeholder="Descrição do serviço"
                value={serviceData.description}
                onChange={handleChange}
            />
            <Input
                type="number"
                name="price"
                placeholder="Preço"
                value={serviceData.price}
                onChange={handleChange}
            />
            <Input type="file" name="image" onChange={handleFileChange} />
            <Button type="submit" variant="contained" color="primary">
                Salvar Serviço
            </Button>
            <Button type="button" variant="outlined" color="secondary" onClick={onClose}>
                Cancelar
            </Button>
        </form>
    );
};

export default OfferedServiceForm;