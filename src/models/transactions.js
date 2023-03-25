"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class transactions extends Model {}
    transactions.init({
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: DataTypes.STRING,
        qty: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: "transactions",
        underscored: true,
        paranoid: true,
    });
    transactions.associate = function (models) {
        transactions.belongsTo(models.products, {
            as: 'product',
            foreignKey: 'product_id'
        })
    };
    return transactions;
};