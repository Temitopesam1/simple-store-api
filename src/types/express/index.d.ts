import { Types } from 'mongoose';

declare module Express {
    interface Request {
        id?: Types.ObjectId;
    }
}
