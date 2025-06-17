const pool = require('../../db');
const queries = require('./queries');
const queriesViaClinia = require('../via/queries');
const queriesTareas = require('../tareas/queries');
const { get } = require('./routes');

//obtiene todas las operaciones de la bd
const getOperaciones = async (req, res, next) => {
    try {
        const response = await pool.query(queries.getOperaciones);
        res.json(response.rows);
    } catch (err) {
        next(err)
    }
}

//obtiene todas las operaciones de un usuario
const getOperacionesUsuario = async (req, res, next) => {
    const numhist = req.params.numhist;
    try {
        const response = await pool.query(queries.getOperacionesUsuario, [numhist]);
        res.json (response.rows)
    } catch (err) {
        next(err)
    }

}

//obtiene la info de una operación
const dataOperacion = async (req, res, next) => {
    const id = req.params.id;
    try {
        const response = await pool.query(queries.dataOperacion, [id]);
        res.json(response.rows[0]);
    } catch (err) {
        next(err)
    }
}

//Crea una operación y crea las tareas asociadas a la vía clínica de la operación
const createOperacion = async (req, res, next) => {
    const { indice, edad, fecha, etiqueta, idvia, numhist } = req.body;
    const tareas = [];
    try {
        await pool.query('BEGIN'); // Inicia la transacción

        // Crear la operación
        const response = await pool.query(queries.createOperacion, [ indice, edad, fecha, etiqueta, idvia, numhist]);
        if (response.rows.length === 0) throw new Error("No se pudo crear la operación");
        
        const idOperacion = response.rows[0].id; // Obtiene el ID de la operación creada

        // Obtener fases de la vía clínica
        const response2 = await pool.query(queriesViaClinia.getFases, [idvia]);
        const fases = response2.rows;
        if (fases.length === 0) console.warn("No hay fases para la vía clínica", idvia);

        // Iterar sobre las fases y agregar tareas
        for (const fase of fases) {
            const response3 = await pool.query(queriesViaClinia.getTareas, [fase.id]);
            const tareasFase = response3.rows;
            if (tareasFase.length === 0) console.warn(`No hay tareas para la fase ${fase.id}`);

            for (const tarea of tareasFase) {
                const response4 = await pool.query(queriesViaClinia.createTareaOperacion, [tarea.id, idOperacion]);
                tareas.push(response4.rows[0]);
            }
        }

        if (tareas.length === 0) throw new Error("No se crearon tareas, haciendo rollback");
        
        await pool.query('COMMIT'); // Confirmar la transacción

        res.json({
            message: 'Operacion creada correctamente',
            body: {
                operacion: response.rows,
                paciente: numhist,
                tareas: tareas
            }
        });
    } catch (err) {
        await pool.query('ROLLBACK'); // Deshacer la transacción en caso de error
        console.error("Error en createOperacion:", err);
        next(err);
    }
};



//actualiza la info de una operación
const updateOperacion = async (req, res, next) => {
    const { indice, edad, fecha, etiqueta, idvia, idoperacion } = req.body;
    try{
        const fields = [];
        const values = [];
        let query = 'UPDATE operacion SET ';
        if (indice) {
            fields.push('indice');
            values.push(indice);
        }
        if (edad) {
            fields.push('edad');
            values.push(edad);
        }
        if (fecha) {
            fields.push('fecha');
            values.push(fecha);
        }
        if (etiqueta) {
            fields.push('etiqueta');
            values.push(etiqueta);
        }
        if (idvia) {
            fields.push('idvia');
            values.push(idvia);
        }
        fields.forEach((field, index) => {
            query += `${field} = $${index + 1}, `;
        });
        query = query.slice(0, -2);
        query += ` WHERE id = $${fields.length + 1} RETURNING *`;
        values.push(idoperacion);
        const response = await pool.query(query, values);
        res.json(response.rows[0]);

    } catch (err) {
        next(err)
    }
}


//elimina una operación
const deleteOperacion = async (req, res, next) => {
    const id = req.body.id;
    if (req.user.role !== true) {
        return res.status(403).json({ message: 'Acceso denegado: solo los administradores pueden ejecutar esta acción.' });
    }
    try {
        const response = await pool.query(queries.deleteOperacion, [id]);
        res.json({
            message: 'Operacion eliminada correctamente'
        })
    } catch (err) {
        next(err)
    }
}

//Dado el id de una operación, obtiene las via clinica completa y las tareas asociadas a la operación
const getViaOperacion = async (req, res, next) => {
    try{
        //Obtenemos el id de la via clinica
        const idOperacion = req.params.id;
        const response = await pool.query(queries.dataOperacion, [idOperacion]);
        const idVia = response.rows[0].idvia;

        //con el id de la via clinica obtenemos las fases
        const response2 = await pool.query(queriesViaClinia.getFases, [idVia]);
        const fases = response2.rows;
        if (fases.length === 0) console.warn("No hay fases para la vía clínica", idVia);

        // Iterar sobre las fases y obtener las tareas
        for (const fase of fases) {
            const response3 = await pool.query(queriesViaClinia.getTareas, [fase.id]);
            const tareasFase = response3.rows;
            if (tareasFase.length === 0) console.warn(`No hay tareas para la fase ${fase.id}`);

            for (const tarea of tareasFase) {
                //obtenemos las opciones de las tareas de tipo opciones
                const response4 = await pool.query(queriesViaClinia.getOpciones, [tarea.id]);
                tarea.opciones = response4.rows;
                //obtenemos el estado de la tarea
                const response5 = await pool.query(queries.getEstadoTarea, [ idOperacion, tarea.id]);
                if (response5.rows.length > 0) {
                    
                    if( tarea.tipo === 'opciones'){
                        tarea.estado = response5.rows[0].opcion;
                    }else {
                        tarea.estado = response5.rows[0].completada;
                    }
                } 
            }


            fase.tareas = tareasFase;
        }
        //devolvemos lo obtenido
        res.json({
            idVia: idVia,
            fases: fases
        });
    } catch (err) {
        next(err)
    }
}

//Actualiza el estado de las tareas de una operación
// Body = {   
//     "idOperacion": 1,
//     "tareas": [
//         {
//             "id": 1,
//             "estado": true
//         },
//         {
//             "id": 4,
//             "estado": 1
//         }
//     ]
// }
const updateEstadoVia = (req, res, next) => {
    const { idOperacion, tareas } = req.body;
    try {
        tareas.forEach(async (tarea) => {
            if (tarea.estado === null) {
                return;
            }
            
            const tipo = tarea.tipo; // tipo de la tarea: booleano, numerico, opciones
            // si el tipo de la tarea es boolean 
            if ( tipo === 'booleano') {
                console.log("tarea booleano", tarea);
                const response = await pool.query(queries.updateEstadoTareaBoolean, [idOperacion, tarea.id, tarea.estado]);

            // si el tipo de la tarea es numerico
            } else if ( tipo === 'numerico') {
                const response = await pool.query(queries.updateEstadoTareaNumerico, [idOperacion, tarea.id, tarea.estado]);
            } else if ( tipo === 'opciones') {
                const response = await pool.query(queries.updateEstadoTareaOpciones, [idOperacion, tarea.id, tarea.estado]);
            }
            
        });
        res.json({ message: 'Estado de tareas actualizado correctamente' });
    } catch (err) {
        next(err);
    }
}

//Obtiene las tareas asociadas a una operación, devolviendo un objeto con varios campos:
// {
//     planificacion: [ ... ],
//     quirofano: [ ... ],
//     postCirugia: [ ... ]
// }
const getTareasOperacion = async (req, res, next) => {
    const id = req.params.id; // id de la operación
    try {
        // 1. Obtener tareas asociadas a la operación, incluyendo el nombre de la fase
        const response = await pool.query(queriesTareas.getTareasOperacionConFase, [id]);
        // 2. Procesar cada tarea
        const tareas = await Promise.all(response.rows.map(async (tarea) => {
            const descripcionOpciones = await pool.query(queriesTareas.getOpciones, [tarea.idtarea]);
            //Obtener la descripción de la tarea 
            const descripcionTarea = await pool.query(queriesTareas.getTarea, [tarea.idtarea]);
            if (descripcionTarea.rows.length === 0) {
                throw new Error(`No se encontró la tarea con id ${tarea.idtarea}`);
            }
            tarea.descripcion = descripcionTarea.rows[0].descripcion;
            let estado = null;
            if (tarea.completada !== null) {
                estado = tarea.completada;
            } else if (tarea.opcion !== null) {
                estado = tarea.opcion;
            } else if (tarea.valor !== null) {
                estado = tarea.valor;
            }
            return {
                id: tarea.idtarea,
                estado,
                descripcion: tarea.descripcion,
                tipo: tarea.tipo,
                opciones: tarea.tipo === 'opciones'
                    ? descripcionOpciones.rows.map(opcion => ({
                        id: opcion.id,
                        descripcion: opcion.descripcion
                    }))
                    : null,
                fase: tarea.fase // nombre de la fase
            };
        }));
        // 3. Agrupar por nombre de la fase
        const resultado = {};
        tareas.forEach(tarea => {
            const fase = tarea.fase;
            if (!resultado[fase]) resultado[fase] = [];
            const { fase: _, ...tareaSinFase } = tarea;
            resultado[fase].push(tareaSinFase);
        });
        res.json(resultado);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getOperaciones,
    getOperacionesUsuario,
    dataOperacion,
    createOperacion,
    updateOperacion,
    getViaOperacion,
    getTareasOperacion,
    deleteOperacion,
    updateEstadoVia
};
