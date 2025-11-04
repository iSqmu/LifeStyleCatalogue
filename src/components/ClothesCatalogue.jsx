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
  console.log(productos);
  return (
    <div className="productos">
      {productos.map((p) => (
        <Product key={p.id} producto={p} />
      ))}
    </div>
  );
}

export default ClothesCatalogue;
