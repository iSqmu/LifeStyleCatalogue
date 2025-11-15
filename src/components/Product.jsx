// components/Product.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Product({ producto, editable, onEdit, onDelete}) {
  const status = producto.status || 'agotado';
  const StatusIcons = {
    stock:
      'indicador-figura w-5 h-5 bg-green-500 relative left-10 flex shadow-uniform shadow-green-500 rounded-full',
    encargo:
      'indicador-figura w-5 h-5 bg-yellow-500 relative left-10 flex shadow-uniform shadow-yellow-500 rounded-full',
    agotado:
      'indicador-figura w-5 h-5 bg-red-500 relative left-10 flex shadow-uniform shadow-red-500 rounded-full',
  };

  return (
    <div className="card bg-accent flex flex-col items-center min-h-8/10 text-primary rounded-lg shadow-accent shadow-uniform hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="title flex justify-center bg-secondary rounded-t-lg w-full mb-5">
        <div className="status relative top-3">
          <span className={StatusIcons[status]}></span>
        </div>
        <h3 className="w-full py-2 rounded-t-lg text-center text-xl font-semibold">
          {producto.nombre}
        </h3>
      </div>

      <div className="content flex flex-col items-center w-full h-full gap-2 overflow-hidden justify-center">
        {producto.imageURL ? (
          <img
            className="border-2 w-1/3 object-cover h-2/3 border-primary rounded-lg shadow-accent shadow-uniform"
            src={producto.imageURL}
            alt={producto.nombre}
          />
        ) : (
          <div className="w-1/3 h-2/3 bg-gray-200 border-2 border-dashed border-primary rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-sm">Sin imagen</span>
          </div>
        )}

        <div className="item-content w-full px-5 py-2 h-1/3 flex flex-col justify-center">
          <p>
            <span className="font-bold">Precio:</span> ${producto.precio}
          </p>
          <p>
            <span className="font-bold">Descripción:</span>{' '}
            {producto.descripcion || 'Sin descripción'}
          </p>
        </div>

        {editable && (
          <div className="interact flex w-full rounded-b-lg justify-around items-center">
            <button
              onClick={onEdit}
              className="w-1/2 h-10 cursor-pointer bg-yellow-500 hover:scale-105 transition duration-200 flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faEdit} />
              Editar
            </button>
            <button
              onClick={onDelete}
              className="w-1/2 h-10 cursor-pointer bg-red-500 hover:scale-105 transition duration-200 flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faTrash} />
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
