const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    goods: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Stock',
            },
            quantity: {
                type: Number,
                required: true
            },
            required: true
        }
    ],
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Order', orderSchema);