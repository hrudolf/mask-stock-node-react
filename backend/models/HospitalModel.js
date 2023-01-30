const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        city: { type: String, required: true },
        postCode: { type: String, required: true },
        street: { type: String, required: true }
    },
    VAT: {
        number: {
            type: String,
            required: true
        },
        rate: {
            type: Number,
            required: true,
            default: 1.27
        }
    },
    orders: [
        {
            madeBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            order: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order'
            },
        }
    ]
})

module.exports = mongoose.model('Hospital', hospitalSchema);