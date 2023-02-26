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
    created_at: {
        type: Date,
        default: Date.now(),
    },
    created_by: {
        type: String,
        default: "SYSTEM"
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    },
    updated_by: {
        type: String,
        default: "SYSTEM"
    },
},{
    timestamps: false
})

export default Users;