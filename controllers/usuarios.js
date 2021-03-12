const { responce, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = responce) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));
    // const total = await Usuario.countDocuments(query);

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
};

const usuarioPut = async (req, res = responce) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TOTO validar contra base de datos.

    if (password) {
        // hash de la contraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        message: "put API",
        usuario,
    });
};

const usuariosPost = async (req = request, res = responce) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // hash de la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    // guardar en BBDD
    await usuario.save();

    res.status(201).json({
        message: "post API",
        usuario,
    });
};

const usuariosDelete = async (req = request, res = responce) => {
    const { id } = req.params;
    
    // Borrado fisico
    // const usuario = await Usuario.findByIdAndDelete(id)  
    
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        message: "delete usuario",
        usuario
    });
};

module.exports = {
    usuariosGet,
    usuarioPut,
    usuariosPost,
    usuariosDelete,
};
