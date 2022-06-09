//POG
import Penyakit from "../models/penyakit.js";
import path from "path"
import fs from "fs"

export const postPenyakit = async (req, res) => {
    const {
        nama,
        indikasi,
        tanggal,
        latitude,
        longitude,
        deskripsi,
    } = req.body;
    if (req.files === null) return res.status(400).json({
        status: res.statusCode,
        message: 'Tidak ada file',
    })
    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext
    const url = `${req.protocol}://${req.get("host")}/public/images/${fileName}`
    const allowedType = ['.png', '.jpg', '.jpeg']

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({
        status: res.statusCode,
        message: 'invalid images',
    })
    if (fileSize > 5000000) return res.status(422).json({
        status: res.statusCode,
        message: 'Image must be less than 5 MB',
    })

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({
            status: res.statusCode,
            message: 'invalid images',
        })
        try {
            const penyakit = await Penyakit.create({
                nama: nama,
                image: fileName,
                url: url,
                indikasi: indikasi,
                tanggal: tanggal,
                latitude: latitude,
                longitude: longitude,
                deskripsi: deskripsi,
            })
            res.status(201).json({
                id_penyakit: req.params.id_penyakit,
                status: res.statusCode,
                message: 'Berhasil membuat Penyakit',
                data: penyakit
            })
        } catch (error) {
            res.status(400).json({
                id_penyakit: req.params.id_penyakit,
                status: res.statusCode,
                message: 'Gagal membuat Penyakit baru'
            })
        }
    })
};

export const getPenyakit = async (req, res) => {
    try {
        const penyakit = await Penyakit.findAll()
        res.status(200).json({
            id_penyakit: req.params.id_penyakit,
            status: res.statusCode,
            message: 'Berhasil mendapatkan Penyakit',
            data: penyakit
        })
    } catch (err) {
        res.status(400).json({
            id_penyakit: req.params.id_penyakit,
            status: res.statusCode,
            message: 'Gagal mendapatkan Penyakit'
        })
    };
};

export const getPenyakitById = async (req, res) => {
    try {
        const penyakit = await Penyakit.findOne({
            where: {
                // id: idUser,
                id_penyakit: req.params.id_penyakit,
            }
        })
        if (penyakit === null) return error
        res.status(200).json({
            id_penyakit: req.params.id_penyakit,
            status: res.statusCode,
            message: 'Berhasil mendapatkan Penyakit',
            data: penyakit
        })
    } catch (error) {
        res.status(400).json({
            id_penyakit: req.params.id_penyakit,
            status: res.statusCode,
            message: 'Gagal mendapatkan Penyakit'
        })
    };
}

export const updatePenyakit = async (req, res) => {
    const searchpenyakit = await Penyakit.findOne({
        where: {
            // id: idUser,
            id_penyakit: req.params.id_penyakit,
        }
    });
    if (!searchpenyakit) return res.status(404).json({
        id_penyakit: req.params.id_penyakit,
        status: res.statusCode,
        message: 'Penyakit tidak ditemukan'
    })

    let fileName = "";
    if (req.files === null) {
        fileName = searchpenyakit.image
    } else {
        const file = req.files.file
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        fileName = file.md5 + ext
        const allowedType = ['.png', '.jpg', '.jpeg']

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({
            status: res.statusCode,
            message: 'invalid images',
        })
        if (fileSize > 5000000) return res.status(422).json({
            status: res.statusCode,
            message: 'Image must be less than 5 MB',
        })

        const filePath = `./public/images/${searchpenyakit.image}`
        fs.unlinkSync(filePath)

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({
                status: res.statusCode,
                message: 'invalid images',
            })
        })
    }

    const {
        nama,
        indikasi,
        tanggal,
        latitude,
        longitude,
        deskripsi,
    } = req.body;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    try {
        await Penyakit.update({
            nama: nama,
            image: fileName,
            url: url,
            indikasi: indikasi,
            tanggal: tanggal,
            latitude: latitude,
            longitude: longitude,
            deskripsi: deskripsi,
        }, {
            where: {
                // id: idUser,
                id_penyakit: req.params.id_penyakit,
            }
        })
        const updatedpenyakit = await Penyakit.findOne({
            where: {
                // id: idUser,
                id_penyakit: req.params.id_penyakit,
            }
        })
        res.status(200).json({
            id_penyakit: req.params.id_penyakit,
            status: res.statusCode,
            message: 'Berhasil memperbarui Penyakit',
            data: updatedpenyakit
        })
    } catch (error) {
        res.status(400).json({
            id_penyakit: req.params.id_penyakit,
            status: res.statusCode,
            message: 'Gagal memperbarui Penyakit'
        })
    }
}

export const deletePenyakit = async (req, res) => {
        const penyakit = await Penyakit.findOne({
            where: {
                // id: idUser,
                id_penyakit: req.params.id_penyakit,
            }
        });
        if (!penyakit) return res.status(404).json({
            id_penyakit: req.params.id_penyakit,
            status: res.statusCode,
            message: 'Penyakit tidak ditemukan'
        })

        try {
            const filePath = `./public/images/${penyakit.image}`
            fs.unlinkSync(filePath)
            await Penyakit.destroy({
                where: {
                    id: idUser,
                    token: accessToken,
                    id_penyakit: req.params.id_penyakit,
                }
            });
            res.status(200).json({
                id_penyakit: req.params.id_penyakit,
                status: res.statusCode,
                message: 'Berhasil menghapus Penyakit'
            })
        } catch (err) {
            res.status(404).json({
                id_penyakit: req.params.id_penyakit,
                status: res.statusCode,
                message: 'Gagal menghapus Penyakit'
            })
        }
        
        
}
