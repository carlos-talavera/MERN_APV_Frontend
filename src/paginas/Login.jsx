import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {

    e.preventDefault();

    if ([email, password].includes('')) {

        setAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true
        });
        return;

    }

    try {

        // Enviar información al endpoint de login
        const { data } = await clienteAxios.post('/veterinarios/login', {
            email,
            password
        });

        // Guardar información de usuario en el context
        setAuth(data);

        // Guardar el JWT en el Local Storage
        localStorage.setItem('apv_token', data.token);

        // Redireccionar al usuario a la página de administración
        navigate('/admin');
        
    } catch (error) {

        setAlerta({
            msg: error.response.data.msg,
            error: true
        });
        
    }

  }

  const { msg } = alerta;

  return (
    <>
        <div>
              <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesión y Administra Tus {""}<span className="text-black">Pacientes</span></h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            {msg && <Alerta
                alerta={alerta}
            />}
            <form
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label
                        htmlFor="email"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Email de registro"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="my-5">
                    <label
                        htmlFor="password"
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Contraseña
                    </label>
                    <input
                        type="password"
                        placeholder="Tu contraseña"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />

            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link 
                    to="/registrar"
                    className="block text-center my-5 text-gray-500"
                >
                    ¿No tienes una cuenta? Regístrate
                </Link>
                <Link
                    to="/olvide-password"
                    className="block text-center my-5 text-gray-500"
                >
                    Olvidé mi contraseña
                </Link>
            </nav>

        </div>
    </>
  )
}

export default Login