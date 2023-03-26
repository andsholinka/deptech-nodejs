# Deptech

## Built with
* [Express](https://expressjs.com/) - The web framework used
* [MySQL](https://mysql.com/) - Database
* [Sequelize](https://sequelize.org/) - Sequelize is a promise-based Node.js ORM for SQL
* [Cloudinary](https://cloudinary.com/) - Cloudinary is a SaaS technology, provides a cloud-based image and video management services

## DEVELOPMENT
## Backend Development
1. Jalankan perintah `npm install` dan tunggu hingga semua module terinstall
2. Setup file .env 

## Settings Database
### 1 . Enviroment ##
1. Pastikan telah terinstall aplikasi mysql & phpmyadmin
2. Lengkapi data file .env sesuai dengan .env.example

### 2. Migrate Database ##
1. Jalankan perintah `npx sequelize db:migrate`
2. Perintah `npx sequelize db:migrate:undo:all` (menghapus semua migrasi)

## Getting Started
1. Jalankan perintah `npm start`

## Documentation
* [Postman](https://documenter.getpostman.com/view/21008090/2s93RNyurx) - Postman is an API platform for building and using APIs
