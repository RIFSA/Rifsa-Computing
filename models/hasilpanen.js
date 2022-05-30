import db from "../config/database.js";

const HasilPanen = db.define('hasilpanen',{
    id_hasil: {
        type: Int16Array,
        primaryKey: true,
    },
    tanggal: {
        type: Date,
        default: Date.now()
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
    createdAt: {
        type: String,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    }
});

export default HasilPanen