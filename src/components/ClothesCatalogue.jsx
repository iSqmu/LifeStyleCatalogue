import React, { useEffect, useState } from 'react';
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
import '../catalogue.css';
import Product from './Product';

function ClothesCatalogue() {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const q = query(collection(db, 'clothes'));
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
      <div className="grid cards gap-5">
        {productos.length == 0
          ? 'No hay productos en este catálogo'
          : productos.map((p) => <Product key={p.id} producto={p} />)}
      </div>
    </div>
  );
}

export default ClothesCatalogue;
