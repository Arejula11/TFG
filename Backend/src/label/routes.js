/**
 * @swagger
 * tags:
 *   - name: Fases
 *     description: Endpoints para el manejo de las fases de las vías clinicas
 */

const { Router } = require('express');
const controller = require('./controller');
const {authenticateJWT} = require('../middleware/auth');

const router = Router();

router.get('/', authenticateJWT, (req, res, next) => controller.getEtiquetas(req, res, next));
router.get('/:id', authenticateJWT, (req, res, next) => controller.getEtiquetasByVia(req, res, next));
router.get('/id/:id', authenticateJWT, (req, res, next) => controller.getEtiquetasById(req, res, next));
router.post('/', authenticateJWT, (req, res, next) => controller.createEtiquetas(req, res, next));



module.exports = router;
