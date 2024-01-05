const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function authentication(req, res, next) {
    try {
        let token = req.headers.authorization;
        if (!token) {
            throw { name: "InvalidToken" };
        }
        let [bearer, access_token] = token.split(" ");
        if(bearer !== "Bearer") {
            throw { name: "InvalidToken" };
        }
        let payload = verifyToken(access_token);
        //console.log(payload, "<< payload")
        let user = await User.findByPk(payload.id);
        if(!user) {
            throw { name: "InvalidToken" };
        }
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        next();
    } catch (error) {
       // console.log(error.name);
        next(error)
    }
}
module.exports = authentication;