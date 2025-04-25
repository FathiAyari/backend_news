const userModel = require('../models/userSchema');
const alerteModel = require('../models/alerteSchema');
const formationModel = require("../models/formationSchema");

  module.exports.getAllAlertes = async (req, res) => {
    try {
      const alerteList = await alerteModel.find();
  
      if (!alerteList || alerteList.length === 0) {
        throw new Error("Aucun alerte trouvé");
      }
  
      res.status(200).json(alerteList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



   module.exports.getAlerteByDep = async (req, res) => {
     try {
         const departement = req.params.departement;
         const alerte = await alerteModel.find({ departement: departement});

  
       if (!alerte || alerte.length === 0) {
         throw new Error(" alerte introuvable");
       }
       res.status(200).json(alerte);
     } catch (error) {
       res.status(201).json({ message: error.message });
     }
  };


  module.exports.deleteAlerteById = async (req, res) => {
    try {
       const id = req.params.id;
  
       const alerteById = await alerteModel.findById(id);
  
       if (!alerteById || alerteById.length === 0) {
        throw new Error("alerte introuvable");
       }
  
        
       await alerteModel.updateMany({}, {
           $pull: { alertes: id },
         });
  
      await alerteModel.findByIdAndDelete(id);
  
       res.status(200).json("deleted");
     } catch (error) {
      res.status(500).json({ message: error.message });
    }
   };   



  module.exports.addAlerte = async (req, res) => {
     try {
       const {  message,departement, } = req.body;

  
       const alerte= await alerteModel.create({
        message,
        departement,

       });
  
       res.status(200).json({ alerte });
     } catch (error) {
       res.status(500).json({ message: error.message });
     }
  };

  


   module.exports.updateAlerte = async (req, res) => {
     try {
       const id = req.params.id;
      const {  message,createdAt,vue } = req.body;
  
       const alerteById = await alerteModel.findById(id);
  
      if (!alerteById) {
         throw new Error("alerte introuvable");
       }
  
       if (!message & !createdAt & !vue ) {
        throw new Error("errue data");
       }
  
       await alerteModel.findByIdAndUpdate(id, {
         $set: {  message,vue },
       });
  
       const updated = await alerteModel.findById(id);
  
       res.status(200).json({ updated });
     } catch (error) {
      res.status(500).json({ message: error.message });
    }
   };



  module.exports.affect = async (req, res) => {
     try {
         const { userId, alerteId } = req.body;

         const alerteById = await alerteModel.findById(alerteId);

        if (!alerteById) {
             throw new Error("alerte introuvable");
        }

         const checkIfUserExists = await userModel.findById(userId);
         if (!checkIfUserExists) {
             throw new Error("User not found");
         }

         // Ajouter userId dans owners[] dans alerte
         await alerteModel.findByIdAndUpdate(alerteId, {
          $set: { owners: userId },
         });

         // Ajouter alerteId dans alerte[] dans user
         await userModel.findByIdAndUpdate(userId, {
             $push: { alertes: alerteId },
         });

         res.status(200).json("affected");
     } catch (error) {
         res.status(500).json({ message: error.message });
     }
 };

 module.exports.desaffect = async (req, res) => {
    try {
         const { userId, alerteId } = req.body;

         const alerteById = await alerteModel.findById(alerteId);
         if (!alerteById) {
            throw new Error("alerte introuvable");
        }

         const checkIfUserExists = await userModel.findById(userId);
        if (!checkIfUserExists) {
             throw new Error("User not found");
        }

         // Supprimer userId de owners[] dans alerte
         await alerteModel.findByIdAndUpdate(alerteId, {
           $unset: { owners: 1 },//null
         });

         // Supprimer alerteId de alertes[] dans user
         await userModel.findByIdAndUpdate(userId, {
             $pull: { alertes: alerteId },
         });

        res.status(200).json("desaffected");
     } catch (error) {
         res.status(500).json({ message: error.message });
   }
};
