// const express = require("express");
// const router = express.Router();
// const pdfController = require("../controllers/pdfController");
// const uploadfile = require("../middlewares/uploadFile");
// const { requireAuthUser } = require("../midlewares/authMiddleware");


// // Route pour upload de PDF
// router.post("/uploadPdf", uploadfile.single("pdf"), pdfController.uploadPdf);

// // Route pour récupérer les PDF par chapitre
// router.get("/getPdfsByChapitre/:chapitreId", requireAuthUser, pdfController.getPdfsByChapitre);

// module.exports = router;
