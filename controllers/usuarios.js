const { responce, request } = require("express");

const usuariosGet = (req = request, res = responce) => {

    const {ape} = req.query;
    res.json({
        message: "get API",
        ape
    });
};

const usuarioPut = (req, res = responce) => {
    const id = req.params.id;
    res.json({
        message: "put API",
        id
    });
};

const usuariosPost = (req, res = responce) => {
    const {nombre} = req.body;

    res.status(201).json({
        message: "post API",
        nombre
    });
};

const usuariosDelete = (req, res = responce) => {
    res.json({
        message: "delete API",
    });
};

module.exports = {
    usuariosGet,
    usuarioPut,
    usuariosPost,
    usuariosDelete,
};
