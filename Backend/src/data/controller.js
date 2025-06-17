const pool = require('../../db');
const queries = require('./queries');
const queriesTareas = require('../tareas/queries');
const queriesOperaciones = require('../operacion/queries');

//Obtiene los datos asociados a una vía clínica, la respuesta se envia en un fichero csv
const getData = async ( req, res, next ) => {
    //Se obtiene todas las operacions que tienen la misma vía clínica
    const idvia = req.params.idvia;
    const operaciones = []; //Array para almacenar los ids de las operaciones
    const tareas = []; //Array para almacenar los ids de las tareas y su valor
    
    try {
        const operacionesData = await pool.query(queries.getOperacionesViaClinica, [idvia]);
        //Si no hay operaciones se devuelve un 404
        if (operacionesData.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron operaciones para la vía clínica especificada.' });
        }
        //Se obtiene el id de la operaciones
        operacionesData.rows.map((operacion) => {
            operaciones.push(operacion.id);
        });
        //Se obtiene la fecha de la operacion
        for (const operacion of operacionesData.rows) {
            const response = await pool.query(queriesOperaciones.dataOperacion, [operacion.id]);
            const fecha = response.rows[0].fecha;
            //Se formatea la fecha de  2025-02-22T23:00:00.000Z  a 2025-02-22
            const fechaFormateada = fecha.toISOString().split('T')[0];
            operacion.fecha = fechaFormateada;
        }
        console.log(operacionesData.rows);
        //Para cada una de las operaciones se obtiene los valores de las tareas y sus ids
        for (const id of operaciones) {
            //obtenemos las tareas asociadas a la operación
            const response = await pool.query(queriesTareas.getTareasOperacion, [id]);
            
            for (const tarea of response.rows) {
                if (tarea.completada !== null) {
                    const task = {
                        id: tarea.idtarea,
                        estado: tarea.completada,
                        idoperacion: tarea.idoperacion
                    }
                    tareas.push(task);
                }else if (tarea.opcion !== null) {
                    const task = {
                        id: tarea.idtarea,
                        estado: tarea.opcion,
                        idoperacion: tarea.idoperacion
                    }
                    tareas.push(task);
                } else if (tarea.valor !== null) {
                    const task = {
                        id: tarea.idtarea,
                        estado: tarea.valor,
                        idoperacion: tarea.idoperacion
                    }
                    tareas.push(task);
                } else {
                    const task = {
                        id: tarea.idtarea,
                        estado: null,
                        idoperacion: tarea.idoperacion
                        
                    }
                    tareas.push(task);
                }
            }
        }
        
        //ordena las tareas por id y operacion, donde las tareas con id mas pequeño van primero
        tareas.sort((a, b) => a.id - b.id);
        tareas.sort((a, b) => a.idoperacion - b.idoperacion);


        //Filtramos las tareas que su estado es null o false
        const tareasFiltradas = tareas.filter(tarea => tarea.estado !== null && tarea.estado !== false);

        //Obtenemos los nombres de las tareas
        for (const tarea of tareasFiltradas) {
            const response = await pool.query(queriesTareas.getTarea, [tarea.id]);
            tarea.nombre = response.rows[0].descripcion;
            tarea.fase = response.rows[0].id_fase;
            
            //Se añade la fecha de la operación a la tarea, si la tarea es de la fase 1 o 2 se le resta un día
            //si la fase es 3 o 4 es igual a la fecha, si la fase es 5 se le suma un día, si la fase es 6 se le
            //suma dos días y si la fase es 0 se le suma tres días
            const operacion = operacionesData.rows.find(op => op.id === tarea.idoperacion);
            if (operacion) {
                const fechaOperacion = new Date(operacion.fecha);
                switch (tarea.fase % 7) {
                    case 1:
                    case 2:
                        tarea.fecha = new Date(fechaOperacion.setDate(fechaOperacion.getDate() - 1)).toISOString().split('T')[0];
                        break;
                    case 3:
                    case 4:
                        tarea.fecha = operacion.fecha;
                        break;
                    case 5:
                        tarea.fecha = new Date(fechaOperacion.setDate(fechaOperacion.getDate() + 1)).toISOString().split('T')[0];
                        break;
                    case 6:
                        tarea.fecha = new Date(fechaOperacion.setDate(fechaOperacion.getDate() + 2)).toISOString().split('T')[0];
                        break;
                    case 0:
                        tarea.fecha = new Date(fechaOperacion.setDate(fechaOperacion.getDate() + 3)).toISOString().split('T')[0];
                        break;
                    default:
                        tarea.fecha = null;
                        break;
                }
            }
        }


        //ordena las tareas por id y operacion, donde las tareas con id mas pequeño van primero
        tareasFiltradas.sort((a, b) => a.id - b.id);
        tareasFiltradas.sort((a, b) => a.idoperacion - b.idoperacion);

        res.status(200).json(tareasFiltradas);
    } catch (err) {
        return next(err);
    }
}


module.exports = {
    getData,
};