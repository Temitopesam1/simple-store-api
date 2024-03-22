import { IUser } from './models/user';


declare module 'express' {
    interface Request {
        user?: IUser | null;
    }
}
