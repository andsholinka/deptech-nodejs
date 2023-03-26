const {
    transactions,
    products,
    categories
} = require("../models");
const {
    sequelize
} = require('../models/index');
const moment = require('moment')

const transactionIn = async (req, res) => {
    let t = await sequelize.transaction();

    try {
        var data = [];
        req.body.transaction_data.forEach(element => {
            data.push({
                product_id: element.product_id,
                qty: element.qty,
            })
        });

        data.forEach(async element => {
            await transactions.create({
                product_id: element.product_id,
                qty: element.qty,
                type: "IN",
                createdAt: Date.now(),
                updatedAt: Date.now(),
            }, {
                transaction: t
            });
        });

        for (var item of data) {

            var product = await products.findOne({
                where: {
                    id: item.product_id
                },
                include: {
                    model: categories,
                    as: 'category',
                    attributes: ['id', 'name']
                },
                attributes: ['id', 'stock', ],
            });

            await product.update({
                stock: product.stock + item.qty
            }, {
                transaction: t
            })

        }

        res.status(201).send({
            status: res.statusCode,
            message: "Success",
        })
        await t.commit();
    } catch (e) {
        await t.rollback();
        console.log(e);
        res.status(500).send({
            status: res.statusCode,
            message: e.message
        });
    }
}

const transactionOut = async (req, res) => {
    let t = await sequelize.transaction();

    try {
        var data = [];
        var isSuccess = true;
        req.body.transaction_data.forEach(element => {
            data.push({
                product_id: element.product_id,
                qty: element.qty,
            })
        });

        data.forEach(async element => {
            await transactions.create({
                product_id: element.product_id,
                qty: element.qty,
                type: "OUT",
                createdAt: Date.now(),
                updatedAt: Date.now(),
            }, {
                transaction: t
            });
        });

        for (var item of data) {

            var product = await products.findOne({
                where: {
                    id: item.product_id
                },
                include: {
                    model: categories,
                    as: 'category',
                    attributes: ['id', 'name']
                },
                attributes: ['id', 'stock', ],
            });

            if (product.stock < item.qty) {
                res.status(400).send({
                    status: res.statusCode,
                    message: `Product ${product.category.name} out of stock`,
                })
                await t.rollback();

                isSuccess = false;
                break;
            } else {
                await product.update({
                    stock: product.stock - item.qty
                }, {
                    transaction: t
                })
            }
        }

        if (isSuccess) {
            res.status(201).send({
                status: res.statusCode,
                message: "Success",
            })
            await t.commit();
        }
    } catch (e) {
        await t.rollback();
        console.log(e);
        res.status(500).send({
            status: res.statusCode,
            message: e.message
        });
    }
}

const getAllTransactions = async (req, res) => {

    try {
        const data = []
        const limit = req.query.limit ? req.query.limit : 5;
        const findAll = await transactions.findAll({
            include: {
                model: products,
                as: 'product',
                attributes: ['id', 'name']
            },
            limit: limit,
        });

        for (var item of findAll) {
            data.push({
                id: item.id,
                product: item.product,
                qty: item.qty,
                type: item.type,
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

module.exports = {
    transactionIn,
    transactionOut,
    getAllTransactions
}