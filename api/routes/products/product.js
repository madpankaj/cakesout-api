const mongoose = require('../../db/mongoose');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../../models/products/product');
const ProductAttribute = require('../../models/products/product-attribute');
const ProductAttributeValue = require('../../models/products/product-attribute-value');
const ProductCategory = require('../../models/products/product-category');

const storage = multer.diskStorage({
    destination:function(req, file ,cb){
        cb(null, './uploads/products/')
    },
    filename:function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname);
    },
    fileFilter: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
             req.fileValidationError = "Forbidden extension";
             return cb(null, false, req.fileValidationError);
       }
       cb(null, true);
   }
})

const upload = multer({storage:storage});

router.post('/product', upload.single('productImage'),(req,res,next)=>{
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        productImage : req.file.filename,
        productData: req.body.productData
    })

    product.save()
    .then(doc=>{
        res.status(201).send({
            error:false,
            successMsg:'Product Added Successfully'
        })
    })
    .catch(e=>{
        res.status(501).send({
            error:true,
            errorMsg:'Error While adding Product'
        })
    })
    
});


/**
 * 
 * Product Attributes Section 
 * Creating Product Attributes
 * 
 */

 router.post('/add-product-attribute',(req, res, next)=>{
     const productAttribute = new ProductAttribute({
         name: req.body.name,
         type: req.body.type
     })

     productAttribute.save()
     .then(doc=>{
         res.status(201).send({
             error:false,
             successMsg:'Attribute added'
         })
     })
     .catch(e=>{
         res.status(501).send({
             error:true,
             errorMsg:'Error during attribute save',
             errorData:e
         })
     })
 })

 /**
  * 
  * Product Attribute Value
  * Saving Attribute Value
  * 
  */

  router.post('/add-attribute-value',(req, res, next)=>{
    const productAttributeValue  = new ProductAttributeValue({
        attribute_id : req.body.attribute_id,
        value: req.body.value
    })

    productAttributeValue.save()
    .then(doc=>{
        res.status(201).send({
            error:false,
            successMsg:'Attribute Value Saved',
            data:doc
        })
    })
    .catch(e=>{
        res.status(501).send({
            error:true,
            errorMsg:'Failed to save attribute value',
            errorData:e
        })
    })
  })



/**
 * 
 * Product Category Section
 * 
 */
  router.post('/add-category',upload.single('categoryImage') ,(req, res, next)=>{
   
    //const 
    if(req.file){
        var contObj = {
            name: req.body.name,
            description: req.body.description,
            categoryImage: req.file.filename
        }
    }
   
    
    if(!req.file){
        var contObj = {
            name: req.body.name,
            description: req.body.description,
        }
    }
   
    


    const productCategory = new ProductCategory(contObj)
      productCategory.save()
      .then(doc=>{
          res.status(201).send({
              error:false,
              successMsg:'Category added',
              data:doc
          })
      })
      .catch(e=>{
          res.status(501).send({
              error:true,
              errorMsg:'Failed to add category',
              errorData:e
          })
      })
  })

  /**
   * 
   * get all Categorties
   * 
   */

  router.get('/get-categories',(req, res, next)=>{
      ProductCategory.find()
      .exec()
      .then(doc=>{
            res.status(200) .send({
                error:false,
                data:doc
            })
        })
  })

  /**
   * 
   * Get Category by Id
   * 
   */
  router.get('/get-category/:id',(req, res, next)=>{
      
    ProductCategory.findById(req.params.id)
    .exec()
    .then(doc=>{
        res.status(200).send({
            error:false,
            data:doc
        })
    })
    .catch(e=>{
        res.status(501).send({
            error:true,
            errorMsg:'Failed to load category',
            errorData:e
        })
    })

  })


  /***
   * 
   * Update Category
   * 
   */

//   router.post('/update-category/:id',upload.single('categoryImage'),(req, res, next)=>{
//     console.log(req.params.id)
//     const catId = req.params.id;
//     ProductCategory.findById(catId)

//     ProductCategory.findById(userId, function (err, category) {
//         if (err) {
//             res.status(501).send({
//                 error:true,
//                 errorMsg:'could not found category',
//                 errorData:err
//             })
//         }

//         if(req.body.name)
//         category.set({ name: req.body.name  });

//         if(req.file !== undefined)
//         category.set({ categoryImage: req.file.filename  });

//         if(req.body.description)
//         category.set({ description: req.body.description  });

//         category.save(function (err, updatedCategory) {
//             if (err) return handleError(err);
//             res.send({
//                 error:false,
//                 successMsg:'Category updated',
//                 data:updatedCategory
//             });
//         });
//     })
// })

   module.exports = router;
