const { response, request, json } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            message: "No hay token en la petición",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                message: "Token  no valido - usuario no existente en DB",
            });
        }

        // verificar si el uid tiene estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                message: "Token  no valido - usuario con estado false",
            });
        }
        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "Token no valido ",
        });
    }
};

module.exports = { validarJWT };
