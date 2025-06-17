/**
 * @swagger
 * tags:
 *   - name: Via
 *     description: Endpoints para el manejo de las vías clinicas
 */

const { Router } = require('express');
const controller = require('./controller');
const {authenticateJWT} = require('../middleware/auth');
const multer = require('multer');
const upload = multer(); // usa almacenamiento en memoria

const router = Router();

router.get('/', authenticateJWT, (req, res, next) => controller.getVias(req, res, next));
router.get('/:id', authenticateJWT, (req, res, next) => controller.getVia(req, res, next));
router.put('/:id/name', authenticateJWT, (req, res, next) => controller.updateNameVia(req, res, next));
router.post('/', authenticateJWT, (req, res, next) => controller.createVia(req, res, next));
router.post('/data', authenticateJWT, upload.single('file'), (req, res, next) => 
  controller.getViaGraphFromData(req, res, next)
);



module.exports = router;
