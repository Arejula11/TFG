import { useContext, useState } from "react";
import { HomeButtonAdmin } from "../Components/HomeButtonAdmin"
import { NewViaContext } from "../Context/NewViaContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AdminEtiquetas = () => {
    const { newVia, setEtiquetas } = useContext(NewViaContext);
    const [inputValue, setInputValue] = useState("");
    const [etiquetas, setListaEtiquetas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      if (newVia.etiquetas && newVia.etiquetas.length > 0) {
        setListaEtiquetas(newVia.etiquetas);
      }
    }, [newVia.etiquetas]);

    const handleAddEtiqueta = () => {
        const trimmed = inputValue.trim();
        if (trimmed && !etiquetas.includes(trimmed)) {
        setListaEtiquetas([...etiquetas, trimmed]);
        setInputValue("");
        }
    };

    const handleRemoveEtiqueta = (etiqueta) => {
        setListaEtiquetas(etiquetas.filter(e => e !== etiqueta));
    };

    const handleSubmit = () => {
        setEtiquetas(etiquetas);
       navigate("/admin/newViaClinica/confirmar")
    };

  return (
    <div className="max-w-[80%] mx-auto h-[90%] mt-10 p-6 bg-white rounded-xl ">
      <HomeButtonAdmin />
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-blueGreen text-7xl font-bold text-center">
          Vía Clínica: {newVia.nombre}
        </h1>
        <h2 className="text-orangeSalud text-5xl font-bold text-center mt-4">
          Definir las Etiquetas
        </h2>
      </div>

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
              {etiqueta}
              <button
                onClick={() => handleRemoveEtiqueta(etiqueta)}
                className="ml-2 text-white hover:text-gray-200"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-blueGreen text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-700 transition"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
