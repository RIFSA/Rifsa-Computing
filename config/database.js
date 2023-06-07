import { Sequelize } from "sequelize";

const db = new Sequelize('rifsanodejs','user1','123123123',{
    host: "35.222.118.43",
    dialect: "mysql"
})

export default db;