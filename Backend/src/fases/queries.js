const getFases = 'SELECT * FROM fase';
const createFase = 'INSERT INTO fase (nombre, idvia) VALUES ($1, $2) RETURNING *';

module.exports = {
    getFases,
    createFase
};