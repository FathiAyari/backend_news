const formationModel = require('../models/formationSchema');
const chapitreModel = require('../models/chapitreSchema');

  module.exports.getAllChapitre = async (req, res) => {
   try {
     const chapitreList = await chapitreModel.find();
 
       if (!chapitreList || chapitreList.length === 0) {
       throw new Error("Aucun chapitre trouvé");
       }
 
       res.status(200).json(chapitreList);
     } catch (error) {
      res.status(500).json({ message: error.message });
     }
  };



   module.exports.getChapitreById = async (req, res) => {
     try {
         const id = req.params.id;
         const chapitre  = await chapitreModel.findById(id).populate("owners");// .populate ();ken nhb naamel statistique chkoun aakther aabd yaamlo l formation hethika 

 
      if (!chapitre || chapitre.length === 0) {
        throw new Error(" chapitre introuvable");
       }
       res.status(200).json(chapitre);
    } catch (error) {
       res.status(500).json({ message: error.message });
     }
  };


  module.exports.deleteChapitreById = async (req, res) => {
    try {
       const id = req.params.id;
 
       const chapitreById = await chapitreModel.findById(id);
 
       if (!chapitreById || chapitreById.length === 0) {
        throw new Error("chapitre introuvable");
      }
 
       
       await chapitreModel.updateMany({}, {
           $pull: { chapitres: id },
         });
 
      await chapitreModel.findByIdAndDelete(id);
 
      res.status(200).json("deleted");
     } catch (error) {
      res.status(500).json({ message: error.message });
    }
   };   



  module.exports.addChapitre = async (req, res) => {
     try {
       const {  id_ch,titre_ch,id_f } = req.body;
      if (!id_ch & !titre_ch & !id_f) {
         throw new Error("errue data");
      }
 
       const chapitre = await chapitreModel.create({
           id_ch,
           titre_ch,
           id_f 
       });
 
       res.status(200).json({ chapitre });
     } catch (error) {
       res.status(500).json({ message: error.message });
     }
  };

 


   module.exports.updateChapitre = async (req, res) => {
     try {
       const id = req.params.id;
      const {  id_ch,titre_ch,id_f } = req.body;
 
       const chapitreById = await chapitreModel.findById(id);
 
      if (!chapitreById) {
        throw new Error("chapitre introuvable");
       }
 
       if (!id_ch & !titre_ch & !id_f ) {
        throw new Error("errue data");
       }
 
       await chapitreModel.findByIdAndUpdate(id, {
         $set: {  id_ch,titre_ch,id_f },
      });
 
       const updated = await chapitreModel.findById(id);
 
       res.status(200).json({ updated });
     } catch (error) {
      res.status(500).json({ message: error.message });
    }
   };



  module.exports.affect = async (req, res) => {
     try {
         const { formationId, chapitreId } = req.body;

         const chapitreById = await chapitreModel.findById(chapitreId);

       if (!chapitreById) {
            throw new Error("chapitre introuvable");
        }

         const checkIfUserExists = await formationModel.findById(formationId);
         if (!checkIfUserExists) {
             throw new Error("formation not found");
         }

         // Ajouter formationId dans owners[] dans chapitre
         await chapitreModel.findByIdAndUpdate(chapitreId, {
          $set: { owners: formationId },
         });

         // Ajouter chapitreId dans chapitre[] dans formation
         await formationModel.findByIdAndUpdate(formationId, {
            $push: { chapitres: chapitreId },
         });

         res.status(200).json("affected");
     } catch (error) {
         res.status(500).json({ message: error.message });
     }
 };

 module.exports.desaffect = async (req, res) => {
    try {
         const { formationId, chapitreId } = req.body;

         const chapitreById = await chapitreModel.findById(chapitreId);
         if (!chapitreById) {
            throw new Error("chapitre introuvable");
        }

         const checkIfUserExists = await formationModel.findById(formationId);
        if (!checkIfUserExists) {
             throw new Error("formation not found");
        }

         // Supprimer formationId de owners[] dans chapitre
         await chapitreModel.findByIdAndUpdate(chapitreId, {
           $unset: { owners: 1 },//null
         });

         // Supprimer chapitreId de chapitres[] dans user
        await formationModel.findByIdAndUpdate(formationId, {
             $pull: { chapitres: chapitreId },
        });

        res.status(200).json("desaffected");
     } catch (error) {
         res.status(500).json({ message: error.message });
   }
};