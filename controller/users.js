import Users from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    registerValidation,
    loginValidation
} from "../config/validation.js"

export const verifyTokenExternal = async (req, res, next) => {
    const {
        token
    } = req.body
    if(token == null) return res.status(403).json({
        status: res.statusCode,
        message: "Unauthorized"
    });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if(err) return res.status(403).json({
            status: res.statusCode,
            message: "Unauthorized"
        });
    })
    return res.status(200).json({
        status: res.statusCode,
        message: "Authorized"
    });
}

export const getToken = async (req, res, next) => {
    const {
        token
    } = req.body
    const tokenExist = await Users.findOne({
        where: {
            refresh_token: token
        }
    })
    if (!tokenExist) return res.status(403).json({
        status: res.statusCode,
        message: "Unauthorized",
    });
    next();
}

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email']
        });
        return res.status(200).json({
            status: res.statusCode,
            message: "Sukses",
            data: users
        });
    } catch (error) {
        console.log(error);
    }
}

export const Register = async (req, res) => {
    const {
        name,
        email,
        password,
        rePassword
    } = req.body;

    const { error } = await registerValidation(req.body)
    if (error) {
        return res.status(400).json({
            status: res.statusCode,
            message: error.error.details[0].message
        });
    }


    if (password !== rePassword)
        return res.status(400).json({
            status: res.statusCode,
            message: 'Password dan rePassword tidak cocok !'
        });

    const emailExist = await Users.findOne({
        where: {
            email: req.body.email
        }
    })
    if (emailExist) return res.status(400).json({
        status: res.statusCode,
        message: 'Email Sudah digunakan !'
    })

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const users = new Users({
        name: name,
        email: email,
        password: hashPassword
    })

    try {
        const saveUser = await users.save()
        res.status(200).json({
            status: res.statusCode,
            message: 'Berhasil membuat user baru',
            data: saveUser
        })
    } catch (err) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal membuat user baru'
        })
    }
}

export const Login = async (req, res) => {
    const error = await loginValidation(req.body)
    if (error) {
        return res.status(400).json({
            status: res.statusCode,
            message: error.error.details[0].message
        });
    }
    const user = await Users.findAll({
        where: {
            email: req.body.email
        }
    });

    if (user == '') {
        return res.status(400).json({
            status: res.statusCode,
            message: 'Email tidak ditemukan'
        });
    }
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
        return res.status(403).json({
            message: "wrong password"
        });
    }

    const idUser = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const accessToken = jwt.sign({
            idUser,
            name,
            email
        },
        process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        }
    );
    const refreshToken = jwt.sign({
            idUser,
            name,
            email
        },
        process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '7d'
        }
    );
    await Users.update({
        refresh_token: refreshToken
    }, {
        where: {
            id: idUser
        }
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.status(200).json({
        status: res.statusCode,
        message: 'Berhasil Login',
        token: accessToken
    });
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({
        status: res.statusCode,
        message: "No Token Found"
    });
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.status(401).json({
        status: res.statusCode,
        message: "No User Found"
    });
    const idUser = user[0].id
    await Users.update({refresh_token: null}, {
        where: {
            id: idUser
        }
    });
    res.clearCookie('refreshToken')
    return res.status(200).json({
        status: res.statusCode,
        message: "Logged out successfully"
    });
}

export const Delete = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({
        status: res.statusCode,
        message: "No Token Found"
    });
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.status(401).json({
        status: res.statusCode,
        message: "No User Found"
    });
    const idUser = user[0].id
    await Users.destroy({
        where: {
            id: idUser
        }
    });
    res.clearCookie('refreshToken')
    return res.status(200).json({
        status: res.statusCode,
        message: "Account deleted successfully"
    });
}