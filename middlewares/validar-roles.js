const { responce } = require("express");

const esAdminRole = (req, res = responce, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            message: "Se quiere validar el role sin validar el token primero",
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol != "ADMIN_ROLE") {
        return res.status(401).json({
            message: `${nombre} no es ADMIN_ROLE`,
        });
    }
    next();
};

const tieneRole = (...roles) => {
    return (req, res = responce, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                message:
                    "Se quiere validar el role sin validar el token primero",
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                message: `El servicio requiere uno de estos roles ${roles}`,
            });
        }
        next();
    };
};

module.exports = {
    esAdminRole,
    tieneRole
};
