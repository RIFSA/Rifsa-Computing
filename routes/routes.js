import express from "express";
import { getToken, getUsers, Register, Login, Logout, Delete, verifyTokenExternal } from "../controller/users.js";
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
router.delete("/delete", verifyToken, Delete);
router.post("/verifytoken", verifyTokenExternal);

// HASIL PANEN
router.post("/hasilpanen", verifyToken, postHasilPanen);
router.get("/hasilpanen", verifyToken, getHasilPanen);
router.get("/hasilpanendetail", verifyToken, getHasilPanenById);
router.put("/hasilpanen", verifyToken, updateHasilPanen);
router.delete("/hasilpanen", verifyToken, deleteHasilPanen);

// INVENTARIS
router.post("/inventaris", verifyToken, postInventaris);
router.get("/inventaris", verifyToken, getInventaris);
router.get("/inventarisdetail", verifyToken, getInventarisById);
router.put("/inventaris", verifyToken, updateInventaris);
router.delete("/inventaris", verifyToken, deleteInventaris);

// KEUANGAN
router.post("/keuangan", verifyToken, postKeuangan);
router.get("/keuangan", verifyToken, getKeuangan);
router.get("/keuangandetail", verifyToken, getKeuanganById);
router.put("/keuangan", verifyToken, updateKeuangan);
router.delete("/keuangan", verifyToken, deleteKeuangan);

// PENYAKIT
// router.post("/penyakit", verifyToken, postPenyakit);
router.get("/penyakit", verifyToken, getPenyakit);
router.get("/penyakit/:id_penyakit", verifyToken, getPenyakitById);
router.put("/penyakit/:id_penyakit", verifyToken, updatePenyakit);
router.delete("/penyakit/:id_penyakit", verifyToken, deletePenyakit);

export default router;