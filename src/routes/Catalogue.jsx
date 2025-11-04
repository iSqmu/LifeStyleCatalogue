import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Carrousel from '../components/Carrousel';
import Catalogues from '../components/Catalogues';
import Imagenes from '../assets/imagenes';
import '../catalogue.css';
function Catalogue() {
  const slideImages = [Imagenes.img3, Imagenes.img1, Imagenes.img2];
  return (
    <>
      <Navbar page="CATÁLOGO" />
      <Carrousel images={slideImages} />
      <div className="tarifas font-poppins p-4">
        <h2 className="text-2xl font-bold text-center mb-5">TARIFAS</h2>
        <div className="cards grid gap-x-10 gap-y-5">
          <div className="card size-auto bg-gray-200 border-2 border-white shadow-secondary shadow-uniform rounded-xl py-4 px-2 font-poppins">
            <h2 className="title-card text-center text-accent font-bold text-xl ">
              ANTICIPADO O CON DESCUENTO
            </h2>
            <p className="title-desc my-5 px-5 flex items-center font-semibold min-h-2/3 ">
              Esta tarifa se aplica cuando el pago se realiza de manera
              anticipada al envío del pedido. Esta presenta el valor más bajo
              porque reduce los costes y facilita la logística.
            </p>
          </div>
          <div className="card size-auto bg-gray-200 border-2 border-white shadow-secondary shadow-uniform rounded-xl py-4 px-2 font-poppins">
            <h2 className="title-card text-center text-accent font-bold text-xl ">
              CONTRAENTREGA
            </h2>
            <p className="title-desc my-5 px-5 flex items-center font-semibold min-h-2/3 ">
              Esta tarifa se aplica cuando los pagos son realizados por la
              página web, o con pagos a contraentrega los cuales generan costos
              por comisiones.
            </p>
          </div>
          <div className="card size-auto bg-gray-200 border-2 border-white shadow-secondary shadow-uniform rounded-xl py-4 px-2 font-poppins">
            <h2 className="title-card text-center text-accent font-bold text-xl ">
              CON TARJETA DE CREDITO
            </h2>
            <p className="title-desc my-5 px-5 flex items-center font-semibold min-h-2/3 ">
              Esta tarifa aplica a todos los pagos realizados con tarjetas de
              crédito bajo la modalidad de crédito donde se generan costos por
              comisiones altos.
            </p>
          </div>
        </div>
        <p className="w-full flex justify-center font-bold text-[12px] my-5">
          <span className="text-red-500 text-xl">*</span>Recuerda que en las
          tarifas no se incluye el valor del envío.
        </p>
      </div>
      <div className="indicadores-container w-full bg-accent text-primary font-poppins py-2 px-4">
        <h2 className="text-2xl font-bold text-center mb-5">INDICADORES</h2>
        <div className="indicadores w-full flex justify-around items-center pb-5">
          <div className="indicador flex justify-between items-center gap-2">
            <span className="indicador-figura w-10 h-10 bg-green-500 rounded-full"></span>
            <p className="indicador-texto font-bold">EN STOCK</p>
          </div>
          <div className="indicador flex justify-between items-center gap-2">
            <span className="indicador-figura w-10 h-10 bg-yellow-500 rounded-full"></span>
            <p className="indicador-texto font-bold">ENCARGO</p>
          </div>
          <div className="indicador flex justify-between items-center gap-2">
            <span className="indicador-figura w-10 h-10 bg-red-500 rounded-full"></span>
            <p className="indicador-texto font-bold">AGOTADO</p>
          </div>
        </div>
      </div>
      <Catalogues />
    </>
  );
}

export default Catalogue;
