import { Sequelize } from "sequelize";

const db = new Sequelize('rifsanodejs','user1','123123123',{
    host: "34.69.207.6",
    dialect: "mysql"
})

export default db;