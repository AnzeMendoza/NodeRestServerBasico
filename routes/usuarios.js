const { Router } = require("express");
const { check } = require("express-validator");

const {
    validarJWT,
    validarCampos,
    esAdminRole,
    tieneRole
} = require("../middlewares/index");

const {
    usuariosGet,
    usuarioPut,
    usuariosPost,
    usuariosDelete,
} = require("../controllers/usuarios");

const {
    esRoleValido,
    esEmailRegistrado,
    existeUsuarioPorId,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", usuariosGet);

router.put(
    "/:id",
    [
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(existeUsuarioPorId),
        validarCampos,
    ],
    usuarioPut
);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check(
            "password",
            "El password es debe contener mas de 6 digitos"
        ).isLength(6),
        check("correo").isEmail(),
        check("correo").custom(esEmailRegistrado),
        check("rol").custom(esRoleValido),
        validarCampos,
    ],
    usuariosPost
);

router.delete(
    "/:id",
    [
        validarJWT,
        esAdminRole,
        tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(existeUsuarioPorId),
        validarCampos,
    ],
    usuariosDelete
);

module.exports = router;
