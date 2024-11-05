export const sendImageBlob = async (url, method, data) => {
    try {
        const response = await fetch(url, {
            method: method,
            body: data, // O FormData já está formatado corretamente
            // Não adicione o cabeçalho Content-Type, pois o navegador irá configurá-lo
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            // Converte a resposta de erro em um objeto JSON
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao fazer a requisição');
        }

        // Para respostas JSON, converta e retorne os dados
        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Erro na função getDataFunction:', error);
        throw error; // Propaga o erro para que possa ser tratado no componente
    }
};