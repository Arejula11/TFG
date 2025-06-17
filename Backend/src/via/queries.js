

const getVias = 'SELECT * FROM via';
const getVia = 'SELECT * FROM via WHERE id = $1';
const getFases = 'SELECT * FROM fase WHERE idvia = $1';
const getTareas = 'SELECT * FROM tarea WHERE id_fase = $1';
const getOpciones = 'SELECT * FROM opcion_tarea WHERE id_tarea = $1';
const createTareaOperacion = 'INSERT INTO tarea_operacion (idtarea, idoperacion) VALUES ($1, $2) RETURNING *';
const updateNameVia = 'UPDATE via SET nombre = $1 WHERE id = $2 RETURNING *';
const createVia = 'INSERT INTO via (nombre) VALUES ($1) RETURNING *'

module.exports = {
    getVias,
    getVia,
    getFases,
    getTareas,
    getOpciones,
    createTareaOperacion,
    updateNameVia,
    createVia
};