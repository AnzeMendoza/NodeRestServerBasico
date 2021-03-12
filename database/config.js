const mongoose = require("mongoose");

const dbConecction = async () => {
    try {
        mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log('Base de datos online');
    } catch (error) {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>',error);
        throw new Error("Error al inicializar la BD");
    }
};

module.exports = dbConecction;

