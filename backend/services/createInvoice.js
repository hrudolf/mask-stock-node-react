const HospitalModel = require('../models/HospitalModel');
const fetch = require('node-fetch');

require('dotenv').config()

const invoiceSchema = {
    partner_id: 0,
    block_id: process.env.BLOCKID,
    bank_account_id: process.env.BANKID,
    type: "invoice",
    payment_method: "wire_transfer",
    fulfillment_date: "2023-02-02",
    due_date: "2023-02-17",
    currency: "HUF",
    language: "hu",
    electronic: false,
    paid: false,
    items: [
        {
            product_id: 12749759,
            quantity: 25
        }
    ]
}

const createInvoice = async ({ hospital, goods }) => {
    const hospitalData = await HospitalModel.findById(hospital).select('BID -_id')
    const invoiceData = JSON.parse(JSON.stringify(invoiceSchema));
    invoiceData.partner_id = hospitalData.BID;

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toISOString().slice(0, 10);
    }

    const date = new Date();
    const fulfillment_date = addDays(date, 7);
    const due_date = addDays(date, 15);

    invoiceData.fulfillment_date = fulfillment_date.toString();
    invoiceData.due_date = due_date.toString();

    const orderedItems = goods.map(good => {
        return { product_id: good.BID, quantity: good.quantity }
    })

    invoiceData.items = orderedItems;

    const response = await fetch('https://api.billingo.hu/v3/documents', {
        method: "POST",
        headers: {
            "X-API-KEY": process.env.BAUTHKEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(invoiceData)
    })

    const json = await response.json();
    
    if (response.ok) {
        const mailBody = {
            "emails": [
                process.env.EMAIL
            ]
        }
        const sendMail = await fetch(`https://api.billingo.hu/v3/documents/${json.id}/send`, {
            method: "POST",
            headers: {
                "X-API-KEY": process.env.BAUTHKEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mailBody)
        })

        const mailJson = await sendMail.json();
        if (!sendMail.ok) {
            console.error('Sending mail failed')
        }
    } else {
        console.log(json);
    }
}

module.exports = createInvoice;