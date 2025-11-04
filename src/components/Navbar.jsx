import React from 'react';
import logo from '../../public/logo.png';

function Navbar({ page }) {
  return (
    <nav
      id="navbar"
      className="w-full flex h-auto bg-secondary text-primary px-2 py-3 place-items-center"
    >
      <img src={logo} alt="Lifestyle Logo" className="size-10" />

      <div className="nav-text flex max-lg:justify-center w-auto gap-2 place-items-center">
        <h2 className="text-xl font-inter">LIFE STYLE</h2>
        <span className="separator w-1 h-10 rounded-2xl bg-primary"></span>
        <h2 className="text-xl font-inter">{page}</h2>
      </div>
    </nav>
  );
}

export default Navbar;
