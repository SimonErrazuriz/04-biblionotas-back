const { Schema, model } = require("mongoose");

const FichasSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    content: {type: String, required: false},
    user: {type: String, required: true}
});

module.exports = model('Ficha', FichasSchema);