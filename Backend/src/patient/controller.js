
const pool = require('../../db');
const { addDoctorPatient } = require('../user/queries');
const queries = require('./queries');

//Obtiene la lista de todos los pacientes
const getPatients = async (req, res, next) => {
    try {
        const result = await pool.query(queries.getPatients);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        next(err);
    }
}


//Obtiene la lista de un solo paciente dado el número de historia
const getOnePatient = async (req, res, next) => {
    try {
        const result = await pool.query(queries.getOnePatient, [req.params.numhist]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        next(err);
    }
}


//Obtiene la lista de pacientes de un solo doctor
const getPatientsByDoctor = async (req, res, next) => {
    const { id } = req.params; // id del médico
    try{
        const result = await pool.query(queries.getPatientsByDoctor, [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

const newPatient = async (req, res, next) => {
    const { nombre, numhist, sexo } = req.body;
    try {
        await pool.query('BEGIN');
        // Insert into 'paciente'
        await pool.query(queries.newPatient, [nombre, numhist, sexo]
        );
        // Insert into 'medico_de_paciente' 
        await pool.query(addDoctorPatient, [req.user.id, numhist]
        );
        await pool.query('COMMIT');
        res.json({
            message: 'Paciente creado correctamente',
            body: { paciente: { nombre, numhist, sexo }, doctor: req.user.id },
        });
    } catch (err) {
        await pool.query('ROLLBACK');
        next(err);
    } 
};


const updatePatient = async (req, res, next) => {
    const { nombre, numhist, sexo } = req.body;
    try {

        // Comprueba si el paciente existe
        const result = await pool.query(queries.getOnePatient, [numhist]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'El paciente no existe' });
        }

        const fields = [];
        const values = [];
        let query = 'UPDATE paciente SET ';

        if (nombre) {
            fields.push('nombre');
            values.push(nombre);
        }
        if (numhist) {
            fields.push('numhist');
            values.push(numhist);
        }
        if (sexo) {
            fields.push('sexo');
            values.push(sexo);
        }

        fields.forEach((field, index) => {
            query += `${field} = $${index + 1}`;
            if (index < fields.length - 1) {
                query += ', ';
            }
        });

        query += ' WHERE numhist = $' + (fields.length + 1);
        values.push(req.body.numhist);

        await pool.query(query, values);
        res.json({
            message: 'Paciente actualizado correctamente',
            body: { paciente: { nombre, numhist, sexo } },
        });
    } catch (err) {
        
        console.error(err);
        next(err);
    } 
}


const deletePatient = async (req, res, next) => {
    if (req.user.role !== true) {
        return res.status(403).json({ message: 'Acceso denegado: solo los administradores pueden ejecutar esta acción.' });
    }
    const {numhist} = req.body;
    try {
        const result = await pool.query(queries.deletePatient, [numhist]);
        // console.log(result)
        if(result.rowCount === 0){
            // res.json({message: 'No se ha eliminado al paciente'})
            res.status(400).json({message: 'No se ha eliminado al paciente'})
        }else{
            res.json({message: 'Paciente eliminado correctamente'})
        }
    } catch (err) {
        next(err);
    }
}


// const getKneePatients = async (req, res, next) => {
//     try {
//         const result = await pool.query(queries.getKneePatients);
//         res.json(result.rows);
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// }

// const getHipPatients = async (req, res, next) => {
//     try {
//         const result = await pool.query(queries.getHipPatients);
//         res.json(result.rows);
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// }


module.exports = {
    getPatients,
    newPatient,
    updatePatient,
    deletePatient,
    getOnePatient,
    getPatientsByDoctor,
    // getKneePatients,
    // getHipPatients,
    
};