const express = require('express');
const HospitalModel = require("../models/HospitalModel");
const StockModel = require("../models/StockModel");
const UserModel = require("../models/UserModel");
const OrderModel = require("../models/OrderModel");

const router = express.Router();

//database routes
router.get('/hospitals', async (req, res) => {
    try {
        const hospitals = await HospitalModel.find();

        res.status(200).json({ hospitals })

    } catch (error) {
        res.status(500).json({ error: error })
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();

        res.status(200).json({ users })

    } catch (error) {
        res.status(500).json({ error: error })
    }
});

router.get('/stock', async (req, res) => {
    try {
        const stock = await StockModel.find();

        res.status(200).json({ stock })

    } catch (error) {
        res.status(500).json({ error: error })
    }
});

router.post('/order', async (req, res) => {
    const { user, hospital, goods } = req.body;
    try {
        const stock = await OrderModel.addOrder({ user, hospital, goods });

        res.status(200).json({ stock })

    } catch (error) {
        res.status(500).json({ error: error })
    }
    //TODO NEED TO ADD BILLINGO INVOICE
})

module.exports = router;