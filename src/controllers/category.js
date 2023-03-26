const {
    categories
} = require("../models");
const {
    sequelize
} = require('../models/index');
const moment = require('moment')

const createCategory = async (req, res) => {
    try {        
        const data = await categories.create({
            name: req.body.name,
            desc: req.body.desc,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        })

        res.status(201).send({
            status: res.statusCode,
            message: "Success",
            data
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: res.statusCode,
            message: e.message
        });
    }
}

const getAllCategories = async (req, res) => {

    try {
        const limit = req.query.limit ? req.query.limit : 5;
        const data = await categories.findAll({
            limit: limit,
        });

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

const getCategoryById = async (req, res) => {

    try {
        const data = await categories.findOne({
            where: {
                id: req.params.id
            },
        });

        if (data == null) {
            res.status(404).send({
                status: res.statusCode,
                message: `Category with ID ${req.params.id} Not Found`,
                data: {}
            })
            return
        }

        res.status(200).send({
            status: res.statusCode,
            message: 'Success',
            data
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: res.statusCode,
            message: e.message
        })
    }
}

const updateCategory = async (req, res) => {

    try {
        const category = await categories.findOne({
            where: {
                id: req.params.id
            }
        })

        if (category == null) {
            res.status(404).send({
                status: res.statusCode,
                message: `Category with ID ${req.params.id} Not Found`,
                data: category
            })
            return
        }

        await category.update({
            name: req.body.name ? req.body.name : category.name,
            desc: req.body.desc ? req.body.desc : category.desc,
            updatedAt: Date.now(),
        });

        res.status(200).send({
            status: 200,
            message: 'Success',
            data: category
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: res.statusCode,
            message: e.message
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const category = await categories.findOne({
            where: {
                id: req.params.id
            }
        })

        if (category == null) {
            res.status(404).send({
                status: res.statusCode,
                message: `Category with ID ${req.params.id} Not Found`,
                data: category
            })
            return
        }

        await categories.destroy({
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
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}