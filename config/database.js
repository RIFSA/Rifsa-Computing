import { Sequelize } from "sequelize";

const db = new Sequelize('rifsanodejs','root','123123',{
    host: "23.251.150.1",
    dialect: "mysql"
})

export default db;