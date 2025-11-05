import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBills } from '@fortawesome/free-solid-svg-icons';
import imagenes from '../assets/imagenes';

function Footer() {
  return (
    <>
      <div className="flex justify-around gap-3 py-4 bg-secondary">
        <img
          className="h-10 m-2 w-auto flex justify-center items-center hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out"
          src={imagenes.mercadopago}
          alt="Mercado Pago"
        />
        <img
          className="h-10 m-2 w-auto flex justify-center items-center hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out"
          src={imagenes.efecty}
          alt="Efecty"
        />
        <img
          className="h-8 m-2 w-auto flex justify-center items-center hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out"
          src={imagenes.davipalta}
          alt="Daviplata"
        />
        <img
          className="h-8 m-2 w-auto flex justify-center items-center hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out"
          src={imagenes.nequi}
          alt="Nequi"
        />
        <FontAwesomeIcon
          className="text-white text-4xl  m-2 w-auto flex justify-center items-center hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out"
          icon={faMoneyBills}
        />
      </div>
    </>
  );
}

export default Footer;
