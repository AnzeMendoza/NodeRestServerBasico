const express = require("express");
const cors = require("cors");
const dbConecction = require("../database/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";

        // conectar a BBDD
        this.conectarDB();
        
        // middlewares
        this.middlewares();

        // rutas de mi app
        this.routes();
    }

    async conectarDB(){
        await dbConecction();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // lectur y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use(this.usuariosPath, require("../routes/usuarios"));
    }

    listen() {
        this.app.listen(this.port, () =>
            console.log("Se esta escuchando el puerto ", this.port)
        );
    }
}

module.exports = Server;
