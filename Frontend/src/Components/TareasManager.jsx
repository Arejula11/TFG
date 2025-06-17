import PropTypes from 'prop-types';
import { useContext, useState } from "react";
import { ScrollShadow } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "react-beautiful-dnd";
import { NewViaContext } from '../Context/NewViaContext';




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

export const TareasManager = ({nodosCopyRef}) => {

     const { newVia, 
            addNodos,
            updateTaskInEtapa,
            removeNodo,
            addTaskToEtapa,
            removeTaskFromEtapa} = useContext(NewViaContext);

  
  const [etapa, setEtapa] = useState("Planificación");
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const handleAddNodoToEtapa = (nodo) => {
    const etapaKey = etapaKeyMap[etapa];
    const task = {
      nombre: nodo.nombre,
      tipo: nodo.tipo || null,
      opciones: nodo.opciones || [],
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
      if (nodosCopyRef.some(nodo => nodo.nombre === task.nombre)) {
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


  return ( 
    <div className="w-full min-h-[80vh] flex flex-col px-12 py-6">

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
                  key={nodo.nombre}
                  className="flex items-center justify-between p-3 border border-blueGreen rounded-md hover:bg-blueGreen hover:text-white transition-colors cursor-pointer"
                  onClick={() => handleAddNodoToEtapa(nodo)}
                >
                  <span className="text-lg font-medium">{nodo.nombre}</span>
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
                                    handleRemoveTaskFromEtapa(task)
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
                                        className="ml-2 p-1 rounded-full hover:bg-[#ff000020] hover:text-white transition-colors"
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


    </div>
  );
};



TareasManager.propTypes = {
  nodosCopyRef : PropTypes.isRequired,

};