const { mongoose } = require('../../db/mongoose');
const express = require('express');
const router = express.Router();
const User = require('../../models/user/user');
const UserAddress = require('../../models/user/userAddress');

const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req, file ,cb){
        cb(null, './uploads/profiles/')
    },
    filename:function(req, file, cb){
        console.log(req.file)
        cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
    }
});

const upload = multer({storage:storage});


/** User Register  **/
router.post('/signup',(req,res,next)=>{

    User.find({email:req.body.email})
    .exec()
    .then(userData=>{
        if(userData.length > 0){
            res.status(500).send({
                error:true,
                errorMsg:'This Email already Registered',
                data:userData
            })
        }else{
            const user = new User({
                username:req.body.username,
                name: req.body.name,
                mobile_no:req.body.mobile_no,
                password: req.body.password,
                email: req.body.email,
                gender: req.body.gender
            })
            user.save().then((data)=>{
                res.status(201).send({
                    error: false,
                    user:data,
                    successMsg:'Registered successfully'
                })
            })
            .catch((e)=>{
                console.log('Error '+ e)
                res.status(500).send({
                    error:true,
                    errorMsg: e
                })
            })
           
        }
    })
})

/* User Login */
router.post('/login',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(data=>{
        if(data.length > 0){
            //console.log(data[0].email)
            if(req.body.email == data[0].email && req.body.password == data[0].password){
                res.status(200).send({
                    error:false,
                    userData:data,
                    successMsg:'login successfully'
                })
            }
          else{
                res.status(501).send({
                    error:true,
                    errorMsg: 'Please try again, email or password mismatched'
                })
            }
        }else{
            res.status(501).send({
                error:true,
                errorMsg: 'Email id not registered'
            })
        }
    })
    .catch(e=>{
        res.status(501).send({
            error:true,
            errorMsg: e
        })
    })
})


/**
 * User Profile
 */

 router.post('/update-profile/:user_id', upload.single('profilePic'),(req, res, next)=>{
    const userId = req.params.user_id;
    User.findById(userId, function (err, user) {
        if (err) return handleError(err);
        
        if(req.body.name)
        user.set({ name: req.body.name  });
        
        if(req.body.mobile_no)
        user.set({ mobile_no:req.body.mobile_no  });

        if(req.body.gender)
        user.set({ gender: req.body.gender  });

        if(req.file !== undefined)
        user.set({ profilePic: req.file.filename });

        user.save(function (err, updatedUser) {
            if (err) return handleError(err);
            res.send(updatedUser);
        });
    });



 });


 /**
  * Add User Address
  */
 router.post('/user-address',(req,res, next)=>{
     const userAddress = new UserAddress({
         user_id:req.body.user_id,
         city:req.body.city,
         state:req.body.state,
         address:req.body.address,
         addressType:req.body.addressType,
         isDefault:req.body.isDefault,
     });

     userAddress.save()
     .then(doc=>{
         res.status(201).send({
             error:false,
             successMsg:'Address added successfully'
         })
     })
     .catch(e=>{
         console.log('Error While adding Address' + e )
         res.status(501).send({
            error:true,
            errorMsg:e
        })
     })
 })


 /**
  * Get User Address
  */
 router.post('/get-user-address',(req,res, next)=>{
    
    UserAddress.find({user_id:req.body.user_id})
    .exec()
    .then(doc=>{
        if(doc.length > 0){
            res.status(200).send({
                error:false,
                userAddresses:doc
            })
        }
        else{
            res.status(501).send({
                error:true,
                errorMsg:'Address not added for this user'
            })
        }
    })
    .catch(e=>{
        console.log('Error While fetching Address' + e )
        res.status(501).send({
           error:true,
           errorMsg:e
       })
    })
})

module.exports = router 