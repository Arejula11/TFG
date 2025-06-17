/**
 * @swagger
 * tags:
 *   - name: Data
 *     description: Endpoints para el manejo de los datos de las vías clinicas
 */

const { Router } = require('express');
const controller = require('./controller');
const {authenticateJWT} = require('../middleware/auth');

const router = Router();

router.get('/:idvia', authenticateJWT, (req, res, next) => controller.getData(req, res, next));



module.exports = router;