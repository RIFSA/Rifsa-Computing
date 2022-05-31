import db from "../config/database.js";

const Keuangan = db.define('keuangan',{
    id_keuangan: {
        type: Int16Array,
        primaryKey: true,
    },
    tanggal: {
        type: Date,
        default: Date.now(),
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

export default Keuangan
// POG