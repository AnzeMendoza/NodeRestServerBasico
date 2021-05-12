const { response, request } = require("express");
const { Categoria } = require("../models");

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {
    const query = { estado: true };
    const { limite = 5, desde = 0 } = req.query;

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate("usuario", "nombre")
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.json({
        total,
        categorias,
    });
};
// obtenerCategoria - populate {}
const obtenerCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const existeCategoria = await Categoria.findById(id).populate(
        "usuario",
        "nombre"
    );
    res.json(existeCategoria);
};

const crearCategoria = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`,
        });
    }

    // generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id,
    };

    const categoria = new Categoria(data);
    // Guardar en BD
    await categoria.save();

    res.status(201).json({
        categoria,
    });
};

const actualizarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {
        new: true,
    });

    res.json(categoria);
};

const borrarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
    );

    res.json(categoriaBorrada);
};

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
};
