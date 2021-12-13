const Ficha = require('../models/fichas');

FichasControllers = {}

FichasControllers.getFichas = async (req, res) => {
    const fichas = await Ficha.find({ user: req.userId });
    res.json(fichas);
}

FichasControllers.getFicha = async (req, res) => {
    const ficha = await Ficha.findById(req.params.id);
    if (req.userId === ficha.user) {
        res.json(ficha);
    }
}

FichasControllers.addFicha = (req, res) => {
    const newFicha = new Ficha(req.body);
    newFicha.user = req.userId;
    newFicha.save();
    res.send({ message: 'Ficha Agregada' });
}

FichasControllers.deleteFicha = async (req, res) => {
    await Ficha.findByIdAndDelete(req.params.id);
    res.send({ message: 'Ficha Borrada' });
}

FichasControllers.updateFicha = async (req, res) => {
    await Ficha.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: 'Ficha Actualizada' });
}

module.exports = FichasControllers;