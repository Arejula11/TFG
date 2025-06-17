/**
 * @swagger
 * tags:
 *   name: Operaciones
 *   description: Endpoints para el manejo de operaciones
 */
const {Router, query} = require('express');
const controller = require('./controller');
const {authenticateJWT} = require('../middleware/auth');

const router = Router();

router.get('/', authenticateJWT, (req, res, next) => controller.getOperaciones(req, res, next));
router.get('/:numhist', authenticateJWT, (req, res, next) => controller.getOperacionesUsuario(req, res, next));
router.get('/data/:id', authenticateJWT, (req, res, next) => controller.dataOperacion(req, res, next));
router.get('/via/:id', authenticateJWT, (req, res, next) => controller.getViaOperacion(req, res, next));
router.get('/tareas/:id', authenticateJWT, (req, res, next) => controller.getTareasOperacion(req, res, next));
router.post('/create', authenticateJWT, (req, res, next) => controller.createOperacion(req, res, next));
router.put('/update', authenticateJWT, (req, res, next) => controller.updateOperacion(req, res, next));
router.delete('/delete', authenticateJWT, (req,res, next) => controller.deleteOperacion(req, res, next));
router.put('/updateEstado', authenticateJWT, (req, res, next) => controller.updateEstadoVia(req, res, next));

module.exports = router;