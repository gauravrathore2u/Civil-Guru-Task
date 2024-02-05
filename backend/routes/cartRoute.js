const { makePayment } = require('../controller/cartController');
const router = require('express').Router();

router.post("/makePayment", makePayment);

module.exports = router;