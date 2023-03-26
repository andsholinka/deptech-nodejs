const express = require('express');
const productController = require('../controllers/product');
const authMiddleware = require('../middleware/auth');
const imageUploader = require('../helpers/imageUploader');

const router = express.Router();

router.post('/', authMiddleware, imageUploader.upload.single('image'), productController.createProduct);

router.get('/', authMiddleware, productController.getAllProducts);

router.get('/:id', authMiddleware, productController.getProductById);

router.put('/:id', authMiddleware, imageUploader.upload.single('image'), productController.updateProduct);

router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;