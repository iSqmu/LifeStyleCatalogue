import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { signOut } from '@firebase/auth';
import { useNavigate } from 'react-router-dom';
import Product from '../components/Product';
import Navbar from '../components/Navbar';
import ImageUpload from '../components/ImageUpload';

function Dashboard() {
  const [productosClothes, setProductosClothes] = useState([]);
  const [productosSupplements, setProductosSupplements] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [status, setStatus] = useState('stock');
  const [path, setPath] = useState('clothes');
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Categoría seleccionada:', path);
  }, [path]);

  useEffect(() => {
    const qClothes = query(collection(db, 'clothes'));
    const unsubClothes = onSnapshot(qClothes, (snapshot) => {
      setProductosClothes(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    });
    const qSupplements = query(collection(db, 'supplements'));
    const unsubSupplements = onSnapshot(qSupplements, (snapshot) => {
      setProductosSupplements(
        snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    });
    return () => {
      unsubClothes();
      unsubSupplements();
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      nombre,
      precio: parseFloat(precio),
      descripcion,
      imageURL,
      status,
    };

    console.log(data, path);
    if (!path) return alert('Selecciona una categoría');
    try {
      if (editingId && path == 'clothes') {
        await updateDoc(doc(db, 'clothes', editingId), data);
        setEditingId(null);
      } else if (editingId && path == 'supplements') {
        await updateDoc(doc(db, 'supplements', editingId), data);
        setEditingId(null);
      } else {
        await addDoc(collection(db, path), data);
      }
      alert(`Producto ${nombre} guardado correctamente en el catálogo de ${path}`)
      resetForm();
    } catch (err) {
      console.error('Error al guardar:', error);
      alert('Error al guardar el producto');
    }
  }

  function editProduct(product, currentPath) {
    setNombre(product.nombre);
    setPrecio(product.precio);
    setDescripcion(product.descripcion);
    setImageURL(product.imageURL);
    setStatus(product.status);
    setPath(currentPath);
    setEditingId(product.id);
  }

  async function deleteProduct(id, currentPath) {
    if (confirm('¿Eliminar este producto?')) {
      await deleteDoc(doc(db, currentPath, id));
    }
  }

  function resetForm() {
    setNombre('');
    setPrecio('');
    setDescripcion('');
    setImageURL('');
    setStatus('');
  }

  function logOut() {
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Navbar page="ADMIN PANEL" />
      <div className="admin">
        <form
          onSubmit={handleSubmit}
          className="upload-edit flex flex-col justify-center mx-2 my-5 px-4 py-6 bg-accent/70 text-primary rounded-lg"
        >
          <h1 className="text-2xl font-bold text-center mb-5">
            {editingId ? 'Editar Producto' : 'Añadir producto al catálogo'}
          </h1>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="border-2 bg-primary/90 rounded-lg outline-0 border-primary text-secondary px-2 focus:bg-accent focus:text-primary invalid:border-red-500 transition duration-200"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            name="precio"
            className="border-2 bg-primary/90 rounded-lg outline-0 border-primary text-secondary px-2 focus:bg-accent focus:text-primary invalid:border-red-500 transition duration-200"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            name="Descripción"
            className="border-2 bg-primary/90 rounded-lg outline-0 border-primary text-secondary px-2 focus:bg-accent focus:text-primary invalid:border-red-500 transition duration-200"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
          <label htmlFor="estado">Estado</label>
          <select
            name="Estado"
            className="w-full bg-primary/90 text-accent font-bold rounded-lg px-2 outline-0 focus:bg-accent focus:text-primary focus:rounded-none transition duration-100"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="stock">En stock</option>
            <option value="encargo">Por encargo</option>
            <option value="agotado">Agotado</option>
          </select>
          <label htmlFor="path">Categoría</label>
          <select
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="w-full bg-primary/90 text-accent font-bold rounded-lg px-2 outline-0 focus:bg-accent focus:text-primary"
            required
          >
            <option value="clothes">Ropa</option>
            <option value="supplements">Suplementos</option>
          </select>
          <div className="upload w-full flex justify-center gap-5">
            <ImageUpload onUpload={setImageURL} />
            {imageURL && (
              <div className="mt-3 flex flex-col justify-center">
                Previsualización:
                <img
                  src={imageURL}
                  alt="Preview"
                  className="h-25 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          <div className="buttons flex justify-around gap-2 pt-5">
            <button
              type="submit"
              className="w-1/2 bg-primary text-secondary rounded-lg cursor-pointer hover:text-primary hover:bg-sky-600 hover:shadow-sky-600 hover:shadow-uniform transition duration-300 ease-in-out "
            >
              {editingId ? 'Actualizar' : 'Añadir'}
            </button>
            {editingId && (
              <button
                type="button"
                className="w-1/2 bg-red-500/60 rounded-lg cursor-pointer hover:bg-red-500 hover:shadow-red-500 hover:shadow-uniform transition duration-300 ease-in-out"
                onClick={resetForm}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
        <button
          onClick={logOut}
          className="bg-red-500 rounded-lg px-4 py-2 text-center"
        >
          Salir
        </button>
      </div>
    </>
  );
}

export default Dashboard;
