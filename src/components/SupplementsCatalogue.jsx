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
import { db } from '../firebase';
import Product from './Product';
function SupplementsCatalogue() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const q = query(collection(db, 'supplements'));
    const unsub = onSnapshot(q, (snapshot) => {
      setProductos(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);
  return (
    <div className="productos">
      <h1 className="text-3xl font-bold text-accent mb-5">
        Catálogo de Ropa Deportiva.
      </h1>
      {productos.length == 0
        ? 'No hay productos en este catálogo'
        : productos.map((p) => <Product key={p.id} producto={p} />)}
    </div>
  );
}

export default SupplementsCatalogue;
