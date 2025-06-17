const pool = require('../../db');
const queries = require('./queries');

//Obtiene todas las tareas
const getTareas = async (req, res, next) => {
    try {
        const response = await pool.query(queries.getTareas);
        res.status(200).json(response.rows);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

//Obtiene una tarea dado un id
const getTarea = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query(queries.getTarea, [id]);
        res.json(response.rows);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

//Crea una tarea
const createTarea = async (req, res, next) => {
    const { descripcion, id_fase, tipo } = req.body;
    if (tipo === "opciones") {
        try {
            const response = await pool.query(queries.createTarea, [descripcion, id_fase, tipo]);
            const opcionesPromises = req.body.opciones.map(async opcion => {
                return await pool.query(queries.createOpciones, [opcion, response.rows[0].id]);
            });
            const opcionesResponse = await Promise.all(opcionesPromises);

            res.status(201).json({
                message: "Tarea creada correctamente",
                body: {
                    tarea: response.rows[0],
                    opciones: opcionesResponse.map(opcion => opcion.rows[0])
                }
            });
        } catch (err) {
            console.log(err);
            next(err);
        }

    }else if (tipo === "booleano" || tipo === "numerico") {
        try {
            const response = await pool.query(queries.createTarea, [descripcion, id_fase, tipo]);
            res.status(201).json({
                message: "Tarea creada correctamente",
                body: {
                    tarea: response.rows[0]
                }
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    
}

// Funcion auxiliar que obtiene todas las tareas de uan fase
const getTareasByFases = async (fases) => {
    const tareasPromises = fases.map(async fase => {
        const response = await pool.query(queries.getTareasViaClinica, [fase]);
        return response.rows;
    });
    return await Promise.all(tareasPromises);
}

// Obtiene todas las tareas de una via clinica dado un id de via clinica
const getTareasViaClinica = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const fasesResponse = await pool.query(queries.getFasesViaClinica, [id]);
        const fases = fasesResponse.rows.map(fase => fase.id);
        const tareas = await getTareasByFases(fases);
        res.json(tareas);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

// Obtiene todas las tareas de una operacion dado un id de operacion
const getTareasOperacion = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const viaClinicaResponse = await pool.query(queries.getViaClinicaOperacion, [id]);
        const viaClinica = viaClinicaResponse.rows[0].id;
        const fasesResponse = await pool.query(queries.getFasesViaClinica, [viaClinica]);
        const fases = fasesResponse.rows.map(fase => fase.id);
        const tareas = await getTareasByFases(fases);
        res.json(tareas);
    } catch (err) {
        console.log(err);
        next(err);
    }
}
module.exports = {
    getTareas,
    getTarea,
    createTarea,
    getTareasViaClinica,
    getTareasOperacion

};