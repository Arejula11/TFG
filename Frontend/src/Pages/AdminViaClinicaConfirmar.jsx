import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVia } from "../utils/createVia";
import { HomeButtonAdmin } from "../Components/HomeButtonAdmin";
import { NewViaContext } from "../Context/NewViaContext";

export const AdminViaClinicaConfirmar = () => {

  const {newVia} = useContext(NewViaContext);
  console.log("Nueva vía clínica a confirmar:", newVia);
  const [viaToSave, setViaToSave] = useState({});


  useEffect(() => {
    setViaToSave({
      nombre: newVia.nombre,
      etiquetas: newVia.etiquetas.map(etiqueta => etiqueta.nombre),
      planificacion: newVia.planificacion.map(tarea => ({
        nombre: tarea.nombre,
        tipo: tarea.tipo,
        opciones:  Array.isArray(tarea.opciones) ? tarea.opciones.map((opcion) => {return opcion}) : []
      })),
      ingreso: newVia.ingreso.map(tarea => ({
        nombre: tarea.nombre,
        tipo: tarea.tipo,
        opciones:  Array.isArray(tarea.opciones) ? tarea.opciones.map((opcion) => {return opcion}) : []
      })),
      quirofano: newVia.quirofano.map(tarea => ({
        nombre: tarea.nombre,
        tipo: tarea.tipo,
        opciones:  Array.isArray(tarea.opciones) ? tarea.opciones.map((opcion) => {return opcion}) : []
      })),
      postCirugia: newVia.postCirugia.map(tarea => ({
        nombre: tarea.nombre,
        tipo: tarea.tipo,
        opciones:  Array.isArray(tarea.opciones) ? tarea.opciones.map((opcion) => {return opcion}) : []
      })),
      primerDia: newVia.primerDia.map(tarea => ({
        nombre: tarea.nombre,
        tipo: tarea.tipo,
        opciones:  Array.isArray(tarea.opciones) ? tarea.opciones.map((opcion) => {return opcion}) : []
      })),
      segundoDia: newVia.segundoDia.map(tarea => ({
        nombre: tarea.nombre,
        tipo: tarea.tipo,
        opciones:  Array.isArray(tarea.opciones) ? tarea.opciones.map((opcion) => {return opcion}) : []
      })),
      postOperatorio: newVia.postOperatorio.map(tarea => ({
        nombre: tarea.nombre,
        tipo: tarea.tipo,
        opciones:  Array.isArray(tarea.opciones) ? tarea.opciones.map((opcion) => {return opcion}) : []
      })),
    }
    );
  
  }, [newVia]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigate();

  const crearViaEnBD = async () => {
    setIsLoading(true);
    const response = await createVia(viaToSave);
    if (response.status === 201) {
      console.log("Vía clínica creada exitosamente");
      setIsLoading(false);
      navigation("/adminHome"); // Redirigir a la lista de vías clínicas
    } else {
      console.error("Error al crear la vía clínica");
      setIsLoading(false);
    }
  };

  const formatNombre = (nombre) =>
  nombre.replaceAll("_", " ").replace(/^\w/, (c) => c.toUpperCase());

const renderFase = (nombre, tareas) => (
  <div className="mb-6">
    <h3 className="text-3xl font-semibold text-blueGreen mb-2">{nombre}</h3>
    {tareas.length > 0 ? (
      <ul className="space-y-3">
        {tareas.map((tarea, idx) => (
          <li key={idx} className="border p-4 rounded-lg shadow-sm bg-gray-50">
            <p className="text-xl font-medium">{formatNombre(tarea.nombre)}</p>
            <p className="text-sm text-gray-600">Tipo: <strong>{tarea.tipo}</strong></p>
            {tarea.tipo === "opciones" && tarea.opciones.length > 0 && (
              <p className="text-sm text-gray-600">
                Opciones: <span className="italic">{tarea.opciones.join(", ")}</span>
              </p>
            )}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 italic">Sin tareas</p>
    )}
  </div>
);

  if (!viaToSave.nombre) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-blueGreen text-7xl font-semibold">Cargando...</h1>
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-orangeSalud"></div>
      </div>
    );
  }

  return ( 
    isLoading ? (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-blueGreen text-7xl font-semibold">Cargando...</h1>
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-orangeSalud"></div>
      </div>
    ) : (
      <div className="max-w-[80%] mx-auto h-[90%] mt-10 p-6 bg-white rounded-xl  overflow-y-auto">
        <HomeButtonAdmin />
        <div className="text-center mb-6">
          <h1 className="text-blueGreen text-6xl font-bold">Confirmar Vía Clínica</h1>
          <h2 className="text-orangeSalud text-4xl mt-4">{viaToSave.nombre}</h2>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2 text-blueGreen">Etiquetas:</h3>
          <div className="flex flex-wrap gap-2">
            {viaToSave.etiquetas.length > 0 ? (
              viaToSave.etiquetas.map((etiqueta, index) => (
                <span key={index} className="bg-orangeSalud text-white px-3 py-1 rounded-full">
                  {etiqueta}
                </span>
              ))
            ) : (
              <p className="text-gray-500 italic">Sin etiquetas</p>
            )}
          </div>
        </div>

        {/* Mostrar todas las fases con sus tareas */}
        {renderFase("Planificación", viaToSave.planificacion)}
        {renderFase("Ingreso", viaToSave.ingreso)}
        {renderFase("Quirófano", viaToSave.quirofano)}
        {renderFase("Post-Cirugía", viaToSave.postCirugia)}
        {renderFase("Primer día", viaToSave.primerDia)}
        {renderFase("Segundo día", viaToSave.segundoDia)}
        {renderFase("Post-Operatorio", viaToSave.postOperatorio)}

        <div className="flex justify-center mt-10">
          <button
            onClick={crearViaEnBD}
            className="bg-blueGreen text-white text-xl px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Confirmar y Crear Vía
          </button>
        </div>
      </div>
    )
  );
};
