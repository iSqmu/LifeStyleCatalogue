import React from 'react';

function Product({ producto }) {
  return (
    <div className="card">
      {producto.imageURL && (
        <img src={producto.imageURL} alt={producto.nombre} />
      )}
      <h3>{producto.nombre}</h3>
      <p>{producto.precio}</p>
      <p>{producto.descripcion}</p>
      <div className="status">
        <span>{producto.status}</span>
      </div>
    </div>
  );
}

export default Product;
