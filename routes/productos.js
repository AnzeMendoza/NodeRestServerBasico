const { Router, response } = require("express");
const { check } = require("express-validator");
const {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto,
} = require("../controllers/productos");

const {
    existeProductoPorId, existeCategoriaPorId
} = require("../helpers/db-validators");

const {
    validarJWT,
    validarCampos,
    esAdminRole,
    tieneRole
} = require("../middlewares/index");

const router = Router();

router.get("/", obtenerProductos);

router.get(
    "/:id",
    [
        check("id", "No es un id de Mongo valido").isMongoId(),
        check("id").custom(existeProductoPorId),
        validarCampos,
    ],
    obtenerProducto
);

router.post(
    "/",
    [
        validarJWT,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("categoria", "No es un id de mongo valido").isMongoId(),
        check("categoria").custom(existeCategoriaPorId),
        validarCampos,
    ],
    crearProducto
);

router.put(
    "/:id",
    [
        validarJWT,
        //check("categoria", "No es un id de Mongo").isMongoId(),
        check("id").custom(existeProductoPorId),
        validarCampos,
    ],
    actualizarProducto
);

router.delete(
    "/:id",
    [
        validarJWT,
        esAdminRole,
        check("id", "No es un id de Mongo valido").isMongoId(),
        check("id").custom(existeProductoPorId),
        validarCampos
    ],
    borrarProducto
);

module.exports = router;
