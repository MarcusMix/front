import { useParams } from 'react-router-dom';

function ProviderProfile() {
    const { id } = useParams();

    // Use o 'id' para buscar as informações do provedor 
    // e exibir na página.

    return (
        <div>
            {/* Exiba as informações do provedor aqui */}
        </div>
    );
}

export default ProviderProfile;