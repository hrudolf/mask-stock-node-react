/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const hospitals = require("./hospitals.json");
const stock = require("./stock.json");
const users = require("./users.json");
const HospitalModel = require("../models/HospitalModel");
const StockModel = require("../models/StockModel");
const UserModel = require("../models/UserModel");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1); // exit the current program
}

const populateEmployees = async () => {
    await HospitalModel.deleteMany({});
    await StockModel.deleteMany({});
    await UserModel.deleteMany({});

    await HospitalModel.create(...hospitals);
    await StockModel.create(...stock);
    await UserModel.create(...users);
    console.log("Data created");
};

const main = async () => {
    await mongoose.connect(mongoUrl);
    await populateEmployees();
    await mongoose.disconnect();
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
