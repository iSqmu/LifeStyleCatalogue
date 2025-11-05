import React, { useEffect, useState } from 'react';

function Product({ producto }) {
  const status = producto.status;
  const StatusIcons = {
    stock:
      'indicador-figura w-5 h-5 bg-green-500 relative left-10 flex shadow-uniform shadow-green-500 rounded-full',
    encargo:
      'indicador-figura w-5 h-5 bg-yellow-500 relative left-10 flex shadow-uniform shadow-yellow-500 rounded-full',
    agotado:
      'indicador-figura w-5 h-5 bg-red-500 relative left-10 flex shadow-uniform shadow-red-500 rounded-full',
  };

  return (
    <div className="card bg-accent flex flex-col items-center  text-primary rounded-lg shadow-accent shadow-uniform hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="title flex justify-center bg-secondary rounded-t-lg w-full mb-5">
        <div className="status relative top-3">
          <span className={StatusIcons[status]}></span>
        </div>
        <h3 className="w-full py-2 rounded-t-lg text-center text-xl font-semibold">
          {producto.nombre}
        </h3>
      </div>
      {producto.imageURL && (
        <img
          className=" border-2 border-primary rounded-lg shadow-accent shadow-uniform"
          src={producto.imageURL}
          alt={producto.nombre}
        />
      )}

      <div className="item-content w-full px-5 py-2 ">
        <p>
          <span className="font-bold">Precio:</span> ${producto.precio}
        </p>
        <p>
          <span className="font-bold">Descripción:</span> {producto.descripcion}
        </p>
      </div>
    </div>
  );
}

export default Product;
