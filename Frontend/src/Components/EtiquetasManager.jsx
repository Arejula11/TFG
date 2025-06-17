import {  useState } from "react";
import { useEffect } from "react";
import PropTypes from 'prop-types';

export const EtiquetasManager = ({viaInfo, setEtiquetas}) => {

    const [inputValue, setInputValue] = useState("");
    const [etiquetas, setListaEtiquetas] = useState([]);

    useEffect(() => {
      if (viaInfo.etiquetas && viaInfo.etiquetas.length > 0) {
        setListaEtiquetas(viaInfo.etiquetas);
      }
    }, [viaInfo.etiquetas]);

    const handleAddEtiqueta = () => {
        const trimmed = inputValue.trim();
        if (trimmed && !etiquetas.includes(trimmed)) {
        setListaEtiquetas([...etiquetas, {id: null, idvia: viaInfo.id, nombre: trimmed}]);
        setInputValue("");
        }
        setEtiquetas([...etiquetas, {id: null, idvia: viaInfo.id, nombre: trimmed}]);
    };

    const handleRemoveEtiqueta = (etiqueta) => {
        setListaEtiquetas(etiquetas.filter(e => e !== etiqueta));
        setEtiquetas(etiquetas.filter(e => e !== etiqueta));
    };


  return (
    <div className="max-w-[80%] mx-auto h-[90%]  bg-white rounded-xl ">


      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddEtiqueta()}
            placeholder="Añadir etiqueta"
            className="border border-gray-300 rounded-lg p-2 w-64"
          />
          <button
            onClick={handleAddEtiqueta}
            className="bg-blueGreen text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Añadir
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {etiquetas.map((etiqueta, index) => (
            <span
              key={index}
              className="bg-orangeSalud text-white px-3 py-1 rounded-full flex items-center gap-2"
            >
              {etiqueta.nombre}
              <button
                onClick={() => handleRemoveEtiqueta(etiqueta)}
                className="ml-2 text-white hover:text-gray-200"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

EtiquetasManager.propTypes = {
  viaInfo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    etiquetas: PropTypes.arrayOf(PropTypes.object || PropTypes.string)
  }).isRequired,
  setEtiquetas: PropTypes.func.isRequired
};