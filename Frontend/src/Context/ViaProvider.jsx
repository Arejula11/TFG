/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { ViaContext } from "./ViaContext";



export const ViaProvider = ({children}) => {

  //Datos básicos del usuario
  const [via, setVia] = useState(
  {

    planificacion: [],
    ingreso: [],
    quirofano: [],
    postCirugia: [],
    primerDia: [],
    segundoDia: [],
    postOperatorio: [],

  });

   // Leer del localStorage
   useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('via'));
    // console.log(storedUser);
    if (storedUser) {
        setVia(storedUser);
    }
    }, []);

    // Guardar en el localStorage
    useEffect(() => {
        localStorage.setItem('via', JSON.stringify(via));
    }, [via]);

    //Funcion para actualizar el valor de una tarea de la vía en una etapa específica
    const updateViaTask = (etapa, task) => {
        setVia((prev) => ({
            ...prev,
            [etapa]: prev[etapa].map(t => t.id === task.id ? task : t)
        }));
    }

    //Funcion para definir las tareas de la vía
    const setViaTareas = (etapa, tareas) => {
        setVia((prev) => ({
            ...prev,
            [etapa]: tareas
        }));
    }

  return (
    <ViaContext.Provider value={{via, setVia, updateViaTask, setViaTareas}}>
        {children}
    </ViaContext.Provider>
  )
}
