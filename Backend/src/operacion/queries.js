const getOperaciones = 'SELECT * FROM operacion';
const getOperacionesUsuario = 'SELECT * FROM operacion WHERE numhist = $1';
const dataOperacion = 'SELECT * FROM operacion WHERE id = $1';
const createOperacion = 'INSERT INTO operacion ( indice, edad, fecha, etiqueta, idvia, numhist) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
// const getViaOperacion = '';
const deleteOperacion = 'DELETE FROM operacion WHERE id = $1';
const getEstadoTarea = 'SELECT * FROM tarea_operacion WHERE idoperacion = $1 AND idtarea = $2';
const updateEstadoTareaBoolean = 'UPDATE tarea_operacion SET completada = $3 WHERE idoperacion = $1 AND idtarea = $2';
const updateEstadoTareaOpciones = 'UPDATE tarea_operacion SET opcion = $3 WHERE idoperacion = $1 AND idtarea = $2';
const updateEstadoTareaNumerico = 'UPDATE tarea_operacion SET valor = $3 WHERE idoperacion = $1 AND idtarea = $2';

module.exports = {
    getOperaciones,
    getOperacionesUsuario,
    dataOperacion,
    createOperacion,
    // getViaOperacion,
    deleteOperacion,
    getEstadoTarea,
    updateEstadoTareaBoolean,
    updateEstadoTareaOpciones,
    updateEstadoTareaNumerico
}