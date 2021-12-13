const { Router } = require('express');
const routerUsuarios = Router();
const UsuariosControllers = require("../controllers/usuarios");

/* Crear rutas */
routerUsuarios.post('/crear-usuario', UsuariosControllers.crearUsuario);
routerUsuarios.post('/ingresar', UsuariosControllers.ingresarUsuario);

module.exports = routerUsuarios;