const { Router, response } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT, esAdminRole } = require("../middlewares");
const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria,
} = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");
const router = Router();

// obtener todas la categorias - publico
router.get("/", obtenerCategorias);

// Obtener una categoria por id - publico
router.get(
    "/:id",
    check("id", "No es un id de mongo").isMongoId(),
    validarCampos,
    check("id").custom(existeCategoriaPorId),
    obtenerCategoria
);

//crear categoria - privado -cualquier persona con un token valido
router.post(
    "/",
    [
        validarJWT,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    crearCategoria
);

// Actualizar un registro por id
router.put(
    "/:id",
    [
        validarJWT,
        check("id").custom(existeCategoriaPorId),
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    actualizarCategoria
);

// actualizar cualquier con token valido.ffffff
router.delete(
    "/:id",
    [
        validarJWT,
        esAdminRole,
        check("id", "No es un id de Mongo valido").isMongoId(),
        check("id").custom(existeCategoriaPorId),
        validarCampos,
    ],
    borrarCategoria
);

module.exports = router;
