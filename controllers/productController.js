import Product from "../models/Product.js";
import fs from 'fs';
import slugify from "slugify";

const createProductController = async (req, res, next) => {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    //validations
    switch (true) {
        case !name:
            return res.status(400).send({ success: false, error: 'Name is required!' });
        case !description:
            return res.status(400).send({ success: false, error: 'Description is required!' });
        case !price:
            return res.status(400).send({ success: false, error: 'Price is required!' });
        case !quantity:
            return res.status(400).send({ success: false, error: 'Quantity is required!' });
        case photo && photo.size > 1000000000:
            return res.status(400).send({ success: false, error: 'Photo is required!' });
    }
    try {
        const products = new Product({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        } await products.save();
        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            products,
        })
    } catch (error) {
        next(error);
    }
}

const getProductController = async (req, res, next) => {
    try {
        const products = await Product.find({}).populate('category').select('-photo').limit(12).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: 'All Products',
            products,
        });
    } catch (error) {
        next(error);
    }
}

const getSingleProductController = async (req, res, next) => {
    const slug = req.params.slug;
    try {
        const product = await Product.findOne({ slug }).populate('category').select('-photo').limit(12).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: 'Single Product',
            product,
        });
    } catch (error) {
        next(error);
    }
}

const productPhotoController = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.pid).select('photo');
        if (product.photo.data) {
            res.set('Content-Type', product.photo.contentType);
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        next(error);
    }
}

const updateProductController = async (req, res, next) => {
    try {
        const { name, description, slug, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        //validations
        switch (true) {
            case !name:
                return res.status(400).send({ error: 'Name is required!' });
            case !description:
                return res.status(400).send({ error: 'Description is required!' });
            case !price:
                return res.status(400).send({ error: 'Price is required!' });
            case !quantity:
                return res.status(400).send({ error: 'Quantity is required!' });
            case photo && photo.size > 100000000:
                return res.status(400).send({ error: 'Photo is required and should be less than 1MB!' });
        }
        const products = await Product.findByIdAndUpdate(req.params.pid,
            {
                ...req.fields, slug: slugify(name)
            }, { new: true });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product updated successfully',
            products,
        })
    } catch (error) {
        next(error);
    }
}


const deleteProductController = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id).select('-photo');
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully',
        })
    } catch (error) {
        next(error);
    }
}
        
//product count
const productCountController = async (req, res) => {
    try {
        const total=await Product.find({}).estimatedDocumentCount();
        res.status(200).json({
            success:true,
            total,
        });
    } catch (error) {
        next(error);
    }
}

const productListController = async (req, res) => {
    try {
        const perPage=2;
        const page=req.params.page?req.params.page:1;
        const products=await Product.find({}).select('-photo').skip((page-1)*perPage).limit(perPage).sort({createdAt:-1});
        res.status(200).json({
            success:true,
            products,
        });
    } catch (error) {
        next(error);
    }
}

export { createProductController, getProductController, getSingleProductController, productPhotoController, updateProductController, deleteProductController, productCountController,productListController };