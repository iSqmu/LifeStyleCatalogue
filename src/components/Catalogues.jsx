import React, { useState, Suspense } from 'react';
const LazyComponent = React.lazy(() => {
  import('./SupplementsCatalogue');
});

function Catalogues() {
  const [currentComponent, setCurrentComponent] = useState(null);
  const buttonBase =
    'w-1/2 py-2 font-semibold border-accent border-t-2 border-l-2 border-r-2';
  const buttonActive = 'bg-accent text-white shadow-lg';
  const buttonInactive =
    'bg-gray-100 text-accent border-blue-600 hover:bg-gray-200';
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
      <div className="catalogos w-full bg-primary pt-5 px-2 font-poppins text-secondary flex flex-col items-center overflow-hidden">
        <h1 className="text-2xl font-bold">CATÁLOGOS</h1>
        <div className="catalogo w-full">
          <div className="tabs flex justify-left mt-5 w-full">
            <button
              className={`${buttonBase} rounded-tl-2xl cursor-pointer ${
                currentComponent === 'Clothes' ? buttonActive : buttonInactive
              }`}
              onClick={() => loadComponent('Clothes')}
            >
              Ropa deportiva
            </button>
            <button
              className={`${buttonBase} rounded-tr-2xl cursor-pointer ${
                currentComponent === 'Supplements'
                  ? buttonActive
                  : buttonInactive
              }}`}
              onClick={() => loadComponent('Supplements')}
            >
              Suplementos
            </button>
          </div>
          <div className="catalogo-content cards w-full grid mb-4 px-10 py-5 border-2 border-accent rounded-b-xl bg-primary/80 text-secondary">
            <Suspense fallback={<p>Cargando...</p>}>
              {currentComponent ? (
                <DynamicComponent key={currentComponent} />
              ) : (
                <p>Selecciona un catálogo</p>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

export default Catalogues;
