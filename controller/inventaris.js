import Inventaris from "../models/inventaris.js";
import path from "path"
import fs from "fs"

export const postInventaris = async (req, res) => {
    const {
        userId,
        username,
        nama,
        jumlah,
        catatan
    } = req.body;
    if (req.files === null) return res.status(400).json({
        status: res.statusCode,
        message: 'Tidak ada file',
    })
    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name)
    const fileName = file.md5 + Math.random() + ext
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

    file.mv(`public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({
            status: res.statusCode,
            message: 'invalid images',
        })
        try {
            const inventaris = await Inventaris.create({
                nama: nama,
                image: fileName,
                url: url,
                jumlah: jumlah,
                catatan: catatan,
                user_id: userId,
                created_by: username,
            })
            res.status(201).json({
                id_inventaris: inventaris.id_inventaris,
                status: res.statusCode,
                message: 'Berhasil membuat inventaris',
                data: inventaris
            })
        } catch (error) {
            res.status(400).json({
                status: res.statusCode,
                message: 'Gagal membuat Inventaris baru',
                error: error
            })
        }
    })
};

export const getInventaris = async (req, res) => {
    try {
        const userId = req.query.user_id
        const inventaris = await Inventaris.findAll({
            where: {
                user_id: userId,
            }
        })
        res.status(200).json({
            status: res.statusCode,
            message: 'Berhasil mendapatkan Inventaris',
            data: inventaris
        })
    } catch (err) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal mendapatkan Inventaris',
            error: err
        })
    };
};

export const getInventarisById = async (req, res) => {
    try {
        const userId = req.query.user_id
        const inventaris = await Inventaris.findOne({
            where: {
                user_id: userId,
                id_inventaris: req.query.id_inventaris,
            }
        })
        if (inventaris === null) return error
        res.status(200).json({
            id_inventaris: req.query.id_inventaris,
            status: res.statusCode,
            message: 'Berhasil mendapatkan Inventaris',
            data: inventaris
        })
    } catch (error) {
        res.status(400).json({
            id_inventaris: req.query.id_inventaris,
            status: res.statusCode,
            message: 'Gagal mendapatkan Inventaris',
            error: error
        })
    };
}

export const updateInventaris = async (req, res) => {
    const userId = req.body.user_id
    const username = req.body.username
    const searchinventaris = await Inventaris.findOne({
        where: {
            user_id: userId,
            id_inventaris: req.query.id_inventaris,
        }
    });
    if (!searchinventaris) return res.status(404).json({
        id_inventaris: req.query.id_inventaris,
        status: res.statusCode,
        message: 'Inventaris tidak ditemukan'
    })

    let fileName = "";
    if (req.files === null) {
        fileName = searchinventaris.image
    } else {
        const file = req.files.file
        const fileSize = file.data.length
        const ext = path.extname(file.name)
        fileName = file.md5 + Math.random() + ext
        const allowedType = ['.png', '.jpg', '.jpeg']

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({
            status: res.statusCode,
            message: 'invalid images',
        })
        if (fileSize > 5000000) return res.status(422).json({
            status: res.statusCode,
            message: 'Image must be less than 5 MB',
        })

        const filePath = `./public/images/${searchinventaris.image}`
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
        jumlah,
        catatan
    } = req.body;
    const url = `${req.protocol}://${req.get("host")}/public/images/${fileName}`
    try {
        await Inventaris.update({
            nama: nama,
            image: fileName,
            url: url,
            jumlah: jumlah,
            catatan: catatan,
            updated_by: username,
            updated_at: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
        }, {
            where: {
                user_id: userId,
                id_inventaris: req.query.id_inventaris
            }
        })
        const updatedinventaris = await Inventaris.findOne({
            where: {
                user_id: userId,
                id_inventaris: req.query.id_inventaris,
            }
        })
        res.status(200).json({
            id_inventaris: req.query.id_inventaris,
            status: res.statusCode,
            message: 'Berhasil memperbarui inventaris',
            data: updatedinventaris
        })
    } catch (error) {
        res.status(400).json({
            id_inventaris: req.query.id_inventaris,
            status: res.statusCode,
            message: 'Gagal memperbarui Inventaris'
        })
    }
}

export const deleteInventaris = async (req, res) => {
        // const idUser = req.query.id_User
        const inventaris = await Inventaris.findOne({
            where: {
                // id_user: idUser,
                id_inventaris: req.query.id_inventaris,
            }
        });
        if (!inventaris) return res.status(404).json({
            id_inventaris: req.query.id_inventaris,
            status: res.statusCode,
            message: 'Inventaris tidak ditemukan'
        })

        try {
            const filePath = `public/images/${inventaris.image}`
            fs.unlinkSync(filePath)
            await inventaris.destroy({
                where: {
                    id_inventaris: req.query.id_inventaris,
                }
            });
            res.status(200).json({
                id_inventaris: req.query.id_inventaris,
                status: res.statusCode,
                message: 'Berhasil menghapus inventaris'
            })
        } catch (err) {
            res.status(404).json({
                id_inventaris: req.query.id_inventaris,
                status: res.statusCode,
                message: 'Gagal menghapus inventaris'
            })
        }
        
        
}