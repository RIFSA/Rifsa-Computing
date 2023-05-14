import { DOUBLE } from "sequelize";
import db from "../config/database.js";

const Inventaris = db.define('inventaris',{
    id_inventaris: {
        type: Int16Array,
        primaryKey: true,
        autoIncrement: true,
    },
    nama_inventaris: {
        type: String,
    },
    jumlah_inventaris: {
        type: String,
    },
    image_name: {
        type: String,
    },
    image_url: {
        type: String,
    },
    image_size: {
        type: DOUBLE,
    },
    catatan_inventaris: {
        type: String,
    },
    user_id: {
        type: Int16Array,
    },
    created_at: {
        type: Date,
        default: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
    },
    created_by: {
        type: String,
        default: "SYSTEM"
    },
    updated_at: {
        type: Date,
        default: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
    },
    updated_by: {
        type: String,
        default: "SYSTEM"
    },
},{
    timestamps: false
});

export default Inventaris