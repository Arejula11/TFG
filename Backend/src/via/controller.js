const pool = require('../../db');
const queries = require('./queries');
const axios = require('axios');
const FormData = require('form-data');


const getVias = async (req, res, next) => {
    try {
        const response = await pool.query(queries.getVias);
        res.status(200).json(response.rows);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

//Obtiene la via completa, fases y tareas
const getVia = async (req, res, next) => {
     try {
        const id = parseInt(req.params.id);
        //Obtenemos la via
        const response = await pool.query(queries.getVia, [id]);
        const via = response.rows[0];
        //Obtenemos las fases
        const response2 = await pool.query(queries.getFases, [id]);
        const fases = response2.rows;
        //Obtenemos las tareas
        await Promise.all(fases.map(async (fase) => {
            const response3 = await pool.query(queries.getTareas, [fase.id]);
            //comprobamos si las tareas son de tipo opciones
            //en caso afirmativo obtenemos las opciones
            await Promise.all(response3.rows.map(async (tarea) => {
                if(tarea.tipo === 'opciones'){
                    const response4 = await pool.query(queries.getOpciones, [tarea.id]);
                    tarea.opciones = response4.rows;
                }
            }));
            fase.tareas = response3.rows;
        }));
        via.fases = fases;

        //Obtenemos las etiquetas
        const response5 = await pool.query('SELECT * FROM etiqueta WHERE idvia = $1', [id]);
        via.etiquetas = response5.rows;
        res.status(200).json(via);
    } catch (err) {
        console.log(err);
        next(err);
    }   
}

// Actualiza el nombre de una via
const updateNameVia = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const { nombre } = req.body;
        const response = await pool.query(queries.updateNameVia, [nombre, id]);
        if (response.rowCount === 0) {
            return res.status(404).json({ message: 'Via not found' });
        }
        res.status(200).json({ message: 'Via updated successfully' });
    } catch (err) {
        console.log(err);
        next(err);
    }
}


// Auxiliar para insertar tareas y sus opciones
async function insertTasks(tasks, faseId) {
    return Promise.all(tasks.map(async (task) => {
        const tareaRes = await pool.query(
            'INSERT INTO tarea (descripcion, id_fase, tipo) VALUES ($1, $2, $3) RETURNING *',
            [task.nombre, faseId, task.tipo]
        );
        const tarea = tareaRes.rows[0];
        if (task.tipo === 'opciones' && Array.isArray(task.opciones)) {
            await Promise.all(
                task.opciones.map(option =>
                    pool.query(
                        'INSERT INTO opcion_tarea (descripcion, id_tarea) VALUES ($1, $2) RETURNING *',
                        [option, tarea.id]
                    )
                )
            );
        }
        return tarea;
    }));
}

const createVia = async (req, res, next) => {
    try {
        const { nombre, etiquetas, planificacion, ingreso, quirofano, postCirugia, primerDia, segundoDia, postOperatorio } = req.body;
        const response = await pool.query(queries.createVia, [nombre]);
        await new Promise(resolve => setTimeout(resolve, 5000));
        if (response.rowCount === 0) {
            return res.status(400).json({ message: 'Error creating via' });
        }
        const newViaId = response.rows[0].id;

        // Insertar etiquetas
        if (etiquetas && etiquetas.length > 0) {
            await Promise.all(etiquetas.map(etiqueta =>
                pool.query('INSERT INTO etiqueta (nombre, idvia) VALUES ($1, $2)', [etiqueta, newViaId])
            ));
        }

        // Crear fases
        const phaseNames = [
            'Planificación', 'Ingreso', 'Quirófano', 'Post-cirugía',
            'Primer Día', 'Segundo Día', 'Post-operatorio'
        ];
        const phaseIds = [];
        for (const nombreFase of phaseNames) {
            const resFase = await pool.query(
                'INSERT INTO fase (nombre, idvia) VALUES ($1, $2) RETURNING *',
                [nombreFase, newViaId]
            );
            phaseIds.push(resFase.rows[0].id);
        }

        // Insertar tareas por fase
        const tareasPorFase = [
            planificacion, ingreso, quirofano, postCirugia, primerDia, segundoDia, postOperatorio
        ];
        for (let i = 0; i < tareasPorFase.length; i++) {
            if (!Array.isArray(tareasPorFase[i]) || tareasPorFase[i].length === 0) {
                return res.status(400).json({ message: `Error creating tasks for phase ${phaseNames[i]}` });
            }
            await insertTasks(tareasPorFase[i], phaseIds[i]);
        }

        res.status(201).json({ message: 'Via created successfully' });
    } catch (err) {
        console.log(err);
        next(err);
    }
}


// Obtiene el grafo de los datos de la via
const getViaGraphFromData = async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const form = new FormData();
        form.append('file', file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
        });

        const response = await axios.post(process.env.GRAPH_API_URL, form, {
        headers: form.getHeaders(),
        });

        if (response.status !== 200) {
        return res.status(500).json({ message: 'Error processing the file' });
        }

        // SOLO se devuelve el contenido útil
        const graph = response.data.result;
        const petri_net = response.data.petri_net;


        return res.status(201).json({
        message: "Via created successfully",
        graph,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = {
    getVias,
    updateNameVia,
    getVia,
    createVia,
    getViaGraphFromData
};

