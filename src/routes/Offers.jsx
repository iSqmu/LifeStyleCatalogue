import React, { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';
import Offer from '../components/Offer';
import Swal from 'sweetalert2';
import { warning } from 'framer-motion';

function Offers({ onEdit, onDelete }) {
  const [ofertas, setOfertas] = useState([]);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  useEffect(() => {
    const q = query(collection(db, 'offers'));
    const unsub = onSnapshot(q, (snapshot) => {
      setOfertas(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'offers', id));
      Toast.fire({
        icon: 'success',
        title: 'Elemento eliminado correctamente',
      });
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: error,
      });
    }
  };

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

  const handleEdit = async (product) => {
    onEdit(product);
  };

  return (
    <div className="productos px-5 py-8">
      <h1 className="text-3xl font-bold text-accent mb-6">Ofertas</h1>
      <div className="grid cards gap-6 p-5">
        {ofertas.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No hay ofertas
          </p>
        ) : (
          ofertas.map((p) => (
            <Offer
              key={p.id}
              oferta={p}
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

export default Offers;
