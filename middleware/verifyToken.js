import Jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).json({
        status: res.statusCode,
        message: "unauthorized"
    });
    Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if(err) return res.status(403).json({
            status: res.statusCode,
            message: "token invalid"
        });
        req.email = decode.email;
        next();
    })
}