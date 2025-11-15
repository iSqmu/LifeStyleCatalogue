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

function Offers({ onEdit, onDelete }) {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'offers'));
    const unsub = onSnapshot(q, (snapshot) => {
      setOfertas(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const handleEdit = (product) => {
    onEdit(product);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que quieres eliminar este producto?')) {
      try {
        await deleteDoc(doc(db, 'offers', id));
        alert('Producto eliminado');
      } catch (err) {
        alert('Error al eliminar');
      }
    }
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
            <Product
              key={p.id}
              producto={p}
              // type="offer"
              editable={true}
              onEdit={() => handleEdit(p)}
              onDelete={() => handleDelete(p.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Offers;
