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

        res.status(200).json(hospitals)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();

        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const users = await UserModel.findById(_id);

        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.patch('/updateuser/:id', async (req, res) => {
    const id = req.params.id;
    const { name, username, password, hospitals } = req.body;
    try {
        const user = await UserModel.findAndUpdate({id, name, username, password, hospitals});
        const updatedUser = await UserModel.findById(id);
        //TODO: Add Token
        res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

router.post('/verifyuser/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id);
        user.isVerified = !user.isVerified;
        await user.save();
        //TODO: Add Token
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

router.post('/makeadmin/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id);
        user.isAdmin = !user.isAdmin;
        await user.save();
        //TODO: Add Token
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

router.get('/stock', async (req, res) => {
    try {
        const stock = await StockModel.find();

        res.status(200).json(stock)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.get('/order', async (req, res) => {
    try {
        const order = await OrderModel.find().populate({ path: "user", select: ["name"] }).populate({ path: "hospital", select: ["name"] });

        res.status(200).json(order)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
    //TODO NEED TO ADD BILLINGO INVOICE
})

router.post('/order', async (req, res) => {
    const { user, hospital, goods } = req.body;
    try {
        const order = await OrderModel.addOrder({ user, hospital, goods });

        res.status(200).json(order)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
    //TODO NEED TO ADD BILLINGO INVOICE
})

module.exports = router;