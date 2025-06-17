const getOperacionesViaClinica = `SELECT id FROM operacion WHERE idvia = $1;`;


module.exports = {
    getOperacionesViaClinica,

};
