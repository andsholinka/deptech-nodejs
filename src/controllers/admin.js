const {
    admins
} = require("../models");
const {
    sequelize
} = require('../models/index');
const moment = require('moment')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const httpResponseCode = require('../misc/const/httpResponseCode')

const createAdmin = async (req, res) => {
    try {
        let dateString = `${req.body.birth_date} 14:30:00`; // your date string
        let dateTime = new Date(dateString); // create a new date object from the string
        
        const data = await admins.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            birth_date: dateTime,
            gender: req.body.gender,
            password: bcrypt.hashSync(req.body.password, 10),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        })

        res.status(httpResponseCode.CREATED).send({
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

const getAllAdmin = async (req, res) => {

    try {
        const result = []
        const limit = req.query.limit ? req.query.limit : 5;
        const data = await admins.findAll({
            attributes: ['id', 'first_name', 'last_name', 'email', 'birth_date', 'gender', ],
            limit: limit,
        });

        data.forEach(element => {
            result.push({
                id: element.id,
                first_name: element.first_name,
                last_name: element.last_name,
                email: element.email,
                birth_date: moment(element.birth_date).format('D MMMM YYYY'),
                gender: element.gender,
            })
        })

        res.status(200).json({
            status: res.statusCode,
            message: "Success",
            data: result,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: res.statusCode,
            message: e.message
        })
    }
}

const getAdminById = async (req, res) => {
    try {
        const data = await admins.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'first_name', 'last_name', 'email', 'birth_date', 'gender', 'created_at', 'updated_at'],
        });

        if (data == null) {
            res.status(404).send({
                status: res.statusCode,
                message: `Admin with ID ${req.params.id} Not Found`,
                data: {}
            })
            return
        }

        res.status(200).send({
            status: res.statusCode,
            message: 'Success',
            data: {
                id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                birth_date: moment(data.birth_date).format('D MMMM YYYY'),
                email: data.email,
                gender: data.gender,
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

const updateAdmin = async (req, res) => {

    try {
        const admin = await admins.findOne({
            where: {
                id: req.params.id
            }
        })

        if (admin == null) {
            res.status(404).send({
                status: 'Not Found',
                message: `Admin with ID ${req.params.id} Not Found`,
                data: admin
            })
            return
        }

        let date = moment(req.body.birth_date)
        console.log(date);
        const birthDate = date.format()
        console.log(birthDate);

        await admin.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            birth_date: birthDate,
            gender: req.body.gender,
            updatedAt: Date.now(),
        });

        res.status(200).send({
            status: 200,
            message: 'Success',
            data: admin
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: res.statusCode,
            message: e.message
        })
    }
}

const deleteAdmin = async (req, res) => {
    try {
        const admin = await admins.findOne({
            where: {
                id: req.params.id
            }
        })

        if (admin == null) {
            res.status(404).send({
                status: res.statusCode,
                message: `Admin with ID ${req.params.id} Not Found`,
                data: admin
            })
            return
        }

        await admins.destroy({
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

const login = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            
            const {
                email,
                password,
            } = req.body;

            const user = await admins.findOne({
                where: {
                    email: email
                },
                transaction: t,
            })

            var passwordIsValid = bcrypt.compareSync(
                password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(400).send({
                    status: res.statusCode,
                    message: 'Password salah!',
                });
            }

            const tokendata = {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                gender: user.gender,
                email: user.email,
            }

            const token = jwt.sign({
                data: tokendata
            }, process.env.SECRET_KEY, {
                expiresIn: '12h'
            });

            res.status(200).send({
                status: res.statusCode,
                message: 'Login Berhasil',
                token
            });

        });
    } catch (e) {
        console.log(e.message);
        res.status(400).send({
            status: res.statusCode,
            message: e.message
        });
    }
}

module.exports = {
    createAdmin,
    getAllAdmin,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    login
}