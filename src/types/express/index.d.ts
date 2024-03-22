import { Types } from 'mongoose';

// declare module 'express' {
//     interface Request {
//         id?: Types.ObjectId;
//     }
// }

declare global {
    namespace Express {
        interface Request {
            id?: Types.ObjectId;
        }
    }
}
