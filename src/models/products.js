"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class products extends Model {}
    products.init({
        name: DataTypes.STRING,
        desc: DataTypes.STRING,
        image: DataTypes.STRING,
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: "products",
        underscored: true,
        paranoid: true,
    });
    products.associate = function (models) {
        products.belongsTo(models.categories, {
            as: 'category',
            foreignKey: 'category_id'
        })
        products.hasMany(models.transactions, {
            foreignKey: 'product_id'
        })
    };
    return products;
};