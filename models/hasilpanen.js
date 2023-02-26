import db from "../config/database.js";

const HasilPanen = db.define('hasilpanen',{
    id_hasil: {
        type: Int16Array,
        primaryKey: true,
        autoIncrement: true,
    },
    tanggal: {
        type: Date,
        default: Date.now(),
    },
    jenis: {
        type: String,
    },
    berat: {
        type: Int16Array,
    },
    jual: {
        type: Int16Array,
    },
    catatan: {
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

export default HasilPanen