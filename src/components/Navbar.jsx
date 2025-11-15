import React, { useState } from 'react';
import logo from '../../public/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Navbar({ page, links, activeTab, onTabChange, type }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTabClick = (id) => {
    onTabChange(id);
    setIsOpen(false); // Cierra menú en móvil
  };

  return (
    <nav className="bg-secondary text-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO + TÍTULO */}
          <a href="/" className="flex items-center space-x-3 flex-shrink-0">
            <img src={logo} alt="Lifestyle Logo" className="h-10 w-10" />
            <div className="flex items-center space-x-2">
              <h2 className="text-lg sm:text-xl font-bold font-inter">
                LIFE STYLE
              </h2>
              <span className="hidden sm:block w-1 h-8 bg-primary rounded-full"></span>
              <h2 className="hidden sm:block text-lg sm:text-xl font-bold font-inter">
                {page}
              </h2>
            </div>
          </a>

          {/* BOTÓN HAMBURGUESA (móvil) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-accent/50 transition cursor-pointer"
          >
            <FontAwesomeIcon
              icon={isOpen ? faTimes : faBars}
              className="text-xl"
            />
          </button>

          {/* ENLACES (desktop) */}
          <ul className="hidden lg:flex items-center space-x-2">
            {links?.map((link) => {
              if (type === 'tab') {
                return (
                  <li key={link.id}>
                    <button
                      onClick={() => handleTabClick(link.id)}
                      className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 relative overflow-hidden
                        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300
                        hover:after:w-full ${
                          activeTab === link.id
                            ? 'bg-accent'
                            : 'hover:bg-accent/50'
                        } cursor-pointer`}
                    >
                      {link.name}
                    </button>
                  </li>
                );
              }
              if (type === 'url') {
                return (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      className="px-4 py-2 rounded-lg font-bold text-sm hover:bg-accent/50 transition"
                    >
                      {link.name}
                    </a>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>

        {/* MENÚ MÓVIL */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            <ul className="flex flex-col space-y-2 mt-2">
              {links?.map((link) => {
                if (type === 'tab') {
                  return (
                    <li key={link.id}>
                      <button
                        onClick={() => handleTabClick(link.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm transition
                          ${
                            activeTab === link.id
                              ? 'bg-accent'
                              : 'hover:bg-accent/50'
                          } cursor-pointer`}
                      >
                        {link.name}
                      </button>
                    </li>
                  );
                }
                if (type === 'url') {
                  return (
                    <li key={link.id}>
                      <a
                        href={link.url}
                        className="block w-full text-left px-4 py-3 rounded-lg font-bold text-sm hover:bg-accent/50"
                      >
                        {link.name}
                      </a>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
