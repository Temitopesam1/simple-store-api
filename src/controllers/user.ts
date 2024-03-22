import { Request, Response } from 'express';
import User, { IUser } from '../models/user';

class Users {
    createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { body } = req;
            const user: IUser = new User(body);
            await user.generateAuthToken();
            const token = await user.generateAuthToken();
            res.status(201).json({ token });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    getUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req;
            const user = await User.findById(id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req;
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req;
            const { body } = req;
            const user = await User.findByIdAndUpdate(id, body, { new: true });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ message: error });
        }
    }

    loginUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            
            // Find the user by credentials
            const user = await User.findByCredentials(email, password);
    
            // Check if user exists
            if (!user) {
                res.status(400).json({ message: 'Invalid email or password' });
                return;
            }
    
            // Generate authentication token
            const token = await user.generateAuthToken();
    
            // Respond with the token
            res.status(200).json({ token });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    

    logoutUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req;
            await User.findByIdAndUpdate(id, { tokens: [] });
            res.status(200).send("User Logged Out!");
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default Users;
