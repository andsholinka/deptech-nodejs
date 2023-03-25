const express = require('express');
const categoryController = require('../controllers/category');
const authMiddleware = require('../middleware/auth');
const { runValidation, createCategory } = require('../validation');

const router = express.Router();

router.post('/', authMiddleware, createCategory, runValidation, categoryController.createCategory);

router.get('/', authMiddleware, categoryController.getAllCategories);

router.get('/:id', authMiddleware, categoryController.getCategoryById);

router.put('/:id', authMiddleware, categoryController.updateCategory);

router.delete("/:id", authMiddleware, categoryController.deleteCategory);

module.exports = router;