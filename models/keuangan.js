import db from "../config/database.js";
import { DataTypes } from "sequelize";

const Keuangan = db.define('keuangan',{
    id_keuangan: {
        type: Int16Array,
        primaryKey: true,
        autoIncrement: true,
    },
    tanggal_transaksi: {
        type: Date,
    },
    jenis_kegiatan: {
        type: DataTypes.ENUM,
        values: ['DEBIT', 'KREDIT'],
    },
    jenis_tanaman: {
        type: String,
    },
    catatan_keuangan: {
        type: String,
    },
    nominal_transaksi: {
        type: Int16Array,
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

export default Keuangan
// POG