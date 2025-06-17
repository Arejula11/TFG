const checkUsername = 'SELECT * FROM medico WHERE usuario = $1';
const createUser = 'INSERT INTO medico (nombre, usuario, contrasegna, esadmin) VALUES ($1, $2, $3, $4) RETURNING *';
const getUsers = 'SELECT * FROM medico';
const updatePassword = 'UPDATE medico SET contrasegna = $1 WHERE id = $2';
const addDoctorPatient = 'INSERT INTO medico_de_paciente (idmedico, numhist) VALUES ($1, $2)';
const searchIdUser = 'SELECT id FROM medico WHERE usuario = $1';

module.exports = {
    checkUsername,
    createUser,
    getUsers,
    updatePassword,
    addDoctorPatient,
    searchIdUser
};