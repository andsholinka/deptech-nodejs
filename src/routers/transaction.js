const express = require('express');
const transactionController = require('../controllers/transaction');
const authMiddleware = require('../middleware/auth');
const { runValidation } = require('../validation');

const router = express.Router();

router.post('/In', authMiddleware, transactionController.transactionIn);

router.post('/Out', authMiddleware, transactionController.transactionOut);

router.get('/', authMiddleware, transactionController.getAllTransactions);

module.exports = router;