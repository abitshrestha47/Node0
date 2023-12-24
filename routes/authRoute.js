import express from 'express';
import { loginController, signupController } from '../controllers/authController.js';
import { isAdmin, requiresSignIn } from '../middleware/authMiddleware.js';

const router=express.Router();

router.post('/signup',signupController);
router.post('/login',loginController);

//private route for user
router.get('/user-auth',requiresSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})

//private route for admin
router.get('/admin-auth',requiresSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

export default router;