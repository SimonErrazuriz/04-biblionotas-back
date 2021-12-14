const mongoose = require("mongoose");
mongoose
    .connect('mongodb+srv://simon:r4e3w2q1@cluster0.avd46.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' || 'mongodb://localhost/04-fichas-academicas')
    .then(db => console.log('Conectado a la base de datos'))
    .catch(err => console.error(err));