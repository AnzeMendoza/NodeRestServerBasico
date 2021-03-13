const { Schema, model } = require("mongoose");


const AuthSchema = Schema({
    rol: {
        type: String,
        require: [true, "El rol es obligatorio."]
    }
});

module.exports = model("Auth", AuthSchema);