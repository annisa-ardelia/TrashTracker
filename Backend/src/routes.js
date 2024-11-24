const { Router } = require("express");
const AdminController = require("./controller/AdminController");
const TrashController = require("./controller/TrashController");
const TrashController = require("./controller/SensorController");
const router = Router();

//untuk cek database admin
router.get("/cek", AdminController.Cek);

//untuk Register
router.post("/RegisterAdmin", AdminController.Register);

//untuk Login
router.post("/LoginAdmin", AdminController.Login);

// untuk menambahkan tempat sampah
router.post("/AddTempatSampah", TrashController.addTempatSampah);

// untuk menghapus tempat sampah
router.delete("/DeleteTempatSampah/:id", TrashController.deleteTempatSampah);

// untuk mengedit tempat sampah
router.put("/EditTempatSampah/:id", TrashController.editTempatSampah);

// untuk menagmbil data tempat sampah
router.get("/TempatSampah", TrashController.getTempatSampah);

//untuk mengambil data sambah
router.get("/JumlahSampah/:id", TrashController.getTrashData);

//untuk mengambil data sampah harian
router.get("/DailySampah/:id", TrashController.getDailyTrashData);

// untuk menambahkan data sampah
router.post("/AddSampah", TrashController.addDataSampah);

// Route to fetch all sensor data
router.get('/AllSensorData', GetAllSensors);

// Route to fetch the latest sensor data
router.get('/LatestSensorData', GetLatestSensor);

module.exports = router;