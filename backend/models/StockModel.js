const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sellPrice: {
        type: Number,
        required: true
    },
    BID: {
        type: Number
    }
})

module.exports = mongoose.model('Stock', stockSchema);