const jwt = require('jsonwebtoken');

/**
 * Creates a token containing the usuario information for future authorization.
 * @param {Object} usuario - Usuario information to create the token
 * @returns {string} The token created
 */
function createUsuarioToken(usuario) {
    const token = jwt.sign(
        {
            id: usuario.id,
            nombre: usuario.nombre,
            role: usuario.esadmin
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1y", // TODO: Change to 1 day (1d)
        }
    );
    return token;
}

module.exports = { createUsuarioToken };