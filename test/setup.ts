// setup.ts
import mongoose from 'mongoose';

beforeAll(async () => {
    const uri = process.env.MONGODB_URI || '';
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.close();
});
