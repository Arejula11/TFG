const getPatients = 'SELECT * FROM paciente';
const newPatient = 'INSERT INTO paciente (nombre, numhist, sexo) VALUES ($1, $2, $3)';
const deletePatient = 'DELETE FROM paciente WHERE numhist = $1';
const getOnePatient = 'SELECT * FROM paciente WHERE numhist = $1';
const getPatientsByDoctor = 'SELECT * FROM paciente WHERE numhist IN (SELECT numhist FROM medico_de_paciente WHERE idmedico = $1)';             

// const getKneePatients = 'SELECT numhist, nombre FROM paciente WHERE numhist IN (SELECT numhist FROM operacion WHERE idtipo = 1)'; 
// const getHipPatients = 'SELECT numhist, nombre FROM paciente WHERE numhist IN (SELECT numhist FROM operacion WHERE idtipo = 2)'; 

module.exports = {
    getPatients,
    newPatient,
    deletePatient,
    getOnePatient,
    getPatientsByDoctor,
    // getKneePatients,
    // getHipPatients,
    
};