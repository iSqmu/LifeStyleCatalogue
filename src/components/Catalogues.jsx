import React, { useState, Suspense } from 'react';
import { db } from '../firebase';
const LazyComponent = React.lazy(() => {
  import('./SupplementsCatalogue');
});

function Catalogues() {
  const [currentComponent, setCurrentComponent] = useState(null);
  const buttonBase = 'w-1/2 py-2 mx-4 font-semibold';
  const buttonActive = 'bg-blue-600 text-white border-blue-600 shadow-lg';
  const buttonInactive =
    'bg-gray-100 text-blue-600 border-blue-600 hover:bg-gray-200';
  function loadComponent(componentName) {
    setCurrentComponent(componentName);
  }

  const componentMap = {
    Clothes: () => import('./ClothesCatalogue'),
    Supplements: () => import('./SupplementsCatalogue'),
  };

  const DynamicComponent = currentComponent
    ? React.lazy(componentMap[currentComponent])
    : () => <p>Selecciona un cátalogo</p>;

  return (
    <>
      <div className="catalogos w-full bg-tertiary pt-5 px-2 font-poppins text-white flex flex-col items-center overflow-hidden">
        <h1 className="text-2xl font-bold">CATÁLOGOS</h1>
        <div className="catalogo">
          <div className="tabs w-dvw flex justify-left mt-5">
            <button
              className={`${buttonBase} rounded-tl-2xl ${
                currentComponent === 'Clothes' ? buttonActive : buttonInactive
              }`}
              onClick={() => loadComponent('Clothes')}
            >
              Ropa deportiva
            </button>
            <button
              className={`${buttonBase} rounded-tr-2xl ${
                currentComponent === 'Supplements'
                  ? buttonActive
                  : buttonInactive
              }}`}
              onClick={() => loadComponent('Supplements')}
            >
              Suplementos
            </button>
          </div>
        </div>
        <Suspense fallback={<p>Cargando...</p>}>
          {currentComponent ? (
            <DynamicComponent key={currentComponent} />
          ) : (
            <p>Selecciona un catálogo</p>
          )}
        </Suspense>
      </div>
    </>
  );
}

export default Catalogues;
