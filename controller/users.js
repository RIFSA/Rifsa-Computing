import Users from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res)=> {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email']
        });
        return res.status(200).json({
            status: res.statusCode,
            message: "Sukses",
            data: users});
    } catch (error) {
       console.log(error); 
    }
}

export const Register = async(req, res)=> {
    const {name, email, password, rePassword} = req.body;
    if(password !== rePassword)
    return res.status(400).json({
        status: res.statusCode,
        message: 'Password dan rePassword tidak cocok !'});

    // const emailExist = await Users.findOne({email: req.body.email})
    // if(emailExist) return res.status(400).json({
    //     status: res.statusCode,
    //     message: 'Email Sudah digunakan !'
    // })

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
            data: saveUser})
    }catch(err){
        res.status(400).json({
            status: res.statusCode,
            message: 'Gagal membuat user baru'
        })
    }
}

export const Login = async(req, res)=>{
    // try {
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        });

        if (user == '') {
            return res.status(400).json({
                status:res.statusCode,
                message: 'Email tidak ditemukan'
            });
        }
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) { return res.status(404).json({message: "wrong password"});}
        const idUser = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({idUser, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({idUser, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '7d'
        });
        await Users.update({refresh_token:refreshToken},{
            where: {
                id: idUser
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            status:res.statusCode,
            message: 'Berhasil Login',
            token: accessToken
        });

    // } catch (error) {
    //     res.status(404).json({message: "Email tidak ditemukan"});
    // }
}