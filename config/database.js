import { Sequelize } from "sequelize";

const db = new Sequelize('brjt28aiaay5uf5x0to7','utdid4lmcvjgulrr','wqSiCi7aWyd6LKZNkMfJ',{
    host: "brjt28aiaay5uf5x0to7-mysql.services.clever-cloud.com",
    dialect: "mysql"
})

export default db;