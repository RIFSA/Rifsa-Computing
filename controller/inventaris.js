import Inventaris from "../models/inventaris.js";
import path from "path"
import fs from "fs"

export const postInventaris = async (req, res) => {
    const {
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
            const inventaris = await Inventaris.create({
                nama: nama,
                image: fileName,
                url: url,
                jumlah: jumlah,
                catatan: catatan,
            })
            res.status(201).json({
                status: res.statusCode,
                message: 'Berhasil membuat inventaris',
                data: inventaris
            })
        } catch (error) {
            res.status(400).json({
                status: res.statusCode,
                message: 'Gagal membuat Inventaris baru'
            })
        }
    })
};

export const getInventaris = async (req, res) => {
    try {
        const inventaris = await Inventaris.findAll()
        res.status(200).json({
            status: res.statusCode,
            message: 'Berhasil mendapatkan Inventaris',
            data: inventaris
        })
    } catch (err) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal mendapatkan Inventaris'
        })
    };
};

export const getInventarisById = async (req, res) => {
    try {
        const inventaris = await Inventaris.findOne({
            where: {
                id_inventaris: req.params.id_inventaris,
            }
        })
        if (inventaris === null) return error
        res.status(200).json({
            status: res.statusCode,
            message: 'Berhasil mendapatkan Inventaris',
            data: inventaris
        })
    } catch (error) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal mendapatkan Inventaris'
        })
    };
}

export const updateInventaris = async (req, res) => {
    const searchinventaris = await Inventaris.findOne({
        where: {
            id_inventaris: req.params.id_inventaris
        }
    });
    if (!searchinventaris) return res.status(404).json({
        status: res.statusCode,
        message: 'Inventaris tidak ditemukan'
    })

    let fileName = "";
    if (req.files === null) {
        fileName = inventaris.image
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
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`
    try {
        await Inventaris.update({
            nama: nama,
            image: fileName,
            url: url,
            jumlah: jumlah,
            catatan: catatan,
        }, {
            where: {
                id_inventaris: req.params.id_inventaris
            }
        })
        const updatedinventaris = await Inventaris.findOne({
            where: {
                id_inventaris: req.params.id_inventaris,
            }
        })
        res.status(200).json({
            status: res.statusCode,
            message: 'Berhasil memperbarui inventaris',
            data: updatedinventaris
        })
    } catch (error) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal memperbarui Inventaris'
        })
    }
}

export const deleteInventaris = async (req, res) => {
        const inventaris = await Inventaris.findOne({
            where: {
                id_inventaris: req.params.id_inventaris
            }
        });
        if (!inventaris) return res.status(404).json({
            status: res.statusCode,
            message: 'Inventaris tidak ditemukan'
        })

        try {
            const filePath = `./public/images/${inventaris.image}`
            fs.unlinkSync(filePath)
            await Inventaris.destroy({
                where: {
                    id_inventaris: req.params.id_inventaris
                }
            });
            res.status(200).json({
                status: res.statusCode,
                message: 'Berhasil menghapus inventaris'
            })
        } catch (err) {
            res.status(404).json({
                status: res.statusCode,
                message: 'Gagal menghapus inventaris'
            })
        }
        
        
}