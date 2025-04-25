const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = "public/files";

// Vérifie si le dossier existe, sinon le créer
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const fileExtension = path.extname(originalName);
    const baseName = path.basename(originalName, fileExtension);
    let fileName = originalName;
    let index = 1;

    // Ajouter un suffixe si un fichier avec le même nom existe
    while (fs.existsSync(path.join(uploadPath, fileName))) {
      fileName = `${baseName}_${index}${fileExtension}`;
      index++;
    }

    cb(null, fileName);
  }
});

const uploadfile = multer({ storage });
module.exports = uploadfile;
