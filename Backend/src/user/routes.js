/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Endpoints para el manejo de usuarios de los médicos
 */

const { Router } = require('express');
const controller = require('./controller');
const {authenticateJWT} = require('../middleware/auth');

const router = Router();

router.get('/', authenticateJWT, (req, res) => controller.getUsers(req, res));

router.post('/createUser', (req, res, next) => controller.createUser(req, res, next));

router.put('/updatePassword', authenticateJWT, (req, res, next) => controller.updatePassword(req, res, next));

router.post('/addPatient', authenticateJWT, (req, res, next) => controller.addDoctorPatient(req, res, next));

module.exports = router;
