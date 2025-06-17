import { useNavigate } from "react-router-dom";
import { HomeButtonAdmin } from "../Components/HomeButtonAdmin";
import { NewViaContext } from "../Context/NewViaContext";
import { useContext, useEffect, useRef, useState } from "react";
import { ScrollShadow } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "react-beautiful-dnd";
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

const opciones = [
  { key: "booleano", label: "Dicotómica" },
  { key: "opciones", label: "Múltiple" },
  { key: "numerico", label: "Numérica" }
];

export const AdminAssign = () => {
  const navigate = useNavigate();
  const {
    newVia,
    addNodos,
    removeNodo,
    addTaskToEtapa,
    removeTaskFromEtapa,
    updateTaskInEtapa,
  } = useContext(NewViaContext);


  const [etapa, setEtapa] = useState("Planificación");
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  const nodosCopyRef = useRef([]);

  const [error, setError] = useState(null);

    // Limpia automáticamente el mensaje después de unos segundos
    useEffect(() => {
      if (error) {
        const timer = setTimeout(() => setError(null), 5000);
        return () => clearTimeout(timer);
      }
    }, [error]);

  useEffect(() => {
    nodosCopyRef.current = [...newVia.nodos]; // save the initial state once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only run once

  const handleAddNodoToEtapa = (nodo) => {
    const etapaKey = etapaKeyMap[etapa];
    const task = {
      nombre: nodo,
      tipo: null,
      opciones: [],
    };
    if (etapaKey) {
      addTaskToEtapa(etapaKey, task);
      removeNodo(nodo);
    }
  };

  const handleRemoveTaskFromEtapa = (task) => {
    const etapaKey = etapaKeyMap[etapa];
    if (etapaKey) {
      removeTaskFromEtapa(etapaKey, task);
      if (nodosCopyRef.current.includes(task)) {
        addNodos([task]);
      }
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const etapaKey = etapaKeyMap[etapa];
    const items = Array.from(newVia[etapaKey]);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    addTaskToEtapa(etapaKey, items, true); // `true` = replace list
  };

  const handleSiguiente = () => {
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
    navigate("/admin/newViaClinica/etiquetas");
  };

  return (
    <div className="w-full min-h-screen flex flex-col px-12 py-6">
      <HomeButtonAdmin />

      <h2 className="text-blueGreen text-5xl font-semibold mb-8 mt-2 text-center">
        Clasificación
      </h2>

      <div className="w-full max-w-[90%] flex flex-1 gap-10 mx-auto">
        {/* Left: Tareas */}
        <div className="flex-[1] border border-blueGreen rounded-lg p-4 shadow-sm flex flex-col max-h-[80vh]">
          <h3 className="text-center font-semibold text-blueGreen mb-4 text-4xl">
            Tareas
          </h3>
          <ScrollShadow size="0" className="w-full h-[88%] ">
            <ul className="space-y-2 flex-1">
              {newVia.nodos.map((nodo) => (
                <li
                  key={nodo}
                  className="flex items-center justify-between p-3 border border-blueGreen rounded-md hover:bg-blueGreen hover:text-white transition-colors cursor-pointer"
                  onClick={() => handleAddNodoToEtapa(nodo)}
                >
                  <span className="text-lg font-medium">{nodo}</span>
                </li>
              ))}
            </ul>
          </ScrollShadow>
          <button className="mt-6 bg-blueGreen text-white font-semibold py-2 rounded-md hover:bg-opacity-90 transition">
            Asignar
          </button>
        </div>

        {/* Right: Tabs and Task List */}
        <div className="flex-[2] flex flex-col gap-6 max-h-[80vh]">
          <div className="w-full flex flex-row justify-between gap-4 border border-blueGreen px-4 py-2 rounded-lg ">
            {Object.keys(etapaKeyMap).map((tab) => (
              <button
                key={tab}
                onClick={() => setEtapa(tab)}
                className={`text-lg font-medium ${
                  tab === etapa
                    ? "text-orangeSalud border-b-2 border-orangeSalud"
                    : "text-blueGreen"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
            
          <div className="border border-blueGreen rounded-lg px-6 pt-6 shadow-sm flex-1 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blueGreen">{etapa}</h3>
              <div className="flex items-center gap-4">
                {!isCreatingTask ? (
                  <button
                    className="bg-blueGreen text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-90"
                    onClick={() => setIsCreatingTask(true)}
                  >
                    Crear Tarea
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTaskName}
                      onChange={(e) => setNewTaskName(e.target.value)}
                      placeholder="Nombre de la tarea"
                      className="border border-gray-300 rounded-md px-3 py-1"
                      autoFocus
                    />
                    <button
                      className="bg-blueGreen text-white px-3 py-1 rounded-md hover:bg-opacity-90"
                      onClick={() => {
                        const name = newTaskName.trim();
                        if (!name) return;
                        const etapaKey = etapaKeyMap[etapa];
                        addTaskToEtapa(etapaKey, {
                          nombre: name,
                          tipo: null,
                          opciones: []
                        });
                        setIsCreatingTask(false);
                        setNewTaskName("");
                      }}
                    >
                      Crear
                    </button>
                    <button
                      className="text-white bg-[#ff1515] px-3 py-1 rounded-md hover:bg-opacity-90"
                      onClick={() => {
                        setIsCreatingTask(false);
                        setNewTaskName("");
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>

            </div>
            <ScrollShadow size="0" className="w-full h-[90%] ">
            {/* Draggable Task List */}
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="taskList">
                {(provided) => (
                  <div
                    className="space-y-4"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {(newVia[etapaKeyMap[etapa]] || []).map((task, index) => (
                      <Draggable
                        key={task.nombre}
                        draggableId={task.nombre}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-4 border border-blueGreen rounded-md flex flex-col"
                          >
                            <div className="flex flex-row justify-between items-center ">
                              <p className="text-md">{task.nombre}</p>
                              <div className="flex flex-row gap-4 min-w-[600px]">
                                <Select
                                  label="Seleccione una opción"
                                  defaultSelectedKeys={task.tipo ? [task.tipo] : []}
                                  placeholder="Seleccione una opción"
                                  onSelectionChange={(value) => {
                                    updateTaskInEtapa(etapaKeyMap[etapa], task.nombre, { tipo: value.currentKey });

                                  }}
                                >
                                  {opciones.map((opcion) => (
                                    <SelectItem key={opcion.key} value={opcion.key}>
                                      {opcion.label}
                                    </SelectItem>
                                  ))}
                                </Select>
                                <button
                                  className="mt-2 bg-[#ff1515] text-white px-3 py-1 rounded-md font-medium hover:bg-opacity-90"
                                  onClick={() =>
                                    handleRemoveTaskFromEtapa(task.nombre)
                                  }
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>

                            {task.tipo === "opciones" && (
                              <div className="mt-2">
                                <p className="text-sm text-gray-600">
                                  Opciones:
                                </p>
                                <input
                                  type="text"
                                  placeholder="Añadir opción"
                                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                                  onKeyDown={(e) => {
                                    if (
                                      e.key === "Enter" &&
                                      e.target.value.trim() !== ""
                                    ) {
                                      updateTaskInEtapa(etapaKeyMap[etapa], task.nombre, {
                                        opciones: [...(task.opciones || []), e.target.value.trim()]
                                      });
                                      e.target.value = "";
                                    }
                                  }}
                                />
                                <ul className="mt-2 flex flex-row gap-2 overflow-x-auto">
                                  {(task.opciones || []).map((opcion, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-center bg-blue-50 border border-blueGreen rounded-full px-3 py-1 text-sm text-gray-700 whitespace-nowrap shadow-sm"
                                    >
                                      <span>{opcion}</span>
                                      <button
                                        type="button"
                                        className="ml-2 p-1 rounded-full hover:bg-red-100"
                                        onClick={() => {
                                          updateTaskInEtapa(etapaKeyMap[etapa], task.nombre, {
                                            opciones: task.opciones.filter((_, i) => i !== idx)
                                          });

                                        }}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="18"
                                          height="18"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                        >
                                          <path
                                            d="M18 6L6 18"
                                            stroke="#FF0000"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                          />
                                          <path
                                            d="M6 6L18 18"
                                            stroke="#FF0000"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                          />
                                        </svg>
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            </ScrollShadow>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between w-full max-w-xl mt-10 mx-auto">
        <button
          type="button"
          onClick={() =>{ navigate("/admin/newViaClinica/grafo")}}
          className="bg-orangeSalud w-[200px] text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:opacity-100 opacity-90"
        >
          Atrás
        </button>
        <button
          type="button"
          onClick={handleSiguiente}
          className="bg-orangeSalud w-[200px] text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:opacity-100 opacity-90"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
