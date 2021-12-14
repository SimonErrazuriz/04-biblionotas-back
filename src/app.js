require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

/* Inicializar */
const app = express();
require('./config/passport');

/* Definir el puerto */
app.set("port", process.env.PORT || 3000);

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
});
app.use(cors);
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