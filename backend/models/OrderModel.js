const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Stock = require('./StockModel');

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
            price: {
                type: Number,
                required: true
            }
        }
    ]
})

orderSchema.statics.addOrder = async function ({ user, hospital, goods }) {
    //an order can contain multiple items
    //mapping through all items and updating stock quantity for each item in the order
    const goodsWithPrice = await Promise.all(goods.map(async (good) => {
        const itemInStock = await Stock.findById(good.item);
        //Update stock
        itemInStock.quantity -= good.quantity;
        itemInStock.save();
        good.price = itemInStock.sellPrice;
        return good;
    }))
    const order = await this.create({ user, hospital, goods: goodsWithPrice })
    return order;
}

module.exports = mongoose.model('Order', orderSchema);