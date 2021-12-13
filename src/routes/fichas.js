const { Router } = require('express');
const routerFichas = Router();
const FichasControllers = require("../controllers/fichas");
const jwt = require('jsonwebtoken')

/* Crear rutas */
routerFichas.get('/get', verifyToken, FichasControllers.getFichas);
routerFichas.get('/get1/:id', verifyToken, FichasControllers.getFicha);
routerFichas.post('/post', verifyToken, FichasControllers.addFicha);
routerFichas.delete('/delete/:id', verifyToken, FichasControllers.deleteFicha);
routerFichas.put('/update/:id', verifyToken, FichasControllers.updateFicha);

module.exports = routerFichas;

function verifyToken(req, res, next) {
    if (!req.headers.authorization) return res.status(401).send('Sin autorizacion');
    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') return res.status(401).json('Sin autorizacion');
    const payload = jwt.verify(token, 'secretkey');
    req.userId = payload._id;
    next();
}