import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { seedProducts } from './seed.js';

let mongod: MongoMemoryServer | null = null;

export const connectDB = async () => {
  try {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    await mongoose.connect(uri);
    console.log('MongoDB connected (In-Memory)');
    
    // Seed initial data
    await seedProducts();
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};
