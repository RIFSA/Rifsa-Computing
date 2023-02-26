import db from "../config/database.js";

const Keuangan = db.define('keuangan',{
    id_keuangan: {
        type: Int16Array,
        primaryKey: true,
        autoIncrement: true,
    },
    tanggal: {
        type: Date,
    },
    kegiatan: {
        type: String,
    },
    jenis: {
        type: String,
    },
    catatan: {
        type: String,
    },
    jumlah: {
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