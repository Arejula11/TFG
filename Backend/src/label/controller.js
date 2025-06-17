const pool = require('../../db');
const queries = require('./queries');

const getEtiquetas = async ( req, res, next ) => {
    try {
        const response = await pool.query(queries.getEtiquetas);
        res.status(200).json(response.rows);
    } catch (err) {
        return next(err);
    }
}


const getEtiquetasById = async ( req, res, next ) => {
    try {
        const { id } = req.params;
        const response = await pool.query(queries.getEtiquetasById, [id]);
        res.status(200).json(response.rows[0]);
    } catch (err) {
        return next(err);
    }
}

const getEtiquetasByVia = async ( req, res, next ) => {
    try {
        const { id } = req.params;
        const response = await pool.query(queries.getEtiquetasByVia, [id]);
        res.status(200).json(response.rows);
    } catch (err) {
        return next(err);
    }
}

const createEtiquetas = async ( req, res, next ) => {
    try {
        const { nombre, idvia } = req.body;
        const response = await pool.query(queries.createEtiquetas, [nombre, idvia]);
        res.status(200).json(response.rows[0]);
    } catch (err) {
        return next(err);
    }
}

module.exports = {
   getEtiquetas,
    getEtiquetasByVia,
    getEtiquetasById,
   createEtiquetas
};