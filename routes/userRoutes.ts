import express, { Request, Response } from 'express';
import Users from '../controllers/user';
import { authenticateToken } from '../middlewares/auth';
const router = express.Router();

const userController = new Users();

router.post('/signUp', async (req: Request, res: Response) => {
    await userController.createUser(req, res);
});
router.post('/login', async (req: Request, res: Response) => {
    await userController.loginUser(req, res);
});
router.get('/logout', authenticateToken, async (req: Request, res: Response) => {
    await userController.logoutUser(req, res);
});
router.get('/', authenticateToken, async (req: Request, res: Response) => {
    await userController.getUser(req, res);
});
router.post('/update', authenticateToken, async (req: Request, res: Response) => {
    await userController.updateUser(req, res);
});
router.post('/delete', authenticateToken, async (req: Request, res: Response) => {
    await userController.deleteUser(req, res);
});

export default router;