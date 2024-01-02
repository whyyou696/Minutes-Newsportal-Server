const jwt = require('jsonwebtoken');
const secret = "rahasia";

function signToken(payload) {
    let token = jwt.sign(payload, secret);
    return token;
}

function verifyToken(token) {
    let payload = jwt.verify(token, secret);
    return payload;
}

module.exports = {
    signToken,
    verifyToken
}