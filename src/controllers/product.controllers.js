import { where } from "sequelize";
import Product from "../models/product.model.js";

export const getAllProduct = async (req, res) => {
    try {
        const product = await Product.findAll();
        res.status(200).json({
            "success": true,
            "message": "berhasil mendapatkan data",
            "data": product
        })
    } catch (error) {
        console.error(error.message)        
        res.status(400).json({
            "success": false,
            "message": "gagal mendapatkan data",
            "error": error.message
        })
    }
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk( id );
        res.status(200).json({
            "success": true,
            "message": "berhasil mendapatkan data",
            "data": product
        })
    } catch (error) {
        console.error(error.message)        
        res.status(400).json({
            "success": false,
            "message": "gagal mendapatkan data",
            "error": error.message
        });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { 
                productName,
                category,
                size,
                colors,
                price
         } = req.body;

         const product = await Product.create({
            productName: productName,
            category: category,
            size: size,
            colors: colors,
            price: price
         });
         res.status(200).json({
            "success": true,
            "message": "berhasil membuat product",
            "data": product
        });
    } catch (error) {
        console.error(error.message)        
        res.status(400).json({
            "success": false,
            "message": "gagal membuat product",
            "error": error.message
        })
    }
}

export const updateProduct= async (req, res) => {
    try {
        const { 
                productName,
                category,
                size,
                colors,
                price
         } = req.body;
         const { id } = req.params;
         
         await Product.update({
            productName: productName,
            category: category,
            size: size,
            colors: colors,
            price: price
         }, {where: {id} });

         const updateproduct = await Product.findByPk(id);
        
         res.status(200).json({
            "success": true,
            "message": "berhasil mengupdate product",
            "data": updateproduct
        });
    } catch (error) {
        console.error(error.message)        
        res.status(400).json({
            "success": false,
            "message": "gagal mengupdate product",
            "error": error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.destroy({ where: {id} });
        const products = await Product.findByPk(id);

         res.status(200).json({
            "success": true,
            "message": "berhasil delete product",
            "data": products
        });
    } catch (error) {
        console.error(error.message)        
        res.status(400).json({
            "success": false,
            "message": "gagal delete product",
            "error": error.message
        })
    }
}