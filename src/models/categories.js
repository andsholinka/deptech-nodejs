"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class categories extends Model {}
    categories.init({
        name: DataTypes.STRING,
        desc: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "categories",
        underscored: true,
        paranoid: true,
    });
    categories.associate = function (models) {
        categories.hasMany(models.products, {
            foreignKey: 'category_id'
        })
    };
    return categories;
};