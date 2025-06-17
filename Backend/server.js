const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const routesPacient = require('./src/patient/routes');
const routesVia = require('./src/operacion/routes');
const routesUser = require('./src/user/routes');
const routesFases = require('./src/fases/routes');
const routesTareas = require('./src/tareas/routes');
const routesVias = require('./src/via/routes');
const routesData = require('./src/data/routes');
const routesEtiquetas = require('./src/label/routes');

const bcrypt = require('bcrypt');

const errorMiddleware = require('./src/middleware/errorHandler');
const { createUsuarioToken } = require('./src/utils/auth');
const YAML = require('yamljs');
const { addToBlacklist } = require('./src/middleware/auth');

const swaggerUi = require('swagger-ui-express');
const pool = require('./db');

require('dotenv').config();

const cors = require('cors');
app.use(cors());

// Middleware para el manejo de JSON
app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send("Servidor corriendo correctamente! Visite /docs para visualizar la documentación de la API");
  
});

// Rutas de la API
app.use('/patient', routesPacient);
app.use('/operacion', routesVia);
app.use('/user', routesUser);
app.use('/fases', routesFases);
app.use('/tareas', routesTareas);
app.use('/vias', routesVias);
app.use('/data', routesData);
app.use('/etiquetas', routesEtiquetas);



// Endpoint de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Obtener el usuario de la base de datos
    const userQuery = await pool.query('SELECT * FROM medico WHERE usuario = $1', [username]);

    
    if (userQuery.rows.length === 0) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const user = userQuery.rows[0];
      // Comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, user.contrasegna);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Generar token
    const token = createUsuarioToken(user); 

    res.json({ token, esAdmin: user.esadmin });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});




// Endpoint de logout (agrega el token a la blacklist)
app.post("/logout", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) return res.status(401).json({ message: "No token provided" });

  addToBlacklist(token);
  res.json({ message: "Se ha cerrado la sesión correctamente" });
});

// Use the error-handling middleware
app.use(errorMiddleware);

// Conectar a la base de datos
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM paciente');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

const swaggerDocument = YAML.load('./openapi.yaml');
// Serve Swagger UI with your .yml file
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));