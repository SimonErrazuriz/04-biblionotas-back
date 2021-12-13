const Usuario = require('../models/usuarios');
const passport = require('passport');
const jwt = require('jsonwebtoken');

UsuariosControllers = {}

UsuariosControllers.crearUsuario = async (req, res) => {
    const email = await Usuario.findOne({ email: req.body.email });
    if (email) {
        res.status(401).send({ message: 'Ya existe el email' });
    } else {
        const newUser = new Usuario(req.body);
        newUser.password = await newUser.encryptPassword(req.body.password)
        await newUser.save();
        const token = jwt.sign({ _id: newUser._id }, 'secretkey');
        return res.status(200).json({ token });
    }
}

UsuariosControllers.ingresarUsuario = function (req, res, next) {
    passport.authenticate('login', function (err, user, info) {
        if (err) { return res.status(401).json(err); }
        if (!user) { return res.status(401).json(info); }
        req.logIn(user, function (err) {
            if (err) { return res.status(501).json(err); }
            const token = jwt.sign({ _id: user._id }, 'secretkey');
            return res.status(200).json({ token });
        });
    })(req, res, next);
}

module.exports = UsuariosControllers;