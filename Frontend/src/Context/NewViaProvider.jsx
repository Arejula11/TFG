/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { NewViaContext } from "./NewViaContext";


export const NewViaProvider = ({children}) => {

    //Datos de la nueva vía
    const [newVia, setNewVia] = useState({
        nombre: '',
        etiquetas: [],
        nodos: [],
        graph: '',
        planificacion: [],
        ingreso: [],
        quirofano: [],
        postCirugia: [],
        primerDia: [],
        segundoDia: [],
        postOperatorio: [],
    })

   // Leer del localStorage
   useEffect(() => {
    const storedNewVia = JSON.parse(localStorage.getItem('newViaUser'));
    if (storedNewVia) {
        setNewVia(storedNewVia);
    }
    }, []);

    // Guardar en el localStorage
    useEffect(() => {
        localStorage.setItem('newViaUser', JSON.stringify(newVia));
    }, [newVia]);

    //Funcion para cambiar el nombre de la vía
    const changeName = (name) => {
        setNewVia((prev) => ({
            ...prev,
            nombre: name
        }));
    }

    //Funcion para definir las etiquetas de la vía
    const setEtiquetas = (etiquetas) => {
        setNewVia((prev) => ({
            ...prev,
            etiquetas: etiquetas
        }));
    }

    //Funcion para añadir los nodos de la vía
    const addNodos = (nodos) => {
        setNewVia((prev) => ({
            ...prev,
            nodos: [...prev.nodos, ...nodos]
        }));
    }

    //Funcion para eliminar un nodo de la vía
    const removeNodo = (nodo) => {
        setNewVia((prev) => ({
            ...prev,
            nodos: prev.nodos.filter(n => n !== nodo)
        }));
    }

    //Funcion para añadir el grafo de la vía
    const addGraph = (graph) => {
        setNewVia((prev) => ({
            ...prev,
            graph: graph
        }));
    }
    
    // Funcion para añadir la planificación de la vía
    const addTaskToEtapa = (etapaKey, taskOrTasks, replace = false) => {
    setNewVia((prev) => ({
        ...prev,
        [etapaKey]: replace
        ? taskOrTasks
        : [...(prev[etapaKey] || []), taskOrTasks]
    }));
    };

    //Funcion para actualizar una tarea en una etapa
    const updateTaskInEtapa = (etapaKey, taskName, updatedFields) => {
        setNewVia((prev) => {
            const updatedTasks = prev[etapaKey].map((task) =>
            task.nombre === taskName ? { ...task, ...updatedFields } : task
            );
            return {
            ...prev,
            [etapaKey]: updatedTasks
            };
        });
    };


    // Funcion para eliminar una tarea de una etapa
    const removeTaskFromEtapa = (etapaKey, task) => {
    setNewVia((prev) => ({
        ...prev,
        [etapaKey]: prev[etapaKey].filter((t) =>
        typeof t === "object" && t !== null
            ? t.nombre !== (task.nombre || task)
            : t !== task
        ),
    }));
    };


    // Funcion para borrar los datos de la nueva vía
    const clearNewVia = () => {
        setNewVia({
            nombre: '',
            nodos: [],
            graph: '',
            planificacion: [],
            ingreso: [],
            quirofano: [],
            postCirugia: [],
            primerDia: [],
            segundoDia: [],
            postOperatorio: [],
        });
        localStorage.removeItem('newViaUser');
    }

    //Funcion para limpiar los nodos de la vía
    const clearNodos = () => {
        setNewVia((prev) => ({
            ...prev,
            nodos: []
        }));
    }

    return (
        <NewViaContext.Provider value={{
            newVia,
            setNewVia,
            changeName,
            setEtiquetas,
            addNodos,
            updateTaskInEtapa,
            removeNodo,
            addGraph,
            addTaskToEtapa,
            removeTaskFromEtapa,
            clearNewVia,
            clearNodos
        }}>
            {children}
        </NewViaContext.Provider>
    )
}
