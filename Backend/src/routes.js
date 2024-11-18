const { Router } = require("express");
const AdminController = require("./controller/AdminController");
const router = Router();

//untuk cek database admin
router.get("/cek", AdminController.Cek);

//untuk Register
router.post("/RegisterAdmin", AdminController.Register);

//untuk Login
router.post("/LoginAdmin", AdminController.Login);

module.exports = router;