import mongoose from 'mongoose';

export default async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`DataBase Connected: ${conn.connection.host}`);
  } catch (err: any) {
    console.error(err);
    process.exit(1);
  }
}
