import { DOUBLE } from "sequelize";
import db from "../config/database.js";

const Penyakit = db.define('penyakit',{
    id_penyakit: {
        type: Int16Array,
        primaryKey: true,
        autoIncrement: true,
    },
    nama: {
        type: String,
    },
    indikasi: {
        type: String,
    },
    image: {
        type: String,
    },
    url: {
        type: String,
    },
    tanggal: {
        type: Date,
        default: Date.now()
    },
    latitude: {
        type: DOUBLE,
    },
    longitude: {
        type: DOUBLE,
    },
    deskripsi: {
        type: String,
    },
    id_user: {
        type: Int16Array,
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
});

export default Penyakit
// POG