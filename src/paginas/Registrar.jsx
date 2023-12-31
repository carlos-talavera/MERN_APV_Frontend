import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {

    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {

      setAlerta({
        msg: "Hay campos vacíos",
        error: true
      });
      return;

    }

    if (password !== repetirPassword) {

      setAlerta({
        msg: "Las contraseñas no coinciden",
        error: true
      });
      return;

    }

    if (password.length < 6) {

      setAlerta({
        msg: "La contraseña debe ser de por lo menos 6 caracteres",
        error: true
      });

    }

    // Quitar el mensaje de alerta
    setAlerta({});

    // Crear el usuario en la API
    try {

      await clienteAxios.post('/veterinarios', {
        nombre,
        email,
        password
      });

      setAlerta({
        msg: "Creado correctamente. Revisa tu email",
        error: false
      });
      
    } catch (error) {

      // Mostrar mensaje de error de la API
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
      
    }

  }

  // Extraer el mensaje de alerta para que si está vacío, entonces no mostrar nada
  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Crea Tu Cuenta y Administra Tus {""}<span className="text-black">Pacientes</span></h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta
          alerta={alerta}
        /> /* Forma tricky de mostrar elementos de forma condicional en React */}
        <form
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              htmlFor="nombre"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              id="nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
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

          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Repetir Contraseña
            </label>
            <input
              type="password"
              placeholder="Repite tu contraseña"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              id="password"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />

        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            to="/"
            className="block text-center my-5 text-gray-500"
          >
            ¿Ya tienes una cuenta? Inicia sesión
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

export default Registrar