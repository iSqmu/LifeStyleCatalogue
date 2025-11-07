import React, { useEffect, useState} from 'react';
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


function Clothes() {
  return <h1>Clothes</h1>;
}

export default Clothes;
