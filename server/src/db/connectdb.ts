import mongoose from "mongoose";
const uri = process.env.MONGO_URI;

if (typeof(uri) !== 'string' || !uri.trim()) {
    throw new Error('MONGO_URI is not defined in the .env file or is invalid.');
}

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Exit the process with an error code
    }
}

export default connectDB;
