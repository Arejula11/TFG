import {  useContext, useEffect, useState } from "react";
import { CSVLink } from "react-csv"
import { getViaData, getViaName } from "../utils/getVia";
import { useLocation, useNavigate } from "react-router-dom";
import { HomeButtonAdmin } from "../Components/HomeButtonAdmin";
import { updateNameVia } from "../utils/updateVia";
import { EtiquetasManager } from "../Components/EtiquetasManager";
import { TareasManager } from "../Components/TareasManager";
import { NewViaContext } from "../Context/NewViaContext";
import toast from "react-hot-toast";

const etapaKeyMap = {
  "Planificación": "planificacion",
  "Ingreso": "ingreso",
  "Quirofano": "quirofano",
  "Post Cirugía": "postCirugia",
  "Primer día": "primerDia",
  "Segundo día": "segundoDia",
  "Post Operatorio": "postOperatorio"
};

export const AdminViaClinica = () => {

    const { newVia,
            setNewVia,
            setEtiquetas,
            clearNodos} = useContext(NewViaContext);
     const [nodosCopyRef, setNodosCopyRef] = useState([]);
    const location = useLocation();
    const via = location.state?.via;
    const viaId = via?.id;
    console.log("Via ID:", viaId);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(() => {
      if (newVia && newVia.nombre && newVia.nombre.trim() !== "") {
        return newVia.nombre;
      }
      return via?.nombre || '';
    });
    useEffect(() => {
        setNewVia((prev) => ({
            ...prev,
            nombre: editedName 
        }));
    }, [editedName]);

    const phaseNames = [
            'Planificación', 'Ingreso', 'Quirófano', 'Post-cirugía',
            'Primer día', 'Segundo día', 'Post-operatorio'
        ];

    const headers = [
        { label: "NHC", key: "id" },
        { label: "Actividad", key: "actividad" },
        {label: "Fecha", key: "fecha" },
        {label: "Recursos", key: "recurso" }
    ];

    const formatDate = (dateString) => {
        //the date is YYYY-MM-DD and we need to format it to DD/MM/YYYY
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }


    useEffect(() => {
      if (newVia && newVia.nombre === via?.nombre) {
        return;
      }
        const fetchData = async () => {
          console.log("Fetching data for viaId:", viaId);
            getViaData(viaId).then(async (response) => {
              console.log("Response from getViaData:", response);

                if (!response) {
                    console.error("No response received from getViaData.");
                    setData([]);
                    setIsLoading(false);
                    return;
                }
                if (response.status === 200) {
                    const data = await response.json();
                    const formattedData = [];
                    let prevId = null;
                    for (const item of data) {
                        const currentId = item.idoperacion;
                        formattedData.push({
                            id: currentId === prevId ? '' : currentId,
                            actividad: item.nombre,
                            fecha: formatDate(item.fecha),
                            recurso: '' // Set your recurso value here if needed
                        });
                        prevId = currentId;
                    }
                    setData(formattedData);
                    setIsLoading(false);
                } else if (response.status === 404) {
                    console.error("No data found for the given via ID.");
                    setData([]);
                    setIsLoading(false);
                    
                } else {
                    console.error("Error fetching data:", response.statusText);
                    setData([]);
                    setIsLoading(false);
                }
            });
        }
        const fetchInfoVia = async () => {
            getViaName(viaId).then(async (response) => {
                if (response) {
                    const getTareas = (nombreFase) => {
                        const fase = response.fases.find(fase => fase.nombre === nombreFase);
                        return fase && fase.tareas ? fase.tareas.map((task) => {
                          return {
                              nombre: task.descripcion,
                              tipo: task.tipo || null,
                              opciones: Array.isArray(task.opciones) ? task.opciones.map((opcion) => {return opcion.descripcion}) : []
                          };
                      })  : [];
                    };

                    const nodos = [];
                    phaseNames.map(phaseName => {
                        const tareasFase = getTareas(phaseName);
                        if (tareasFase && tareasFase.length > 0) {
                            tareasFase.forEach(tarea => {
                                nodos.push({
                                    nombre: tarea.nombre
                                });
                                setNodosCopyRef(prev => [
                                  ...prev,
                                  {
                                    nombre: tarea.nombre,
                                    tipo: tarea.tipo || null,
                                    opciones: Array.isArray(tarea.opciones) ? tarea.opciones.map((opcion) => opcion.descripcion) : []
                                  }
                                ]);
                            });
                        }
                    });
                    setNewVia((prev) => ({
                        ...prev,
                        nombre: response.nombre || via?.nombre || '',
                        etiquetas: response.etiquetas || [],
                        nodos: nodos  || [], //Join the nodes from all phases
                        planificacion: getTareas("Planificación"),
                        ingreso: getTareas("Ingreso"),
                        quirofano: getTareas("Quirófano"),
                        postCirugia: getTareas("Post-cirugía"),
                        primerDia: getTareas("Primer Día"),
                        segundoDia: getTareas("Segundo Día"),
                        postOperatorio: getTareas("Post-operatorio")
                    }));
                    clearNodos();
                }
            });
        }

        fetchData();
        fetchInfoVia();
    }
    , [viaId]);

    const handleSaveName = async () => {
        try {
            const response = await updateNameVia(viaId, editedName);
            if (response) {
                setIsEditing(false);
                // Optionally, you can update the via object in the state or refetch it
                via.nombre = editedName; // Update the via object with the new name
            }
        } catch (error) {
            console.error("Error updating via name:", error);
            // Handle error (e.g., show a notification)
        }
    };

    if (!newVia || !viaId) {
      return <div>Cargando datos de la vía clínica...</div>;
    }

    const handleSaveVia = () => {
      //Comprobar que se hayan asignado todas las tareas
    if (newVia.nodos.length !== 0) {
      toast.error("Aún hay nodos sin asignar a tareas. Por favor, asigne todos los nodos antes de continuar.");
      return;
    }

    //Comprobar que al menos una tarea se haya asignado a cada etapa
    if (Object.keys(newVia.planificacion || {}).length === 0) {
      toast.error("Debe crear al menos una tarea en la etapa de Planificación.");
      return;
    }
    if (Object.keys(newVia.ingreso || {}).length === 0) {
      toast.error("Debe crear al menos una tarea en la etapa de Ingreso.");
      return;
    }
    if (Object.keys(newVia.quirofano || {}).length === 0) {
      toast.error("Debe crear al menos una tarea en la etapa de Quirofano.");
      return;
    }
    if (Object.keys(newVia.postCirugia || {}).length === 0) {
      toast.error("Debe crear al menos una tarea en la etapa de Post Cirugía.");
      return;
    }
    if (Object.keys(newVia.primerDia || {}).length === 0) {
      toast.error("Debe crear al menos una tarea en la etapa de Primer Día.");
      return;
    }
    if (Object.keys(newVia.segundoDia || {}).length === 0) {
      toast.error("Debe crear al menos una tarea en la etapa de Segundo Día.");
      return;
    }
    if (Object.keys(newVia.postOperatorio || {}).length === 0) {
      toast.error("Debe crear al menos una tarea en la etapa de Post Operatorio.");
      return;
    }
    // Hay que comporbar que se haya definido todos los tipos de tareas
    const etapas = Object.keys(etapaKeyMap);
    for (const etapa of etapas) {
      const etapaKey = etapaKeyMap[etapa];
      const tasks = newVia[etapaKey] || [];
      for (const task of tasks) {
        if (!task.tipo) {
          toast.error(`La tarea "${task.nombre}" en la etapa "${etapa}" no tiene un tipo definido. Por favor, defina el tipo de tarea antes de continuar.`);
          return;
        }
      }
    }

    //Hay que comprobar que todas las tareas de tipo "opciones" tengan al menos una opción
    for (const etapa of etapas) {
      const etapaKey = etapaKeyMap[etapa];
      const tasks = newVia[etapaKey] || [];
      for (const task of tasks) {
        if (task.tipo === "opciones" && (!task.opciones || task.opciones.length === 0)) {
          toast.error(`La tarea "${task.nombre}" en la etapa "${etapa}" es de tipo "opciones" pero no tiene opciones definidas. Por favor, añada al menos una opción antes de continuar.`);
          return;
        }
      }
    }

    // Si todo está correcto, navegar a la siguiente página
    toast.success("Tareas asignadas correctamente");
        navigate(`/admin/viaclinica/${viaId}/confirmar`, {state: {newVia}});
    }

    return (
      <div className="  h-[90%] mt-10 p-6">
        <HomeButtonAdmin />
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center mb-4">
            <h1 className="text-blueGreen text-4xl font-bold text-center mr-2">
              Vía Clínica:&nbsp;
              {isEditing ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-4xl border-b-2 border-blueGreen focus:outline-none focus:border-blue-500 w-64 p-1 bg-transparent"
                  autoFocus
                />
              ) : (
                <span className="font-semibold">{editedName}</span>
              )}
            </h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="ml-2 p-1 rounded hover:bg-blue-50 transition"
                aria-label="Editar nombre de la vía clínica"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#F87A01"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                  <path d="M16 5l3 3" />
                </svg>
              </button>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <button
                  className="text-white bg-orangeSalud rounded px-4 py-1 font-semibold hover:bg-orange-600 transition"
                  onClick={handleSaveName}
                >
                  Guardar
                </button>
                <button
                  className="text-orangeSalud border border-orangeSalud rounded px-4 py-1 font-semibold hover:bg-orange-50 transition"
                  onClick={() => {
                    setEditedName(via.nombre);
                    setIsEditing(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center w-full min-w-[90vh] ">
          <EtiquetasManager viaInfo={newVia} setEtiquetas={setEtiquetas} />
          <TareasManager nodosCopyRef={nodosCopyRef}/>
          <div className="flex flex-row items-center gap-4 mb-10">
            <CSVLink
            data={data}
            filename={`vias_clinica_${via.nombre}.csv`}
            enclosingCharacter={``}
            separator=";"
            className={`bg-blueGreen text-white font-bold px-5 py-2 rounded-lg opacity-90 hover:opacity-100 transition ${data.length === 0 ? 'cursor-not-allowed bg-gray-300' : ''}`}
            headers={headers}
            aria-label="Descargar datos de la vía clínica"
            disabled={data.length === 0}
          >
            {isLoading
              ? "Descargando..."
              : data.length === 0
                ? "No hay datos disponibles"
                : "Descargar Datos Vía Clínica"}
          </CSVLink>
          <button
            className="bg-blueGreen text-white font-bold px-5 py-2 rounded-lg opacity-90 hover:opacity-100 transition"
            onClick={handleSaveVia}
            aria-label="Editar tareas de la vía clínica"
          >
            Guardar
          </button>
          </div>
          
        </div>
      </div>
    );
}
