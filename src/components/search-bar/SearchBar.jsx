import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom'; // Importando o Link
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '200px', // Define uma largura fixa
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '200px', // Define uma largura fixa
      '&:focus': {
        width: '250px', // Aumenta a largura ao focar
      },
    },
  },
}));

const CepInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent', // Remove a borda padrão
      borderRadius: theme.shape.borderRadius, // Usa o mesmo borderRadius da barra de pesquisa
    },
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover fieldset': {
      backgroundColor: alpha(theme.palette.common.white, 0.25), // Mesma cor de hover da barra de pesquisa
    },
    '&.Mui-focused fieldset': {
      backgroundColor: alpha(theme.palette.common.white, 0.35), // Cor de foco similar à barra de pesquisa
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(1)})`, // Ajusta o padding interno
    },
  },
}));

export default function SearchAppBar({ onSearch }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cep, setCep] = useState(''); // Estado para armazenar o CEP
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAddress = async (cep) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Erro ao buscar endereço: ', error);
        return null;
      }
    } else {
      console.warn('CEP inválido:', cep);
      return null;
    }
  };

  useEffect(() => {
  }, [cep]);

  const handleSearch = async () => {
    try {
      const address = await fetchAddress(cep); // Chamar a função fetchAddress
      if (address) {
        const userLocation = address.localidade;

        // Definir searchDTO aqui, antes da requisição fetch
        const searchDTO = {
          serviceName: searchTerm,
          userLocation: userLocation,
        };

        const token = localStorage.getItem('token'); // Obter o token do localStorage
        const response = await fetch('http://localhost:8080/offered-service/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(searchDTO),
        });

        const results = await response.json();

        onSearch(results); // Chamar a função onSearch recebida como prop
      } else {
        console.error("Endereço não encontrado para o CEP informado.");
      }
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  };

  const handleCepChange = (event) => {
    setCep(event.target.value);
  };

  useEffect(() => {
    // Carrega o CEP do localStorage quando o componente é montado
    const storedCep = localStorage.getItem('cep');
    if (storedCep) {
      setCep(storedCep);
    }
  }, []);

  useEffect(() => {
    // Salva o CEP no localStorage sempre que o valor do CEP mudar
    localStorage.setItem('cep', cep);
  }, [cep]);

  useEffect(() => {
    // Função para buscar endereço pelo CEP
    const fetchAddress = async () => {
      if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();
          // Aqui você pode usar os dados retornados pela API para
          // preencher outros campos do endereço, como:
          // data.logradouro, data.bairro, data.localidade, data.uf
          console.log(data);
        } catch (error) {
          console.error('Erro ao buscar endereço:', error);
        }
      }
    };

    fetchAddress();
  }, [cep]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    { name: 'Profile', path: '/profile' }, // Adicionando a rota
    'Account',
    'Dashboard',
    'Logout',
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          backgroundColor: '#FFC107',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Marketplace do Job
          </Typography>

          <CepInput // Novo campo de CEP
            label="CEP"
            variant="outlined"
            size="small"
            value={cep}
            onChange={handleCepChange}
            sx={{
              width: '150px',
              marginRight: 2,
            }}
          />

          <Search sx={{ mx: 2 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Procurar prestador"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm} // Adicionar value
              onChange={(e) => setSearchTerm(e.target.value)} // Adicionar onChange
            />
          </Search>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch} // Adicionar onClick
            sx={{
              marginLeft: 2,
              borderRadius: 2,
              backgroundColor: '#388E3C',
              '&:hover': {
                backgroundColor: '#2E7D32',
              }
            }}
          >
            <SearchIcon />
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              keepMounted
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name || setting} onClick={handleCloseUserMenu}>
                  {setting.path ? (
                    <Link to={setting.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </Link>
                  ) : (
                    <Typography textAlign="center">{setting}</Typography>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
