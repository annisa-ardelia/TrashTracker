const { Router } = require("express");
const AdminController = require("./controller/AdminController");
const TrashController = require("./controller/TrashController");
const router = Router();

//untuk cek database admin
router.get("/cek", AdminController.Cek);

//untuk Register
router.post("/RegisterAdmin", AdminController.Register);

//untuk Login
router.post("/LoginAdmin", AdminController.Login);

// untuk menagmbil data tempat sampah
router.get("/TempatSampah", TrashController.getTempatSampah);

//untuk mengambil data sambah
router.get("/JumlahSampah/:id", TrashController.getTrashData);

//untuk mengambil data sampah harian
router.get("/DailySampah/:id", TrashController.getDailyTrashData);

module.exports = router;