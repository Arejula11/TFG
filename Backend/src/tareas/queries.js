const getTareas = 'SELECT * FROM tarea';
const getTarea = 'SELECT * FROM tarea WHERE id = $1';
const createTarea = 'INSERT INTO tarea (descripcion, id_fase, tipo) VALUES ($1, $2, $3) RETURNING *';
const getTareasViaClinica = 'SELECT * FROM tarea WHERE id_fase = $1';
const getTareasOperacion = 'SELECT * FROM tarea_operacion WHERE idoperacion = $1';
const getFasesViaClinica = 'SELECT * FROM fase WHERE idvia = $1';
const getViaClinicaOperacion = 'SELECT * FROM operacion WHERE id = $1';
const createOpciones = 'INSERT INTO opcion_tarea (descripcion, id_tarea) VALUES ($1, $2) RETURNING *';
const getTareaTipo = 'SELECT tipo FROM tarea WHERE id = $1'; 

const getTareasOperacionConFase = `
    SELECT 
        t.id AS idtarea,
        t.tipo,
        f.nombre AS fase,
        toper.completada,
        toper.opcion,
        toper.valor
    FROM tarea_operacion toper
    JOIN tarea t ON toper.idtarea = t.id
    JOIN fase f ON t.id_fase = f.id
    WHERE toper.idoperacion = $1
    ORDER BY f.id, t.id
`;

const getOpciones = `
    SELECT id, descripcion FROM opcion_tarea WHERE id_tarea = $1
`;




module.exports = {
    getTareas,
    getTarea,
    createTarea,
    getTareasViaClinica,
    getTareasOperacion,
    getFasesViaClinica,
    getViaClinicaOperacion,
    createOpciones,
    getTareaTipo,
    getTareasOperacionConFase,
    getOpciones,

};