import Inventaris from "../models/inventaris.js";
import path from "path"
import fs from "fs"
import { DecodeBase64 } from "../middleware/decrypt.js";

export const postInventaris = async (req, res) => {
    const {
        user_id,
        username,
        nama_inventaris,
        jumlah_inventaris,
        catatan_inventaris
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
    const dotRegex = '.';
    const imgNameWithoutExt = path.parse(file.name).name;

    if (imgNameWithoutExt.includes(dotRegex)) return res.status(422).json({
        status: res.statusCode,
        message: 'invalid images contains dot',
    })

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({
        status: res.statusCode,
        message: 'invalid images type',
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
                nama_inventaris: nama_inventaris,
                image_name: fileName,
                image_url: url,
                image_size: fileSize,
                jumlah_inventaris: jumlah_inventaris,
                catatan_inventaris: catatan_inventaris,
                user_id: user_id,
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
    const userId = req.query.user_id
    console.log(userId)
    const userIdDecrypted = DecodeBase64(userId)
    console.log(userIdDecrypted)
    try {
        const user = await Inventaris.findOne({
            where: {
                user_id: userIdDecrypted,
            }
        })
        if (user === null) return err
        const inventaris = await Inventaris.findAll({
            where: {
                user_id: userIdDecrypted,
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
    const userId = req.query.user_id
    const id_inventaris = req.query.id_inventaris
    const userIdDecrypted = DecodeBase64(userId)
    const id_inventarisDecrypted = DecodeBase64(id_inventaris)
    try {
        const inventaris = await Inventaris.findOne({
            where: {
                user_id: userIdDecrypted,
                id_inventaris: id_inventarisDecrypted,
            }
        })
        if (inventaris === null) return error
        res.status(200).json({
            id_inventaris: id_inventarisDecrypted,
            status: res.statusCode,
            message: 'Berhasil mendapatkan Inventaris',
            data: inventaris
        })
    } catch (error) {
        res.status(400).json({
            id_inventaris: id_inventarisDecrypted,
            status: res.statusCode,
            message: 'Gagal mendapatkan Inventaris',
            error: error
        })
    };
}

export const updateInventaris = async (req, res) => {
    const id_inventaris = req.query.id_inventaris
    const id_inventarisDecrypted = DecodeBase64(id_inventaris)
    const user_id = req.body.user_id
    const username = req.body.username
    const searchinventaris = await Inventaris.findOne({
        where: {
            user_id: user_id,
            id_inventaris: id_inventarisDecrypted,
        }
    });
    if (!searchinventaris) return res.status(404).json({
        id_inventaris: id_inventarisDecrypted,
        status: res.statusCode,
        message: 'Inventaris tidak ditemukan'
    })

    let fileName = "";
    let fileSize = 0;
    let url = "";
    if (req.files === null) {
        fileName = searchinventaris.image_name
        url = searchinventaris.image_url
        fileSize = searchinventaris.image_size
    } else {
        const file = req.files.file
        fileSize = file.data.length
        const ext = path.extname(file.name)
        fileName = file.md5 + Math.random() + ext
        const allowedType = ['.png', '.jpg', '.jpeg']
        const dotRegex = '.';
        const imgNameWithoutExt = path.parse(file.name).name;

        if (imgNameWithoutExt.includes(dotRegex)) return res.status(422).json({
            status: res.statusCode,
            message: 'invalid images contains dot',
        })

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({
            status: res.statusCode,
            message: 'invalid images',
        })
        if (fileSize > 5000000) return res.status(422).json({
            status: res.statusCode,
            message: 'Image must be less than 5 MB',
        })

        url = `${req.protocol}://${req.get("host")}/public/images/${fileName}`
        const filePath = `./public/images/${searchinventaris.image_name}`
        fs.unlinkSync(filePath)

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({
                status: res.statusCode,
                message: 'invalid images',
            })
        })
    }

    const {
        nama_inventaris,
        jumlah_inventaris,
        catatan_inventaris
    } = req.body;
    try {
        await Inventaris.update({
            nama_inventaris: nama_inventaris,
            image_name: fileName,
            image_url: url,
            image_size: fileSize,
            jumlah_inventaris: jumlah_inventaris,
            catatan_inventaris: catatan_inventaris,
            updated_by: username,
            updated_at: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' '),
        }, {
            where: {
                user_id: user_id,
                id_inventaris: id_inventarisDecrypted
            }
        })
        const updatedinventaris = await Inventaris.findOne({
            where: {
                user_id: user_id,
                id_inventaris: id_inventarisDecrypted,
            }
        })
        res.status(200).json({
            id_inventaris: id_inventarisDecrypted,
            status: res.statusCode,
            message: 'Berhasil memperbarui inventaris',
            data: updatedinventaris
        })
    } catch (error) {
        res.status(400).json({
            id_inventaris: id_inventarisDecrypted,
            status: res.statusCode,
            message: 'Gagal memperbarui Inventaris',
            error: error
        })
    }
}

export const deleteInventaris = async (req, res) => {
    const id_inventaris = req.query.id_inventaris
    const id_inventarisDecrypted = DecodeBase64(id_inventaris)
    const inventaris = await Inventaris.findOne({
        where: {
            // id_user: idUser,
            id_inventaris: id_inventarisDecrypted,
        }
    });
    if (!inventaris) return res.status(404).json({
        id_inventaris: id_inventarisDecrypted,
        status: res.statusCode,
        message: 'Inventaris tidak ditemukan'
    })

    try {
        const filePath = `public/images/${inventaris.image_name}`
        fs.unlinkSync(filePath)
        await inventaris.destroy({
            where: {
                id_inventaris: id_inventarisDecrypted,
            }
        });
        res.status(200).json({
            id_inventaris: id_inventarisDecrypted,
            status: res.statusCode,
            message: 'Berhasil menghapus inventaris'
        })
    } catch (err) {
        res.status(404).json({
            id_inventaris: id_inventarisDecrypted,
            status: res.statusCode,
            message: 'Gagal menghapus inventaris'
        })
    }


}