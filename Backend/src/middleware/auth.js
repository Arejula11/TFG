const jwt = require('jsonwebtoken');

// Blacklist en memoria (Set)
const blacklistedTokens = new Set();


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        console.log('Authorization header missing');
        return res.sendStatus(403);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        console.log('Token missing');
        return res.sendStatus(403);
    }

    // Verificar si el token está en la blacklist
    if (blacklistedTokens.has(token)) {
        return res.status(401).json({ message: "Token revoked" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err.message);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

// Función para agregar un token a la blacklist
const addToBlacklist = (token) => {
    blacklistedTokens.add(token);
  };

module.exports = {authenticateJWT, addToBlacklist};