import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Offer({ oferta, editable, onEdit, onDelete }) {
  return (
    <div className="card bg-accent flex flex-col items-center min-h-8/10 text-primary rounded-lg shadow-accent shadow-uniform hover:scale-105 transition-all duration-300 ease-in-out relative overflow-hidden">
      <div className="title flex justify-center bg-secondary rounded-t-lg w-full mb-5">
        <h3 className="w-full py-2 rounded-t-lg text-center text-xl font-semibold">
          {oferta.nombre || 'Sin nombre'}
        </h3>
      </div>

      <div className="content flex flex-col items-center w-full h-full m-auto gap-2 overflow-hidden justify-evenly">
        {oferta.imageURL ? (
          <img
            className="border-2 w-1/3 object-cover h-2/3 border-primary rounded-lg shadow-accent shadow-uniform"
            src={oferta.imageURL}
            alt={oferta.nombre}
          />
        ) : (
          <div className="w-1/3 h-2/3 bg-gray-200 border-2 border-dashed border-primary rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-sm">Sin imagen</span>
          </div>
        )}

        {editable && (
          <div className="interact flex w-full rounded-b-lg justify-around items-center absolute top-[90%]">
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

export default Offer;
