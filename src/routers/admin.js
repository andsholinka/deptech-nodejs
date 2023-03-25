const express = require('express');
const adminController = require('../controllers/admin');
const authMiddleware = require('../middleware/auth');
const verifySignUp = require('../middleware/verifySignUp');
const { runValidation, createAdmin } = require('../validation');

const router = express.Router();

router.post('/', verifySignUp.checkDuplicateEmail, createAdmin, runValidation, adminController.createAdmin);

router.post('/login', adminController.login);

router.get('/', authMiddleware, adminController.getAllAdmin);

router.get('/:id', authMiddleware, adminController.getAdminById);

router.put('/:id', authMiddleware, adminController.updateAdmin);

router.delete("/:id", authMiddleware, adminController.deleteAdmin);

module.exports = router;