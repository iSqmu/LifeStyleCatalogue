import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBills } from '@fortawesome/free-solid-svg-icons';
import imagenes from '../assets/imagenes';

function Footer() {
  return (
    <footer className="bg-secondary py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-8">
          {/* Mercado Pago */}
          <img
            src={imagenes.mercadopago}
            alt="Mercado Pago"
            className="h-10 w-auto hover:scale-110 transition-transform duration-200 cursor-pointer"
          />

          {/* Efecty */}
          <img
            src={imagenes.efecty}
            alt="Efecty"
            className="h-10 w-auto hover:scale-110 transition-transform duration-200 cursor-pointer"
          />

          {/* Daviplata */}
          <img
            src={imagenes.davipalta}
            alt="Daviplata"
            className="h-10 w-auto hover:scale-110 transition-transform duration-200 cursor-pointer"
          />

          {/* Nequi */}
          <img
            src={imagenes.nequi}
            alt="Nequi"
            className="h-10 w-auto hover:scale-110 transition-transform duration-200 cursor-pointer"
          />

          {/* Efectivo */}
          <div className="flex items-center justify-center">
            <FontAwesomeIcon
              icon={faMoneyBills}
              className="text-white text-4xl hover:scale-110 transition-transform duration-200 cursor-pointer"
            />
          </div>
        </div>

        {/* Texto opcional */}
        <p className="text-center text-white/70 text-sm mt-4">
          © 2025 Life Style. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
