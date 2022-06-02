//POG
import Keuangan from "../models/keuangan.js";

export const postKeuangan = async (req, res) => {
    const {
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
    });

    try {
        const keuangan = await KeuanganPost.save();
        res.status(200).json({
            status: res.statusCode,
            message: 'Berhasil membuat Keuangan baru',
            data: keuangan
        })
    } catch (error) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal membuat Keuangan baru'
        })
    };
};

export const getKeuangan = async (req, res) => {
    try {
        const keuangan = await Keuangan.findAll()
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
    try {
        const keuangan = await Keuangan.findOne({
            where: {
                id_keuangan: req.params.id_keuangan,
            }
        })
        if (keuangan === null) return error
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
}

export const updateKeuangan = async (req, res) => {
    try {
        const updateKeuangan = await Keuangan.update({
            tanggal: req.body.tanggal,
            kegiatan: req.body.kegiatan,
            jenis: req.body.jenis,
            catatan: req.body.catatan,
            jumlah: req.body.jumlah,
        },{
            where:{
                id_keuangan: req.params.id_keuangan
            }
        });
        if (updateKeuangan == 0) return error
        const dataKeuangan = await Keuangan.findOne({
            where: {
                id_keuangan: req.params.id_keuangan,
            }
        })
        res.status(200).json({
            status: res.statusCode,
            message: 'Berhasil memperbarui Keuangan',
            data: dataKeuangan
        })
    } catch (error) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal memperbarui Keuangan'
        })
    }
}

export const deleteKeuangan = async (req, res) => {
    try {
        const deleteKeuangan = await Keuangan.destroy({
            where: {
                id_keuangan: req.params.id_keuangan
            }
        });
        res.status(200).json({
            status: res.statusCode,
            message: 'Berhasil menghapus Keuangan'
        })
    } catch (error) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal menghapus Keuangan'
        })
    }
}