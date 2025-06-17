const getEtiquetas = 'SELECT * FROM etiqueta';
const getEtiquetasById = 'SELECT * FROM etiqueta WHERE id = $1';
const getEtiquetasByVia = 'SELECT * FROM etiqueta WHERE idvia = $1';
const createEtiquetas = 'INSERT INTO etiqueta (nombre, idvia) VALUES ($1, $2) RETURNING *';

module.exports = {
    getEtiquetas,
    getEtiquetasByVia,
    getEtiquetasById,
    createEtiquetas
};