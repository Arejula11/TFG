/**
 * @swagger
 * tags:
 *   name: Pacienetes
 *   description: Endpoints para el manejo de pacientes
 */

const {Router} = require('express');
const controller = require('./controller');
const {authenticateJWT} = require('../middleware/auth');



const router = Router();


router.get('/',authenticateJWT, (req, res, next) => controller.getPatients(req, res, next));
router.get('/getOnePatient/:numhist',authenticateJWT, (req, res, next) => controller.getOnePatient(req, res, next));
router.get('/getPatientsByDoctor/:id',authenticateJWT, (req, res, next) => controller.getPatientsByDoctor(req, res, next)); 


router.post('/addPatient',authenticateJWT, (req, res, next) => controller.newPatient(req, res, next));

router.put('/updatePatient', authenticateJWT, (req, res, next) => controller.updatePatient(req, res,next) );
router.delete('/deletePatient', authenticateJWT, (req, res, next) => controller.deletePatient(req, res, next));
// router.get('/knee',authenticateJWT, (req, res, next) => controller.getKneePatients(req, res, next));


// router.get('/hip',authenticateJWT, (req, res, next) => controller.getHipPatients(req, res, next));


module.exports = router;