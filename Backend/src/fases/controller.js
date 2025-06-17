const pool = require('../../db');
const queries = require('./queries');
const bcrypt = require('bcrypt');

const getFases = async ( req, res, next ) => {
    try {
        const response = await pool.query(queries.getFases);
        res.status(200).json(response.rows);
    } catch (err) {
        return next(err);
    }
}

const createFase = async ( req, res, next ) => {
    try {
        const { nombre, idvia } = req.body;
        const response = await pool.query(queries.createFase, [nombre, idvia]);
        res.status(200).json(response.rows[0]);
    } catch (err) {
        return next(err);
    }
}

module.exports = {
   getFases,
   createFase
};