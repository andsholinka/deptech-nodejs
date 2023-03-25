require("dotenv").config();
module.exports = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DBNAME,
  port: process.env.MYSQL_PORT,
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
  logging: false,
  pool: {
    max: 100,
    min: 1,
    acquire: 30000,
    idle: 10000
  },
  define: {
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  },
};