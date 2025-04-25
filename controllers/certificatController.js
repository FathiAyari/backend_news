const userModel = require('../models/userSchema');
const quizModel = require('../models/quizSchema');
const certificatModel = require('../models/certificatSchema');

  module.exports.getAllCertificats = async (req, res) => {
    try {
      const certificatList = await certificatModel.find();
  
      if (!certificatList || certificatList.length === 0) {
        throw new Error("Aucun certificat trouvé");
      }
      res.status(200).json(certificatList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



   module.exports.getCertificatById = async (req, res) => {
     try {
         const id = req.params.id;
         const certificat = await certificatModel.findById(id);
  
       if (!certificat || certificat.length === 0) {
         throw new Error(" certificat introuvable");
       }
       res.status(200).json(certificat);
     } catch (error) {
       res.status(500).json({ message: error.message });
     }
  };


  module.exports.deleteCertificatById = async (req, res) => {
    try {
       const id = req.params.id;
  
       const certificatById = await certificatModel.findById(id);
  
       if (!certificatById || certificatById.length === 0) {
        throw new Error("certificat introuvable");
       }
  
    //    await chapitreModel.updateMany({owners : id},{
    //     $unset: { owners: 1 },// null "" 
    //   });

       await certificatModel.updateMany({}, {
           $pull: { certificats: id },
         });
  
      await certificatModel.findByIdAndDelete(id);
  
       res.status(200).json("deleted");
     } catch (error) {
      res.status(500).json({ message: error.message });
    }
   };   

  

  module.exports.addCertificat = async (req, res) => {
     try {
       const { titre_certif,username, id_quiz,dateObtention } = req.body;
       if (!titre_certif & !username & !id_quiz & !dateObtention) {
         throw new Error("errue data");
      }
  
       const certificat = await certificatModel.create({
        titre_certif,
        username,
        id_quiz,
        dateObtention
       });
  
       res.status(200).json({ certificat });
     } catch (error) {
       res.status(500).json({ message: error.message });
     }
  };

  


   module.exports.updateCertificat = async (req, res) => {
     try {
       const id = req.params.id;
      const { titre_certif,username, id_quiz,dateObtention }  = req.body;
  
       const certificatById = await certificatModel.findById(id);
  
      if (!certificatById) {
         throw new Error("certificat introuvable");
       }
  
       if (!titre_certif & !username & !d_quiz) {
        throw new Error("errue data");
       }
  
       await certificatModel.findByIdAndUpdate(id, {
         $set: { titre_certif,username, id_quiz,dateObtention },
       });
  
       const updated = await certificatModel.findById(id);
  
       res.status(200).json({ updated });
     } catch (error) {
      res.status(500).json({ message: error.message });
    }
   };



  module.exports.affect = async (req, res) => {
     try {
         const { userId, certificatId } = req.body;

         const certificatById = await certificatModel.findById(certificatId);

        if (!certificatById) {
             throw new Error("certificat introuvable");
        }

         const checkIfUserExists = await userModel.findById(userId);
         if (!checkIfUserExists) {
             throw new Error("User not found");
         }

         // Ajouter userId dans user[] dans certificat
         await certificatModel.findByIdAndUpdate(certificatId, {
          $set: { user: userId },
         });

         // Ajouter certificatId dans certificats[] dans user
         await userModel.findByIdAndUpdate(userId, {
             $push: { certificats: certificatId },
         });

         res.status(200).json("affected");
     } catch (error) {
         res.status(500).json({ message: error.message });
     }
 };

 module.exports.desaffect = async (req, res) => {
    try {
         const { userId, certificatId } = req.body;

         const certificatById = await certificatModel.findById(certificatId);
         if (!certificatById) {
            throw new Error("certificat introuvable");
        }

         const checkIfUserExists = await userModel.findById(userId);
        if (!checkIfUserExists) {
             throw new Error("User not found");
        }

         // Supprimer userId de owners[] dans certificat
         await certificatModel.findByIdAndUpdate(certificatId, {
           $unset: { owners: 1 },//null
         });

         // Supprimer certificatId de certificats[] dans user
         await userModel.findByIdAndUpdate(userId, {
             $pull: { certificats: certificatId },
         });

        res.status(200).json("desaffected");
     } catch (error) {
         res.status(500).json({ message: error.message });
   }
};
