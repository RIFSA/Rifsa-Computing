import db from "../config/database.js";



const Users = db.define('users',{
    id: {
        type: Int16Array,
        primaryKey: true,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    refresh_token: {
        type: String,
    },
    createdAt: {
        type: String,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    }
})

export default Users;