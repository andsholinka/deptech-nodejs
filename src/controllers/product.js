const {
    products,
    categories
} = require("../models");
const {
    sequelize
} = require('../models/index');
const fs = require('fs')
const moment = require('moment')
const cloudinary = require('../helpers/cloudinary')

const createProduct = async (req, res) => {
    try {

        if (!req.file) throw new Error('Please upload image');
        if (!req.body.name || !req.body.desc || !req.body.category_id || !req.body.stock) {
            fs.unlinkSync('images/' + req.file.filename)
            throw new Error('Please complete the request body');
        }

        const result = await cloudinary.uploader.upload(req.file.path);

        const data = await products.create({
            name: req.body.name,
            desc: req.body.desc,
            image: result.secure_url,
            category_id: req.body.category_id,
            stock: req.body.stock,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        })

        fs.unlinkSync('images/' + req.file.filename)

        res.status(201).send({
            status: res.statusCode,
            message: "Success",
            data
        })
    } catch (e) {
        console.log(e);
        res.status(400).send({
            status: res.statusCode,
            message: e.message
        });
    }
}

const getAllProducts = async (req, res) => {

    try {
        const data = []
        const limit = req.query.limit ? req.query.limit : 5;
        const findAll = await products.findAll({
            include: {
                model: categories,
                as: 'category',
                attributes: ['id', 'name']
            },
            limit: limit,
        });
        for (var item of findAll) {
            data.push({
                id: item.id,
                name: item.name,
                desc: item.desc,
                image: item.image,
                category: item.category,
                stock: item.stock,
                created_at: moment(data.created_at).format('D MMMM YYYY, h:mm A'),
                updated_at: moment(data.updated_at).format('D MMMM YYYY, h:mm A'),
            })
        }

        res.status(200).json({
            status: res.statusCode,
            message: "Success",
            data
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: res.statusCode,
            message: e.message
        })
    }
}

const getProductById = async (req, res) => {

    try {
        const data = await products.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: categories,
                as: 'category',
                attributes: ['id', 'name']
            },
        });

        if (data == null) {
            res.status(404).send({
                status: res.statusCode,
                message: `Product with ID ${req.params.id} Not Found`,
                data: {}
            })
            return
        }

        res.status(200).send({
            status: res.statusCode,
            message: 'Success',
            data: {
                id: data.id,
                name: data.name,
                desc: data.desc,
                image: data.image,
                category: data.category,
                stock: data.stock,
                created_at: moment(data.created_at).format('D MMMM YYYY, h:mm A'),
                updated_at: moment(data.updated_at).format('D MMMM YYYY, h:mm A'),
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: res.statusCode,
            message: e.message
        })
    }
}

const updateProduct = async (req, res) => {

    try {
        const product = await products.findOne({
            where: {
                id: req.params.id
            }
        })

        if (product == null) {
            res.status(404).send({
                status: res.statusCode,
                message: `Product with ID ${req.params.id} Not Found`,
                data: product
            })
            return
        }

        var linkImage;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            linkImage = result.secure_url;
            fs.unlinkSync('images/' + req.file.filename)
        }

        await product.update({
            name: req.body.name ? req.body.name : product.name,
            desc: req.body.desc ? req.body.desc : product.desc,
            image: req.file ? linkImage : product.image,
            category_id: req.body.category_id ? req.body.category_id : product.category_id,
            stock: req.body.stock ? req.body.stock : product.stock,
            updatedAt: Date.now(),
        });

        res.status(200).send({
            status: 200,
            message: 'Success',
            data: product
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: res.statusCode,
            message: e.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await products.findOne({
            where: {
                id: req.params.id
            }
        })

        if (product == null) {
            res.status(404).send({
                status: res.statusCode,
                message: `Product with ID ${req.params.id} Not Found`,
                data: product
            })
            return
        }

        await products.destroy({
            where: {
                id: req.params.id,
            }
        })
        res.status(200).json({
            status: res.statusCode,
            message: 'Success',
            data: {}
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: res.statusCode,
            message: e.message
        })
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}