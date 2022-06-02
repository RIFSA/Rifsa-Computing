import express from "express";
import { getToken, getUsers, Register, Login, Logout, Delete } from "../controller/users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { postHasilPanen, getHasilPanen, getHasilPanenById, updateHasilPanen, deleteHasilPanen } from "../controller/hasilpanen.js";
import { postInventaris, getInventaris, getInventarisById, updateInventaris, deleteInventaris } from "../controller/inventaris.js";
import { postKeuangan, getKeuangan, getKeuanganById, updateKeuangan, deleteKeuangan } from "../controller/keuangan.js";
import { postPenyakit, getPenyakit, getPenyakitById, updatePenyakit, deletePenyakit } from "../controller/penyakit.js";
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

// KEUANGAN
router.post("/keuangan", postKeuangan);
router.get("/keuangan", getKeuangan);
router.get("/keuangan/:id_keuangan", getKeuanganById);
router.put("/keuangan/:id_keuangan", updateKeuangan);
router.delete("/keuangan/:id_keuangan", deleteKeuangan);

// INVENTARIS
router.post("/penyakit", postPenyakit);
router.get("/penyakit", getPenyakit);
router.get("/penyakit/:id_penyakit", getPenyakitById);
router.put("/penyakit/:id_penyakit", updatePenyakit);
router.delete("/penyakit/:id_penyakit", deletePenyakit);

export default router;