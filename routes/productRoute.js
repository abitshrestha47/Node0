import express from 'express';
import { createProductController,deleteProductController,getProductController, getSingleProductController, productPhotoController, updateProductController,productCountController, productListController } from '../controllers/productController.js';
import { requiresSignIn,isAdmin } from '../middleware/authMiddleware.js';
import formidable from 'express-formidable';

const router=express.Router();

router.post('/products',requiresSignIn,isAdmin,formidable(),createProductController);

router.get('/products',getProductController);
router.get('/products/:slug',getSingleProductController);
router.get('/products/image/:pid',productPhotoController);
router.put('/products/:pid',requiresSignIn,isAdmin,formidable(),updateProductController);
router.delete('/products/:id',requiresSignIn,isAdmin,deleteProductController);
//product count
router.get('/product-count',productCountController);

//products list->to show only few products initially 
router.get('/product-list/:page',productListController);

export default router;