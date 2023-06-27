import HasilPanen from "../models/hasilpanen.js";
import { DecodeBase64, Decrypt } from "../middleware/decrypt.js";
import Users from "../models/user.js";

export const postHasilPanen = async (req, res) => {
    const {
        user_id,
        username,
        tanggal_hasil,
        jenis_tanaman,
        berat_tanaman,
        catatan_hasil
    } = req.body;

    const HasilPanenPost = new HasilPanen({
        user_id: user_id,
        tanggal_hasil: tanggal_hasil,
        jenis_tanaman: jenis_tanaman,
        berat_tanaman: berat_tanaman,
        catatan_hasil: catatan_hasil,
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
        console.log(userId)
        const userIdDecrypted = DecodeBase64(userId)
        console.log(userIdDecrypted)
        const user = await Users.findOne({
            where: {
                id: userIdDecrypted,
            }
        })
        if (user === null) return err
        const hasilpanen = await HasilPanen.findAll({
            where: {
                user_id: userIdDecrypted,
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
    const userId = req.query.user_id
    const id_hasil = req.query.id_hasil
    const userIdDecrypted = DecodeBase64(userId)
    const id_hasilDecrypted = DecodeBase64(id_hasil)
    try {
        const hasilpanen = await HasilPanen.findOne({
            where: {
                user_id: userIdDecrypted,
                id_hasil: id_hasilDecrypted,
            }
        })
        if (hasilpanen === null) return error
        res.status(200).json({
            id_hasil: id_hasilDecrypted,
            status: res.statusCode,
            message: 'Berhasil mendapatkan hasil panen',
            data: hasilpanen
        })
    } catch (error) {
        res.status(400).json({
            id_hasil: id_hasilDecrypted,
            status: res.statusCode,
            message: 'Gagal mendapatkan hasil panen'
        })
    };
}

export const updateHasilPanen = async (req, res) => {
    const dataHasilPanen = req.body;
    const userId = req.body.user_id
    const username = req.body.username
    const id_hasil = req.query.id_hasil
    const id_hasilDecrypted = DecodeBase64(id_hasil)
    try {
        const updateHasilPanen = await HasilPanen.update({
            tanggal_hasil: dataHasilPanen.tanggal_hasil,
            jenis_tanaman: dataHasilPanen.jenis_tanaman,
            berat_tanaman: dataHasilPanen.berat_tanaman,
            catatan_hasil: dataHasilPanen.catatan_hasil,
            updated_by: username,
            updated_at: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
        }, {
            where: {
                user_id: userId,
                id_hasil: id_hasilDecrypted,
            }
        });
        if (updateHasilPanen == 0) return error
        res.status(200).json({
            id_hasil: id_hasilDecrypted,
            status: res.statusCode,
            message: 'Berhasil memperbarui hasil panen',
            data: dataHasilPanen
        })
    } catch (err) {
        res.status(400).json({
            id_hasil: id_hasilDecrypted,
            status: res.statusCode,
            message: 'Gagal memperbarui hasil panen',
            error: err
        })
    }
}

export const deleteHasilPanen = async (req, res) => {
    const id_hasil = req.query.id_hasil
    const id_hasilDecrypted = DecodeBase64(id_hasil)
    try {
        const deleteHasilPanen = await HasilPanen.destroy({
            where: {
                // id: idUser,
                id_hasil: id_hasilDecrypted,
            }
        });
        if (deleteHasilPanen == 0) return error
        res.status(200).json({
            id_hasil: id_hasilDecrypted,
            status: res.statusCode,
            message: 'Berhasil menghapus hasil panen'
        })
    } catch (err) {
        res.status(400).json({
            id_hasil: id_hasilDecrypted,
            status: res.statusCode,
            message: 'Gagal menghapus hasil panen'
        })
    }
}