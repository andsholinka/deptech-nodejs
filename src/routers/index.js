const express = require('express');
const router = new express.Router();

const adminRouter = require('./admin')
const categoryRouter = require('./category')
const productRouter = require('./product')
const transactionRouter = require('./transaction')

router.use('/admin', adminRouter)
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/transaction', transactionRouter)

module.exports = router;