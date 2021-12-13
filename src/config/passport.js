const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/usuarios');

/* Implementar register */

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) { return done(null, false, { message: 'No se ha encontrado el usuario' }); }
        const match = await user.matchPassword(password);
        if (!match) { return done(null, false, { message: 'Contraseña incorrecta' }) }
        return done(null, user);
    } catch (e) {
        return done(e)
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});