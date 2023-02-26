import db from "../config/database.js";

const Inventaris = db.define('inventaris',{
    id_inventaris: {
        type: Int16Array,
        primaryKey: true,
        autoIncrement: true,
    },
    nama: {
        type: String,
    },
    jumlah: {
        type: String,
    },
    image: {
        type: String,
    },
    url: {
        type: String,
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

export default Inventaris