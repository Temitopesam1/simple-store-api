import express, { Request, Response } from 'express';
import Products from '../controllers/product';

const router = express.Router();

const productController = new Products();

router.post('/create', async (req: Request, res: Response) => {
  return await productController.createProduct(req, res);
});
router.get('/all', async (req: Request, res: Response) => {
  await productController.getProducts(req, res);
});
router.get('/:name', async (req: Request, res: Response) => {
  await productController.getProduct(req, res);
});
router.put('/update/:name', async (req: Request, res: Response) => {
  await productController.updateProduct(req, res);
});
router.delete('/delete/:name', async (req: Request, res: Response) => {
  await productController.deleteProduct(req, res);
});


export default router;
