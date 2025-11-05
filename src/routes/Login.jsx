import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      setError('Error en login: ' + err.message);
    }
  }
  return (
    <>
      <Navbar page={'LOGIN'} />
      <div className="login h-screen flex flex-col justify-center items-center">
        <div className="login-form border-2 flex flex-col border-accent rounded-lg bg-secondary text-primary justify-center py-2 w-2/3 h-2/3 overflow-hidden">
          <h1 className="text-3xl font-bold text-center">Login Admin</h1>
          <form
            onSubmit={handleLogin}
            className="flex flex-col justify-center h-70 px-4"
          >
            <label htmlFor="email">
              Correo{' '}
              <span className="text-red-500 font-bold text-shadow-2xs text-shadow-red-500">
                *
              </span>
            </label>
            <input
              className="border-2 color-primary rounded-lg px-4 py-2 mb-5 outline-0 shadow-accent focus:border-accent invalid:border-red-500 invalid:text-red-500 focus:shadow-uniform transition-all duration-200 ease-in "
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">
              Contraseña{' '}
              <span className="text-red-500 font-bold text-shadow-2xs text-shadow-red-500">
                *
              </span>
            </label>
            <input
              className="border-2 color-primary rounded-lg px-4 py-2 mb-5 outline-0 shadow-accent focus:border-accent invalid:border-red-500 invalid:text-red-500 focus:shadow-uniform transition-all duration-200 ease-in "
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-primary text-accent rounded-lg px-4 py-2 hover:bg-accent hover:text-primary transition-all duration-200 ease-in cursor-pointer"
            >
              Ingresar
            </button>
            {error && (
              <p className="text-red-500 font-bold text-lg mt-2">
                Usuario o contraseña incorrectos.
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
