import express from "express";
import { getToken, getUsers, Register, Login, Logout, Delete } from "../controller/users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { postHasilPanen, getHasilPanen, getHasilPanenById, updateHasilPanen, deleteHasilPanen } from "../controller/hasilpanen.js";
import { postInventaris, getInventaris, getInventarisById, updateInventaris, deleteInventaris } from "../controller/inventaris.js";
import { refreshToken } from "../controller/refreshToken.js";



const router = express.Router();

// LOGIN AUTH
router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

// USER
router.get("/users", verifyToken, getUsers);
router.delete("/delete", Delete);

// HASIL PANEN
router.post("/hasilpanen", postHasilPanen);
router.get("/hasilpanen", getHasilPanen);
router.get("/hasilpanen/:id_hasil", getHasilPanenById);
router.put("/hasilpanen/:id_hasil", updateHasilPanen);
router.delete("/hasilpanen/:id_hasil", deleteHasilPanen);

// INVENTARIS
router.post("/inventaris", postInventaris);
router.get("/inventaris", getInventaris);
router.get("/inventaris/:id_inventaris", getInventarisById);
router.put("/inventaris/:id_inventaris", updateInventaris);
router.delete("/inventaris/:id_inventaris", deleteInventaris);


export default router;