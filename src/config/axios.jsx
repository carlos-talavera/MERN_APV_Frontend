import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api` // URL backend
});

export default clienteAxios;