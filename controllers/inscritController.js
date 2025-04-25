 const userModel = require('../models/userSchema');
 const formationModel = require('../models/formationSchema');
 const inscritModel = require('../models/inscritSchema');

  module.exports.getAllInscrits = async (req, res) => {
     try {
       const inscritList = await inscritModel.find();
  
      if (!inscritList || inscritList.length === 0) {
         throw new Error("Aucun alerte trouvé");
       }
  
      res.status(200).json(inscritList);
     } catch (error) {
       res.status(500).json({ message: error.message });
     }
   };



    module.exports.getInscritById = async (req, res) => {
      try {
         const id = req.params.id;
          const inscrit = await inscritModel.findById(id);

  
        if (!inscrit || inscrit.length === 0) {
          throw new Error(" inscrit introuvable");
        }
        res.status(200).json(inscrit);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
   };


  module.exports.deleteInscritById = async (req, res) => {
     try {
        const id = req.params.id;
  
        const inscritById = await inscritModel.findById(id);
  
        if (!inscritById || inscritById.length === 0) {
         throw new Error("inscrit introuvable");
        }
  
        
        await inscritModel.updateMany({}, {
            $pull: { inscrits: id },
          });
  
       await inscritModel.findByIdAndDelete(id);
  
        res.status(200).json("deleted");
      } catch (error) {
       res.status(500).json({ message: error.message });
    }
    };   



   module.exports.addInscrit = async (req, res) => {
      try {
        const {  username,id_f,dateInscription } = req.body;
        if (!username & !id_f & !dateInscription ) {
         throw new Error("errue data");
       }
  
        const inscrit= await inscritModel.create({
          username,
          id_f,
        dateInscription,
       });
  
        res.status(200).json({ inscrit });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
   };

  


    module.exports.updateInscrit = async (req, res) => {
      try {
        const id = req.params.id;
       const {  username,id_f,dateInscription } = req.body;
  
        const inscritById = await inscritModel.findById(id);
  
       if (!inscritById) {
          throw new Error("inscrit introuvable");
        }
  
       if (!username & !id_f & !dateInscription ) {
         throw new Error("errue data");
        }
  
        await inscritModel.findByIdAndUpdate(id, {
          $set: {  username,id_f,dateInscription },
        });
  
        const updated = await inscritModel.findById(id);
  
        res.status(200).json({ updated });
      } catch (error) {
       res.status(500).json({ message: error.message });
     }
    };



   module.exports.affect = async (req, res) => {
      try {
          const { userId, inscritId } = req.body;

          const inscritById = await inscritModel.findById(inscritId);

         if (!inscritById) {
              throw new Error("inscrit introuvable");
         }

          const checkIfUserExists = await userModel.findById(userId);
          if (!checkIfUserExists) {
              throw new Error("User not found");
          }

          // Ajouter userId dans user[] dans inscrit
          await inscritModel.findByIdAndUpdate(inscritId, {
           $set: { user: userId },
          });

          // Ajouter inscritId dans inscrit[] dans user
          await userModel.findByIdAndUpdate(userId, {
              $push: { inscrits: inscritId },
          });

          res.status(200).json("affected");
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  };

  module.exports.desaffect = async (req, res) => {
     try {
          const { userId, inscritId } = req.body;

          const inscritById = await inscritModel.findById(inscritId);
          if (!inscritById) {
             throw new Error("inscrit introuvable");
         }

          const checkIfUserExists = await userModel.findById(userId);
         if (!checkIfUserExists) {
              throw new Error("User not found");
         }

          // Supprimer userId de user[] dans inscrit
          await inscritModel.findByIdAndUpdate(inscritId, {
            $unset: { user: 1 },//null
          });

          // Supprimer inscritId de alertes[] dans user
          await userModel.findByIdAndUpdate(userId, {
              $pull: { inscrits: inscritId },
          });

         res.status(200).json("desaffected");
      } catch (error) {
          res.status(500).json({ message: error.message });
    }
 };
