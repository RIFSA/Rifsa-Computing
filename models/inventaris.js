import db from "../config/database.js";

const Inventaris = db.define('inventaris',{
    id_inventaris: {
        type: Int16Array,
        primaryKey: true,
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
    createdAt: {
        type: String,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    }
});

export default Inventaris