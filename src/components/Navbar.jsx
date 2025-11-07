import React from 'react';
import logo from '../../public/logo.png';

function Navbar({ page, links, activeTab, onTabChange, type }) {
  return (
    <nav
      id="navbar"
      className="w-full flex h-auto bg-secondary text-primary px-2 py-3 place-items-center"
    >
      <a href="/" className="logo flex w-1/3">
        <img src={logo} alt="Lifestyle Logo" className="size-10" />

        <div className="nav-text flex max-lg:justify-center w-auto gap-2 place-items-center">
          <h2 className="text-xl font-inter">LIFE STYLE</h2>
          <span className="separator w-1 h-10 rounded-2xl bg-primary"></span>
          <h2 className="text-xl font-inter">{page}</h2>
        </div>
      </a>
      <ul className="flex w-2/3 justify-end gap-5">
        {links &&
          links.map((link) => {
            // SI ES TIPO TAB → button con onClick
            if (type === 'tab') {
              return (
                <li key={link.id}>
                  <button
                    onClick={() => onTabChange(link.id)}
                    className={`nav-link relative text-primary font-bold after:content-[''] after:w-0 hover:after:w-8/10 after:rounded-full after:h-0.5 after:bg-primary after:absolute after:top-8/10 after:left-1/10 hover:bg-accent after:transition-all after:duration-300 transition-all duration-300 ease-in-out px-4 py-2 rounded-lg cursor-pointer ${
                      activeTab === link.id ? 'bg-accent' : ''
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              );
            }

            // SI ES TIPO URL → <a> normal
            if (type === 'url') {
              return (
                <li
                  key={link.id}
                  className="nav-link relative text-primary font-bold after:content-[''] after:w-0 hover:after:w-8/10 after:rounded-full after:h-0.5 after:bg-primary after:absolute after:top-8/10 after:left-1/10 hover:bg-accent after:transition-all after:duration-300 transition-all duration-300 ease-in-out px-4 py-2 rounded-lg"
                >
                  <a href={link.url}>{link.name}</a>
                </li>
              );
            }

            return null;
          })}
      </ul>
    </nav>
  );
}

export default Navbar;
