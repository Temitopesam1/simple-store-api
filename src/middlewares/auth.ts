import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';




const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.sendStatus(401).send({ error: 'Token not provided' });
        }

        const decoded: any = jwt.verify(token, JWT_SECRET);

        const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });

        if (!user) {
            return res.status(401).send({ error: 'User not found or token is invalid' });
        }
        req.id = decoded.id;
        next();
    } catch (error) {
        return res.status(401).send({ error: 'Authentication failed' });
    }
};

