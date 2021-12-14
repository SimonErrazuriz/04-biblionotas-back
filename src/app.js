require('dotenv').config();
const cors = require('cors');
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
var allowlist = ['http://localhost:4200/', 'https://biblionotas.netlify.app/']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));
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