const { Router } = require("express");
const {
    usuariosGet,
    usuarioPut,
    usuariosPost,
    usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuarioPut);

router.post("/", usuariosPost);

router.delete("/", usuariosDelete);

module.exports = router;
