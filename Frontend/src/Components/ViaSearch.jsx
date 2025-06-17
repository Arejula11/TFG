import { ScrollShadow } from "@heroui/react";
import { useState } from "react";
import PropTypes from "prop-types";

export const ViaSearch = ({ vias, buttonInputChange }) => {
  const [input, setInput] = useState("");

  //ordena las vías por nombre alfabéticamente
  vias.sort((a, b) => a.nombre.localeCompare(b.nombre));  

  const onInputChange = ({ target }) => {
    setInput(target.value);
  };

  const filteredVias = vias.filter((via) => {
    if (input === "") {
      return true;
    } else {
      return (
        via.nombre.toLowerCase().includes(input.toLowerCase()) ||
        via.id.toString().includes(input)
      );
    }
  });

  const formatDate = (dateString) => {
                const date = new Date(dateString);
                return date.toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                });
              }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {vias.length === 0 ? (
        <p className="text-blueGreen text-2xl">No hay vías guardadas</p>
      ) : (
        <div className="w-full h-full flex flex-col items-center gap-6">
          {/* Input de búsqueda */}
          <input
            className="w-1/3 h-10 bg-[#F3F4F6] bg-opacity-50 border-2 border-blueGreen rounded-md my-3 p-2 focus:outline-none focus:ring-2 focus:ring-blueGreen"
            type="text"
            placeholder="Buscar vía"
            onChange={onInputChange}
            value={input}
            aria-label="Buscar vía"
          />

          {/* Lista con scroll */}
          <ScrollShadow size="0" className="w-[400px] h-[70%] bg-white/20 border-2 border-blueGreen rounded-md p-5 shadow-lg">
            {filteredVias.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">No se encontraron vías</p>
              </div>
            ) : (
              <ul className="divide-y divide-[#E5E7EB]">
                {filteredVias.map((via) => (
                  <li key={via.id}>
                    <button
                      className="flex flex-row items-center hover:bg-[#D1D5DB] transition-colors p-2 rounded-md w-full text-left"
                      type="button"
                      onMouseDown={e => e.preventDefault()}
                      onClick={() => buttonInputChange(via)}
                      aria-label={`Seleccionar vía ${via.nombre}`}
                    >
                      <span className="mr-4 font-medium text-[#111827] flex-1">{via.nombre}</span>
                      <span className="text-sm text-gray-500">{formatDate(via.fecha_creacion)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </ScrollShadow>
        </div>
      )}
    </div>
  );
};

ViaSearch.propTypes = {
  vias: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nombre: PropTypes.string.isRequired,
    })
  ).isRequired,
  buttonInputChange: PropTypes.func.isRequired,
};
