import React, { useState } from 'react';
import { auth, signInWithEmailAndPassword } from '../firebase'; // ← TODO DESDE AQUÍ
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';
import bg from '../assets/img-bg.avif';
import { updateProfile } from '@firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      ); // ← USA LA FUNCIÓN IMPORTADA
      const user = userCredential.user;

      if (!user.displayName) {
        const name = prompt('¿Cómo quieres que te llamemos?');
        if (name) {
          await updateProfile(user, {
            displayName: name,
          });
          Toast.fire({
            icon: 'success',
            title: `¡Bienvenido ${name}!`,
          });
        }
      } else {
        Toast.fire({
          icon: 'success',
          title: `¡Bienvenido ${user.displayName}!`,
        });
      }
      navigate('/admin');
    } catch (err) {
      setError('Usuario o contraseña incorrectos.');
      console.error(err);
    }
  }

  return (
    <>
      <Navbar page={'LOGIN'} />
      <div className="login h-screen flex flex-col justify-center items-center overflow-hidden relative">
        <img
          src={bg}
          alt="Fondo"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        <div className="login-form border-2 border-accent rounded-lg bg-secondary/95 text-primary p-6 w-11/12 max-w-md backdrop-blur-sm">
          <h1 className="text-3xl font-bold text-center mb-6">Login Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-medium">
                Correo <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 rounded-lg px-4 py-2 mt-1 outline-none focus:border-accent transition"
                required
              />
            </div>
            <div>
              <label className="block font-medium">
                Contraseña <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 rounded-lg px-4 py-2 mt-1 outline-none focus:border-accent transition"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-accent font-bold py-3 rounded-lg hover:bg-accent hover:text-primary transition"
            >
              Ingresar
            </button>
            {error && (
              <p className="text-red-500 text-center font-medium">{error}</p>
            )}
          </form>
        </div>

        {/* DEBUG */}
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg shadow-lg z-50 text-xs">
          <details className="cursor-pointer">
            <summary className="font-bold">Debug</summary>
            <div className="mt-2 space-y-1">
              <p>1. Firebase Console → Authentication → Users</p>
              <p>
                2. Copia tu{' '}
                <code className="bg-white/20 px-1 rounded">UID</code>
              </p>
              <p>
                3. Pégalo en{' '}
                <code className="bg-white/20 px-1 rounded">setAdmin.js</code>
              </p>
              <p>
                4.{' '}
                <code className="bg-white/20 px-1 rounded">
                  node setAdmin.js
                </code>
              </p>
            </div>
          </details>
        </div>
      </div>
    </>
  );
}

export default Login;
