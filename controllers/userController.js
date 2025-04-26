const userModel = require('../models/userSchema');
const formationModel = require('../models/formationSchema');
const alerteModel = require('../models/alerteSchema');
const notifModel = require('../models/notifSchema');

const jwt = require ('jsonwebtoken');
const maxTime = 24 *60 * 60 //24H
const bcrypt = require('bcrypt');


// crud user 
module.exports.addUserEmployeur = async (req,res) => {
    try {
        const {username , email , password , age,department} = req.body;
        const roleEmployeur ='employeur'
        
        const user = await userModel.create({
            username,
            email,
            password,
            role:roleEmployeur,
            age,
            department
        })
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};




// crud d'admin
module.exports.addUserAdmin= async (req,res) => {
    try {
        const {username , email , password}  = req.body;
        const roleAdmin = 'admin'
        const user = await userModel.create({
            username,email ,password,role :roleAdmin
        })
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};



module.exports.getAllUsers= async (req,res) => {
    try {
        const userListe = await userModel.find() 
        res.status(200).json({userListe});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};



module.exports.getUserById= async (req,res) => {
    try {
        //const id = req.params.id
        const {id}=req.params
       // console.log(req.params)
        const user = await userModel.findById(id) 
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
// l'utulisateur aando barsha formationnet bch yemchy yifasakh wahda mou3ayna mech l kol 

module.exports.deleteUserById= async (req,res) => {
    try {
        const {id} = req.params

        const checkIfUserExists = await userModel.findById(id);
        if (!checkIfUserExists) {
          throw new Error("User not found");
        }
        await inscritModel.updateMany({user : id},{
            $unset: { user: 1 },// null "" 
          });

         await notifModel.updateMany({user : id},{
             $unset: { user: 1 },// null "" 
           });
        await articleModel.updateMany({owners : id},{
            $unset: { owners: 1 },// null "" 
          });

        await alerteModel.updateMany({owners : id},{
            $unset: { owners: 1 },// null "" 
          });

        await formationModel.updateMany({owners : id},{
            $unset: { owners: 1 },// null "" 
          });

        await userModel.findByIdAndDelete(id)

        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


    module.exports.searchUserByUsername = async (req, res) => {
        try {
    
            const { username } = req.query
            if(!username){
                throw new Error("Veuillez fournir un nom pour la recherche.");
            }
    
            const userListe = await userModel.find({
                username: {$regex: username , $options: "i"}
            })
    
            if (!userListe) {
                throw new Error("User not found");
              }
              const count = userListe.length
            res.status(200).json({userListe,count})
        } catch (error) {
            res.status(500).json({message: error.message});
        }
        };


        //trii
        module.exports.getAllUsersSortByAge= async (req,res) => {
            try {
                //men sghyr l kbir
                const userListe = await userModel.find().sort({age : 1}).limit(2)//l 5 lwelaa hethika pts limit
                //men kbir l sghyr
                //const userListe = await userModel.find().sort({age : -1})
                res.status(200).json({userListe});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        };


       


        module.exports.getAllEmployeur= async (req,res) => {
            try {
                const userListe = await userModel.find({role : "employeur"})
              
                res.status(200).json({userListe});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        };


        
        //crud stagaire : 

        module.exports.addUserStagaire = async (req, res) => {
            try {
                const { username, email, password, age } = req.body;
                const roleStagaire = 'stagaire';
        
                const user = await userModel.create({
                    username,
                    email,
                    password,
                    role: roleStagaire,
                    age,
                    department
                });
        
                res.status(200).json({ user });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        };

        
        
        module.exports.getAllStagaires = async (req, res) => {
            try {
                const stagaires = await userModel.find({ role: "stagaire" });
                res.status(200).json({ stagaires });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        };

        module.exports.getNotificationsForUser = async (req, res) => {
            try {
              const userId = req.params.userId;
          
              // Vérifier si l'utilisateur existe et qu'il est employé
              const user = await userModel.findById(userId);
              if (!user) {
                return res.status(404).json({ message: "Utilisateur introuvable" });
              }
          
              if (user.role !== 'employe') {
                return res.status(403).json({ message: "Accès refusé. Notifications réservées aux employés." });
              }
          
              // Récupérer les notifications (via alertes) de l'utilisateur
              const alertes = await alerteModel.find({ user: userId }).populate('notif');
          
              res.status(200).json(alertes);
            } catch (error) {
              res.status(500).json({ message: error.message });
            }
          };
          
        
        

        module.exports.signup= async (req,res) => {
            try {
          
                res.cookie("jwt_token_9antra", "", {httpOnly:false,maxAge:1})// 1 meli second
                res.status(200).json("logged")
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        }


// Helper function to create JWT
const createToken = (userId, role) => {
    return jwt.sign(
        { userId, role },               // Payload (what you want to store in the token)
        process.env.JWT_SECRET,         // Secret key (should be stored in .env)
        { expiresIn: '1h' }             // Token expiration time (1 hour)
    );
};

module.exports.SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email });

        // If no user is found with the given email
        if (!user) {
            return res.status(401).json({ status: false, error: "Email not found" });
        }

        // Compare the provided password with the stored (hashed) password
        const auth = await bcrypt.compare(password, user.password);

        // If the password doesn't match
        if (!auth) {
            return res.status(401).json({ status: false, error: "Invalid password" });
        }

        // Create JWT token
        const token = createToken(user._id, user.role);

        // Set the token as a cookie (httpOnly should be true for better security)
        res.cookie("jwt_token_9antra", token, {
            httpOnly: true,            // Ensures the cookie is not accessible via JavaScript
            secure: process.env.NODE_ENV === 'production',  // Use 'secure' cookies in production (only sent over HTTPS)
            maxAge: maxTime * 1000    // Max age in milliseconds
        });

        // Send the response with the token and other user details
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            age: user.age,
            department: user.department,
            token // The generated JWT token


        });

    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

module.exports.SignUp = async (req, res) => {
    try {
        const { username, email, password, age, role, department } = req.body;

        // Create the user without hashing the password
        const user = await userModel.create({
            username,
            email,
            password,  // Store the plain password (not recommended for production)
            role,
            age,
            department
        });

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,  // This should be stored in your .env file
            { expiresIn: '1h' }  // Token expiration time (optional)
        );

        // Send the user and token in the response
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            age: user.age,
            department: user.department,
            token // The generated JWT token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};