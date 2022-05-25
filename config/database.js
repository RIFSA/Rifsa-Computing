import { Sequelize } from "sequelize";

const db = new Sequelize('rifsa','root','',{
    host: "localhost",
    dialect: "mysql"
})

export default db;