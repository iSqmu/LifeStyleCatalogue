import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Carrousel from '../components/Carrousel';
import Imagenes from '../assets/imagenes';
function Catalogue() {
  const slideImages = [Imagenes.img3, Imagenes.img1, Imagenes.img2];
  return (
    <>
      <Navbar page="CATÁLOGO" />
      <Carrousel images={slideImages} />
    </>
  );
}

export default Catalogue;
