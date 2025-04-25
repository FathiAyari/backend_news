// const pdfModel = require("../models/pdfSchema");
// const chapitreModel = require("../models/chapitreSchema");

// module.exports.uploadPdf = async (req, res) => {
//   try {
//     const { titre, chapitreId } = req.body;
//     if (!req.file) {
//       throw new Error("Aucun fichier fourni");
//     }

//     const chapitre = await chapitreModel.findById(chapitreId);
//     if (!chapitre) {
//       throw new Error("Chapitre introuvable");
//     }

//     const newPdf = await pdfModel.create({
//       titre,
//       fichier: req.file.path,
//       chapitre: chapitreId
//     });

//     res.status(201).json(newPdf);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports.getPdfsByChapitre = async (req, res) => {
//   try {
//     const { chapitreId } = req.params;
//     const pdfs = await pdfModel.find({ chapitre: chapitreId });

//     if (!pdfs.length) {
//       throw new Error("Aucun PDF trouvé pour ce chapitre");
//     }

//     res.status(200).json(pdfs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };