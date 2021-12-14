require('dotenv').config();
const express = require('express');
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
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
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