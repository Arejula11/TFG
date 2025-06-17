/**
 * @swagger
 * tags:
 *   - name: Tareas
 *     description: Endpoints para el manejo de las tareas de las vías clinicas
 */

const { Router } = require('express');
const controller = require('./controller');
const {authenticateJWT} = require('../middleware/auth');

const router = Router();

router.get('/', authenticateJWT, controller.getTareas);
router.get('/:id', authenticateJWT, controller.getTarea);
router.post('/', authenticateJWT, controller.createTarea);
router.get('/viaclinica/:id', authenticateJWT, controller.getTareasViaClinica);
router.get('/operacion/:id', authenticateJWT, controller.getTareasOperacion);


module.exports = router;
