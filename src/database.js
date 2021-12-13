const mongoose = require("mongoose");
mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost/04-fichas-academicas')
    .then(db => console.log('Conectado a la base de datos'))
    .catch(err => console.error(err));