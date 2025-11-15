// routes/Clothes.jsx
import React, { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';
import Product from '../components/Product';
import Swal from 'sweetalert2';

function Clothes({ onEdit, onDelete }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'clothes'));
    const unsub = onSnapshot(q, (snapshot) => {
      setProductos(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const handleEdit = (product) => {
    onEdit(product);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'clothes', id));
      Toast.fire({
        icon: "success",
        title: "Elemento eliminado correctamente"
      })
    } catch(error) {
      Toast.fire({
        icon: "error",
        title: error
      })
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  })
  
  

  function warningSwal(id) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este elemento?',
      text: 'No podrás reveritrlo después',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5467CF',
      cancelButtonColor: '#FB2C36',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  }

  return (
    <div className="productos px-5 py-8">
      <h1 className="text-3xl font-bold text-accent mb-6">
        Catálogo de Ropa Deportiva
      </h1>
      <div className="grid cards gap-6 p-5">
        {productos.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No hay productos en este catálogo
          </p>
        ) : (
          productos.map((p) => (
            <Product
              key={p.id}
              producto={p}
              editable={true}
              onEdit={() => handleEdit(p)}
              onDelete={() => warningSwal(p.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Clothes;
