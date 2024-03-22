import { Request, Response } from 'express';
import Product, { IProduct } from '../models/product';



class Products {
    createProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, description, price } = req.body;
            const product: IProduct = new Product({ name, description, price, creator: req.user._id });
            await product.save();
            res.status(201).json(product);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    getProducts = async (req: Request, res: Response): Promise<void> => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    getProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name } = req.params;
            const product = await Product.findOne({name});
            res.status(200).json(product);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    deleteProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name } = req.params;
            const product = await Product.findOneAndDelete({name});
            res.status(200).json(product);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    updateProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name } = req.params;
            const { body } = req;
            const product = await Product.findOneAndUpdate({ name }, body, { new: true });
            res.status(200).json(product);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    
}

export default Products;
