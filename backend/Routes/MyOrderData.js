const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');


router.post('/myOrderData', async (req, res) => {
    try {

        // console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        // console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});


module.exports = router;