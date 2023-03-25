import HasilPanen from "../models/hasilpanen.js";

export const postHasilPanen = async (req, res) => {
    const {
        userId,
        username,
        tanggal,
        jenis,
        berat,
        jual,
        catatan
    } = req.body;

    const HasilPanenPost = new HasilPanen({
        user_id: userId,
        tanggal: tanggal,
        jenis: jenis,
        berat: berat,
        jual: jual,
        catatan: catatan,
        created_by: username,
    });

    try {
        const hasilpanen = await HasilPanenPost.save();
        res.status(200).json({
            id_hasil: hasilpanen.id_hasil,
            status: res.statusCode,
            message: 'Berhasil membuat hasil panen baru',
            data: hasilpanen
        })
    } catch (error) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal membuat hasil panen baru',
            error: error
        })
    };
};

export const getHasilPanen = async (req, res) => {
    try {
        const userId = req.query.user_id
        const user = await HasilPanen.findOne({
            where: {
                user_id: userId,
            }
        })
        if (user === null) return err
        const hasilpanen = await HasilPanen.findAll({
            where: {
                user_id: userId,
            }
        })
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
        const userId = req.query.user_id
        const hasilpanen = await HasilPanen.findOne({
            where: {
                user_id: userId,
                id_hasil: req.query.id_hasil,
            }
        })
        if (hasilpanen === null) return error
        res.status(200).json({
            id_hasil: req.query.id_hasil,
            status: res.statusCode,
            message: 'Berhasil mendapatkan hasil panen',
            data: hasilpanen
        })
    } catch (error) {
        res.status(400).json({
            id_hasil: req.query.id_hasil,
            status: res.statusCode,
            message: 'Gagal mendapatkan hasil panen'
        })
    };
}

export const updateHasilPanen = async (req, res) => {
    const dataHasilPanen = req.body;
    const userId = req.body.user_id
    const username = req.body.username
    try {
        const updateHasilPanen = await HasilPanen.update({
            tanggal: req.body.tanggal,
            jenis: req.body.jenis,
            berat: req.body.berat,
            jual: req.body.jual,
            catatan: req.body.catatan,
            updated_by: username,
            updated_at: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
        }, {
            where: {
                user_id: userId,
                id_hasil: req.query.id_hasil,
            }
        });
        if (updateHasilPanen == 0) return error
        res.status(200).json({
            id_hasil: req.query.id_hasil,
            status: res.statusCode,
            message: 'Berhasil memperbarui hasil panen',
            data: dataHasilPanen
        })
    } catch (err) {
        res.status(400).json({
            id_hasil: req.query.id_hasil,
            status: res.statusCode,
            message: 'Gagal memperbarui hasil panen',
            error: err
        })
    }
}

export const deleteHasilPanen = async (req, res) => {
    // const idUser = req.query.id_User
    try {
        const deleteHasilPanen = await HasilPanen.destroy({
            where: {
                // id: idUser,
                id_hasil: req.query.id_hasil,
            }
        });
        res.status(200).json({
            id_hasil: req.query.id_hasil,
            status: res.statusCode,
            message: 'Berhasil menghapus hasil panen'
        })
    } catch (err) {
        res.status(400).json({
            id_hasil: req.query.id_hasil,
            status: res.statusCode,
            message: 'Gagal menghapus hasil panen'
        })
    }
}