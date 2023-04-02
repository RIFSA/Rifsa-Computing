//POG
import Keuangan from "../models/keuangan.js";

export const postKeuangan = async (req, res) => {
    const {
        userId,
        username,
        tanggal,
        kegiatan,
        jenis,
        catatan,
        jumlah,
    } = req.body;

    const KeuanganPost = new Keuangan({
        tanggal: tanggal,
        kegiatan: kegiatan,
        jenis: jenis,
        catatan: catatan,
        jumlah: jumlah,
        user_id: userId,
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
    try {
        const userId = req.query.user_id
        const user = await Keuangan.findOne({
            where: {
                user_id: userId,
            }
        })
        if (user === null) return err
        const keuangan = await Keuangan.findAll({
            where: {
                user_id: userId,
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
    try {
        const keuangan = await Keuangan.findOne({
            where: {
                user_id: userId,
                id_keuangan: req.query.id_keuangan,
            }
        })
        if (keuangan === null) return error
        res.status(200).json({
            id_keuangan: req.query.id_keuangan,
            status: res.statusCode,
            message: 'Berhasil mendapatkan Keuangan',
            data: keuangan
        })
    } catch (error) {
        res.status(400).json({
            id_keuangan: req.query.id_keuangan,
            status: res.statusCode,
            message: 'Gagal mendapatkan Keuangan',
            error: error
        })
    };
}

export const updateKeuangan = async (req, res) => {
    const userId = req.body.user_id
    const username = req.body.username
    try {
        const updateKeuangan = await Keuangan.update({
            tanggal: req.body.tanggal,
            kegiatan: req.body.kegiatan,
            jenis: req.body.jenis,
            catatan: req.body.catatan,
            jumlah: req.body.jumlah,
            updated_by: username,
            updated_at: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
        }, {
            where: {
                user_id: userId,
                id_keuangan: req.query.id_keuangan,
            }
        });
        if (updateKeuangan == 0) return error
        const dataKeuangan = await Keuangan.findOne({
            where: {
                user_id: userId,
                id_keuangan: req.query.id_keuangan,
            }
        })
        res.status(200).json({
            id_keuangan: req.query.id_keuangan,
            status: res.statusCode,
            message: 'Berhasil memperbarui Keuangan',
            data: dataKeuangan
        })
    } catch (error) {
        res.status(400).json({
            id_keuangan: req.query.id_keuangan,
            status: res.statusCode,
            message: 'Gagal memperbarui Keuangan'
        })
    }
}

export const deleteKeuangan = async (req, res) => {
    // const idUser = req.query.id_User
    try {
        const deleteKeuangan = await Keuangan.destroy({
            where: {
                // id: idUser,
                id_keuangan: req.query.id_keuangan,
            }
        });
        console.log(deleteKeuangan)
        if (deleteKeuangan == 0) return error
        res.status(200).json({
            id_keuangan: req.query.id_keuangan,
            status: res.statusCode,
            message: 'Berhasil menghapus Keuangan'
        })
    } catch (error) {
        res.status(400).json({
            id_keuangan: req.query.id_keuangan,
            status: res.statusCode,
            message: 'Gagal menghapus Keuangan'
        })
    }
}