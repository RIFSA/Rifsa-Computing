import { DOUBLE } from "sequelize";
import db from "../config/database.js";

const Penyakit = db.define('penyakit',{
    id_penyakit: {
        type: Int16Array,
        primaryKey: true,
    },
    nama: {
        type: String,
    },
    indikasi: {
        type: String,
    },
    link_foto: {
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
    createdAt: {
        type: String,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    }
});

export default Penyakit
// POG