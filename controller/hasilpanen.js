import HasilPanen from "../models/hasilpanen.js";

export const postHasilPanen = async (req, res) => {
    const {
        tanggal,
        jenis,
        berat,
        jual,
        catatan
    } = req.body;

    const HasilPanenPost = new HasilPanen({
        tanggal: tanggal,
        jenis: jenis,
        berat: berat,
        jual: jual,
        catatan: catatan,
    });

    try {
        const hasilpanen = await HasilPanenPost.save();
        res.status(200).json({
            status: res.statusCode,
            message: 'Berhasil membuat hasil panen baru',
            data: hasilpanen
        })
    } catch (error) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal membuat hasil panen baru'
        })
    };
};

export const getHasilPanen = async (req, res) => {
    try {
        const hasilpanen = await HasilPanen.findAll()
        res.status(200).json({
            status: res.statusCode,
            message: 'Berhasil mendapatkan hasil panen',
            data: hasilpanen
        })
    } catch (err) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal mendapatkan hasil panen'
        })
    };
};

export const getHasilPanenById = async (req, res) => {
    try {
        const hasilpanen = await HasilPanen.findOne({
            where: {
                id_hasil: req.params.id_hasil,
            }
        })
        if (hasilpanen === null) return error
        res.status(200).json({
            status: res.statusCode,
            message: 'Berhasil mendapatkan hasil panen',
            data: hasilpanen
        })
    } catch (error) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal mendapatkan hasil panen'
        })
    };
}

export const updateHasilPanen = async (req, res) => {
    const dataHasilPanen = req.body
    try {
        const updateHasilPanen = await HasilPanen.update({
            tanggal: req.body.tanggal,
            jenis: req.body.jenis,
            berat: req.body.berat,
            jual: req.body.jual,
            catatan: req.body.catatan,
        },{
            where:{
                id_hasil: req.params.id_hasil
            }
        });
        res.status(200).json({
            status: res.statusCode,
            message: 'Berhasil memperbarui hasil panen',
            data: dataHasilPanen
        })
    } catch (err) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal memperbarui hasil panen'
        })
    }
}

export const deleteHasilPanen = async (req, res) => {
    try {
        const deleteHasilPanen = await HasilPanen.destroy({
            where: {
                id_hasil: req.params.id_hasil
            }
        });
        res.status(200).json({
            status: res.statusCode,
            message: 'Berhasil menghapus hasil panen'
        })
    } catch (err) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal menghapus hasil panen'
        })
    }
}