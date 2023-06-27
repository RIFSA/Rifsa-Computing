//POG
import Keuangan from "../models/keuangan.js";
import { DecodeBase64 } from "../middleware/decrypt.js";

export const postKeuangan = async (req, res) => {
    const {
        user_id,
        username,
        tanggal_transaksi,
        jenis_kegiatan,
        jenis_tanaman,
        catatan_keuangan,
        nominal_transaksi,
    } = req.body;

    const KeuanganPost = new Keuangan({
        tanggal_transaksi: tanggal_transaksi,
        jenis_kegiatan: jenis_kegiatan,
        jenis_tanaman: jenis_tanaman,
        catatan_keuangan: catatan_keuangan,
        nominal_transaksi: nominal_transaksi,
        user_id: user_id,
        created_by: username,
    });

    try {
        const keuangan = await KeuanganPost.save();
        res.status(200).json({
            id_keuangan: keuangan.id_keuangan,
            status: res.statusCode,
            message: 'Berhasil membuat Keuangan baru',
            data: keuangan
        })
    } catch (error) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal membuat Keuangan baru',
            error: error
        })
    };
};

export const getKeuangan = async (req, res) => {
    const userId = req.query.user_id
    const userIdDecrypted = DecodeBase64(userId)
    try {
        const user = await Keuangan.findOne({
            where: {
                user_id: userIdDecrypted,
            }
        })
        if (user === null) return err
        const keuangan = await Keuangan.findAll({
            where: {
                user_id: userIdDecrypted,
            }
        })
        res.status(200).json({
            status: res.statusCode,
            message: 'Berhasil mendapatkan Keuangan',
            data: keuangan
        })
    } catch (error) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal mendapatkan Keuangan'
        })
    };
};

export const getKeuanganById = async (req, res) => {
    const userId = req.query.user_id
    const id_keuangan = req.query.id_keuangan
    const userIdDecrypted = DecodeBase64(userId)
    const id_keuanganDecrypted = DecodeBase64(id_keuangan)
    try {
        const keuangan = await Keuangan.findOne({
            where: {
                user_id: userIdDecrypted,
                id_keuangan: id_keuanganDecrypted,
            }
        })
        if (keuangan === null) return error
        res.status(200).json({
            id_keuangan: id_keuanganDecrypted,
            status: res.statusCode,
            message: 'Berhasil mendapatkan Keuangan',
            data: keuangan
        })
    } catch (error) {
        res.status(400).json({
            id_keuangan: id_keuanganDecrypted,
            status: res.statusCode,
            message: 'Gagal mendapatkan Keuangan',
            error: error
        })
    };
}

export const updateKeuangan = async (req, res) => {
    const id_keuangan = req.query.id_keuangan
    const id_keuanganDecrypted = DecodeBase64(id_keuangan)
    const {
        user_id,
        username,
        tanggal_transaksi,
        jenis_kegiatan,
        jenis_tanaman,
        catatan_keuangan,
        nominal_transaksi,
    } = req.body;
    try {
        const updateKeuangan = await Keuangan.update({
            tanggal_transaksi: tanggal_transaksi,
            jenis_kegiatan: jenis_kegiatan,
            jenis_tanaman: jenis_tanaman,
            catatan_keuangan: catatan_keuangan,
            nominal_transaksi: nominal_transaksi,
            updated_by: username,
            updated_at: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
        }, {
            where: {
                user_id: user_id,
                id_keuangan: id_keuanganDecrypted,
            }
        });
        if (updateKeuangan == 0) return error
        const dataKeuangan = await Keuangan.findOne({
            where: {
                user_id: user_id,
                id_keuangan: id_keuanganDecrypted,
            }
        })
        res.status(200).json({
            id_keuangan: id_keuanganDecrypted,
            status: res.statusCode,
            message: 'Berhasil memperbarui Keuangan',
            data: dataKeuangan
        })
    } catch (error) {
        res.status(400).json({
            id_keuangan: id_keuanganDecrypted,
            status: res.statusCode,
            message: 'Gagal memperbarui Keuangan',
            error: error
        })
    }
}

export const deleteKeuangan = async (req, res) => {
    const id_keuangan = req.query.id_keuangan
    const id_keuanganDecrypted = DecodeBase64(id_keuangan)
    try {
        const deleteKeuangan = await Keuangan.destroy({
            where: {
                // id: idUser,
                id_keuangan: id_keuanganDecrypted,
            }
        });
        console.log(deleteKeuangan)
        if (deleteKeuangan == 0) return error
        res.status(200).json({
            id_keuangan: id_keuanganDecrypted,
            status: res.statusCode,
            message: 'Berhasil menghapus Keuangan'
        })
    } catch (error) {
        res.status(400).json({
            id_keuangan: id_keuanganDecrypted,
            status: res.statusCode,
            message: 'Gagal menghapus Keuangan'
        })
    }
}