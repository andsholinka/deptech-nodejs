"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class admins extends Model {}
    admins.init({
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        birth_date: DataTypes.DATE,
        gender: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "admins",
        underscored: true,
        paranoid: true,
    });
    return admins;
};