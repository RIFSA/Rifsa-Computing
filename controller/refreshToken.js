import Users from "../models/user.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) =>{
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json({
            status: res.statusCode,
            message: "Unauthorized"
        });
        const user = await Users.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.status(403).json({
            status: res.statusCode,
            message: "Forbidden"
        });
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) =>{
            if(err) return res.status(403).json({
                status: res.statusCode,
                message: "Forbidden"
            });
            const idUser =user[0].id;
            const nama =user[0].nama;
            const email =user[0].email;
            const accessToken = jwt.sign({idUser, nama, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '1d'
            });
            res.json({ accessToken });
        })
    } catch (error) {
        console.log(error);
    }
}