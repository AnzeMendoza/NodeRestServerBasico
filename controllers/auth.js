const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");
const googleVerify = require("../helpers/google-verify");

const login = async (req, res = response) => {
    const { correo, password } = req.body;

    try {
        //verificar si el email existe.
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                message: "Usuario / password no son correctos",
            });
        }
        //verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario / password no son correctos, estado: false",
            });
        }
        //verificar la contraseña
        const validarPassword = bcryptjs.compareSync(
            password,
            usuario.password
        );

        if (!validarPassword) {
            return res.status(400).json({
                msg: "Usuario / password no son correctos, password",
            });
        }
        //generar jwt
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Hable con administrador",
        });
    }
};

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: "XD",
                img,
                google: true,
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        // si el usuario en DB
        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Hable con el administrador - usuario bloqueado",
            });
        }

        // generar jwt
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token,
        });
    } catch (error) {
        res.status(400).json({
            msg: "Token de google no es valido",
            error,
        });
    }
};

module.exports = {
    login,
    googleSignIn,
};
