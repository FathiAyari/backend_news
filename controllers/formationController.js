const userModel = require('../models/userSchema');
const formationModel = require('../models/formationSchema');
const multer = require('multer');
const path = require('path');
const Quiz = require("../models/quizSchema");
  module.exports.getAllFormations = async (req, res) => {
    try {
      const formationList = await formationModel.find();
  
      if (!formationList || formationList.length === 0) {
        throw new Error("Aucun formation trouvé");
      }
      res.status(200).json(formationList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports.getFormationByDep = async (req, res) => {
    try {
        const departement = req.params.departement;

        const formationList = await formationModel.find({ departement: departement});

        if (!formationList || formationList.length === 0) {
            throw new Error("Aucun formation trouvé");
        }
        res.status(200).json(formationList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getFormationById = async (req, res) => {
     try {
         const id = req.params.id;
         const formation = await formationModel.findById(id).populate("owners");// .populate ();ken nhb naamel statistique chkoun aakther aabd yaamlo l formation hethika 

  
       if (!formation || formation.length === 0) {
         throw new Error(" formation introuvable");
       }
       res.status(200).json(formation);
     } catch (error) {
       res.status(500).json({ message: error.message });
     }
  };


module.exports.deleteFormationById = async (req, res) => {
    try {
       const id = req.params.id;
  
       const formationById = await formationModel.findById(id);
  
       if (!formationById || formationById.length === 0) {
        throw new Error("formation introuvable");
       }


        await Quiz.deleteMany({ formationId: id });

        await formationModel.findByIdAndDelete(id);
  
       res.status(200).json("deleted");
     } catch (error) {
      res.status(500).json({ message: error.message });
    }
   };

// Set up multer storage configuration (saving files locally to 'uploads' folder)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/pdf/');  // The directory where the images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // Save file with a timestamp to avoid name collisions
    }
});
const upload = multer({ storage: storage });

  module.exports.addFormation = async (req, res) => {
      upload.single('pdf')(req, res, async (err) => {
          if (err) {
              return res.status(500).json({ message: 'File upload failed', error: err.message });
          }

          try {
              const {  titre, contenu, departement } = req.body;

              const pdf = req.file ? `/uploads/pdf/${req.file.filename}` : null; // Store the file path or null if no image is uploaded
              const formation = await formationModel.create({
                  titre,
                  contenu,
                  departement,
                  pdf
              });

              res.status(200).json({ formation });
          } catch (error) {
              res.status(500).json({ message: error.message });
          }
      });

  };

  


module.exports.updateFormation = async (req, res) => {
     try {
       const id = req.params.id;
      const { id_f, titre, contenu, departement } = req.body;
  
       const formationById = await formationModel.findById(id);
  
      if (!formationById) {
         throw new Error("formation introuvable");
       }
  
       if (!id_f & !titre & !contenu & !departement) {
        throw new Error("errue data");
       }
  
       await formationModel.findByIdAndUpdate(id, {
         $set: { id_f, titre, contenu, departement },
       });
  
       const updated = await formationModel.findById(id);
  
       res.status(200).json({ updated });
     } catch (error) {
      res.status(500).json({ message: error.message });
    }
   };



  module.exports.affect = async (req, res) => {
     try {
         const { userId, formationId } = req.body;

         const formationById = await formationModel.findById(formationId);

        if (!formationById) {
             throw new Error("formation introuvable");
        }

         const checkIfUserExists = await userModel.findById(userId);
         if (!checkIfUserExists) {
             throw new Error("User not found");
         }

         // Ajouter userId dans owners[] dans formation
         await formationModel.findByIdAndUpdate(formationId, {
          $set: { owners: userId },
         });

         // Ajouter formationId dans formations[] dans user
         await userModel.findByIdAndUpdate(userId, {
             $push: { formations: formationId },
         });

         res.status(200).json("affected");
     } catch (error) {
         res.status(500).json({ message: error.message });
     }
 };

 module.exports.desaffect = async (req, res) => {
    try {
         const { userId, formationId } = req.body;

         const formationById = await formationModel.findById(formationId);
         if (!formationById) {
            throw new Error("formation introuvable");
        }

         const checkIfUserExists = await userModel.findById(userId);
        if (!checkIfUserExists) {
             throw new Error("User not found");
        }

         // Supprimer userId de owners[] dans formation
         await formationModel.findByIdAndUpdate(formationId, {
           $unset: { owners: 1 },//null
         });

         // Supprimer formationId de formations[] dans user
         await userModel.findByIdAndUpdate(userId, {
             $pull: { formations: formationId },
         });

        res.status(200).json("desaffected");
     } catch (error) {
         res.status(500).json({ message: error.message });
   }
};
