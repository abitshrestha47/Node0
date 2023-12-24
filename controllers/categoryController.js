import slugify from "slugify";
import { Category } from "../models/Category.js";

const createCategoryController=async(req,res)=>{
    try {
        const {name}=req.body;
        if(!name){
            return res.status(400).json({success:false,error:'Name field is required'});
        }
        const slug=slugify(name);
        const existingCategory=await Category.findOne({slug});
        if(existingCategory){
            return res.status(409).json({success:false,error:'Category already exists'});
        }   
        const category=await new Category({name,slug:slugify(name)}).save();
        res.status(201).json({success:true,message:'Category added successfully.',category});
    } catch (error) {   
        next(error);
    }
}

const updateCategoryController=async(req,res)=>{
    try {
        const {name}=req.body;
        const category=await Category.findByIdAndUpdate(req.params.id,{name,slug:slugify(name)},{new:true});
        res.status(200).json({
            success:true,
            message:'Category Updated Successfully',
            category
        })
    } catch (error) {
        next(error);
    }
}

const categoryController=async(req,res,next)=>{
    try {
        const category=await Category.find({});
        res.status(200).json({
            success:true,
            message:'All category lists',
            category,
        });
    } catch (error) {
        next(error);
    }
}

const singleCategoryController=async(req,res)=>{
    try {
        const category=await Category.findOne({slug:req.params.slug});
        res.status(200).json({
            success:true,
            message:'Single Category',
            category,
        });
    } catch (error) {
        next(error);
    }
}

const deleteCategoryController=async(req,res)=>{
    try {
        const category=await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:'Deleted Category Successfully',
            category
        });
    } catch (error) {
        next(error);
    }
}

export {createCategoryController,updateCategoryController,categoryController,singleCategoryController,deleteCategoryController};