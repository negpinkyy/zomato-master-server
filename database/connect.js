
import mongoose from "mongoose";

export default async () => {
  return mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1/zomato', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};