const express = require('express');
const router = express.Router();

var Order = require('../models/order');

var config = require('../config');
var requireAuthenticated = require('../require-authenticated');

// // Get all products
// router.get('/', (req, res, next) => {
//     Product.find({}, function (err, products) {
//         res.json(products);
//     });
// });

// Get all orders of an user
router.get('/owner:id', (req, res, next) => {
    Order.find({ _rentorId: req.params.id }, function (err, orders) {
        res.json(orders);
    });
});

// Get a order by id
router.get('/:id', (req, res, next) => {
    Order.find({ _id: req.params.id }, function (err, order) {
        res.json(order);
    });
});

router.use(requireAuthenticated);

// Create
router.post('/', (req, res, next) => {
    let newOrder = new Order({
        _rentorId: req.body._rentorId,
        _clientId: req.body._clientId,
        address: req.body.address,
        city: req.body.city,
        region: req.body.region,
        zip: req.body.zip,
        _productId: req.body._productId,
        quantity: req.body.quantity,
        price: req.body.price,
        fromDateYear: req.body.fromDateYear,
        fromDateMonth: req.body.fromDateMonth,
        fromDateDay: req.body.fromDateDay,
        fromDateHour: req.body.fromDateHour,
        fromDateMinute: req.body.fromDateMinute,
        toDateYear: req.body.toDateYear,
        toDateMonth: req.body.toDateMonth,
        toDateDay: req.body.toDateDay,
        toDateHour: req.body.toDateHour,
        toDateMinute: req.body.toDateMinute,
        status: req.body.status
    });
    Order.createOrder(newOrder, (err, order) => {
        if (err) {
            res.status(403).json({ success: false, msg: err });
        }
        else {
            res.json(order);
        }
    });
});

// Update
router.put('/update/:id', (req, res, next) => {

    Order.update({ _id: req.params.id }, {
        _rentorId: req.body._rentorId,
        _clientId: req.body._clientId,
        address: req.body.address,
        city: req.body.city,
        region: req.body.region,
        zip: req.body.zip,
        _productId: req.body._productId,
        quantity: req.body.quantity,
        price: req.body.price,
        fromDateYear: req.body.fromDateYear,
        fromDateMonth: req.body.fromDateMonth,
        fromDateDay: req.body.fromDateDay,
        fromDateHour: req.body.fromDateHour,
        fromDateMinute: req.body.fromDateMinute,
        toDateYear: req.body.toDateYear,
        toDateMonth: req.body.toDateMonth,
        toDateDay: req.body.toDateDay,
        toDateHour: req.body.toDateHour,
        toDateMinute: req.body.toDateMinute,
        status: req.body.status
    }, (err, order) => {
        if (err) {
            res.status(403).json({ success: false, msg: err });
        }
        else {
            res.json(order);
        }
    });
});


module.exports = router;