import mongoose from 'mongoose';

export const dbConnect = async () => {
  try {
    const databaseUrl = process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not defined');
    }

    const connection = await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false, // Optional: You can add other options if needed
    } as any);

    console.log(`Database connected successfully on host: ${connection.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    throw error; // Optional: Rethrow the error to handle it in the caller context
  }
};
