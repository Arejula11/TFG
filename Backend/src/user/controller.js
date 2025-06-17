const pool = require('../../db');
const queries = require('./queries');
const bcrypt = require('bcrypt');

const getUsers = async (req, res, next) => {
    try {
        const result = await pool.query(queries.getUsers);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

const createUser = async (req, res, next) => {
    const { nombre, username, password, esadmin } = req.body;
    let admin = false;
    if (esadmin === true) {
        admin = true;
    }
    let usernameNum = 0;
    let uniqueUsername = username;
    try {
        // Check if the username already exists
        let userCheck;
        while (true) {
            userCheck = await pool.query(queries.checkUsername, [uniqueUsername]);
            if (userCheck.rows.length === 0) {
                break;
            }
            usernameNum++;
            uniqueUsername = username + String(usernameNum);
        }
        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create the new user
        const result = await pool.query(queries.createUser, [nombre, uniqueUsername, hashedPassword, admin ]);
        res.json({ user: result.rows[0] });
    } catch (err) {
        next(err); 
    }
};


const updatePassword = async (req, res, next) => {
    const { password } = req.body;
    const id = req.user.id;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(queries.updatePassword, [hashedPassword, id]);
        res.json("Contraseña actualizada correctamente");
    } catch (err) {
        next(err);
    }
};

const addDoctorPatient = async (req, res, next) => {
    // Verificar si el usuario es administrador
    if (req.user.role !== true) {
        return res.status(403).json({ message: 'Acceso denegado: solo los administradores pueden ejecutar esta acción.' });
    }
    const { numHist, usuarioMedico } = req.body;

    try {
        await pool.query('BEGIN');
        const id_medico = await pool.query(queries.searchIdUser, [usuarioMedico]);
        // wait until the query is executed
        await pool.query(queries.addDoctorPatient, [id_medico.rows[0].id, numHist]);
        res.json("Médico añadido correctamente al paciente");
        await pool.query('COMMIT');
    } catch (err) {
        await pool.query('ROLLBACK');
        next(err);
    }
}

module.exports = {
    getUsers,
    createUser,
    updatePassword,
    addDoctorPatient
};