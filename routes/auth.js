const { Router } = require("express");

const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
    "/login",
    [
        check("correo", "El correo el obligatorio").isEmail(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
        validarCampos,
    ],
    login
);

// router.put(
//     "/:id",
//     [
//         check("id", "No es un id valido").isMongoId(),
//         check("id").custom(existeUsuarioPorId),
//         validarCampos,
//     ],
//     usuarioPut
// );

// router.post(
//     "/",
//     [
//         check("nombre", "El nombre es obligatorio").not().isEmpty(),
//         check(
//             "password",
//             "El password es debe contener mas de 6 digitos"
//         ).isLength(6),
//         check("correo").isEmail(),
//         check("correo").custom(esEmailRegistrado),
//         // check("rol", "no es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE",]),
//         check("rol").custom(esRoleValido),
//         validarCampos,
//     ],
//     usuariosPost
// );

// router.delete(
//     "/:id",
//     [
//         check("id", "No es un id valido").isMongoId(),
//         check("id").custom(existeUsuarioPorId),
//         validarCampos,
//     ],
//     usuariosDelete
// );

module.exports = router;
