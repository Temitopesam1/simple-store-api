import { Types } from 'mongoose';

// declare module 'express' {
//     interface Request {
//         id?: Types.ObjectId;
//     }
// }

declare global {
    interface Request {
        id?: Types.ObjectId;
    }
}
