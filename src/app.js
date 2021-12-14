require('dotenv').config();
const cors = require('cors');
const corsOptions = {
    origin: true,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(allowCrossDomain);
const express = require('express');
const session = require('express-session');
const passport = require('passport');

/* Inicializar */
const app = express();
require('./config/passport');

/* Definir el puerto */
const port = process.env.PORT || 3000
app.set("port", port);

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

/* Cargar las rutas */
app.use("/api/fichas", require('./routes/fichas'));
app.use("/api/usuarios", require('./routes/usuarios'));

/* Exportar */
module.exports = app;