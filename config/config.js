require("dotenv").config();
module.exports = {
  username: process.env.MYUSER,
  password: process.env.PASSWD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
};
