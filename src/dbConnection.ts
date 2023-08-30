import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();


const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as Parameters<typeof mongoose.connect>[1];

export const db =
//  () => {

//     mongoose.set("strictQuery",false);

//     mongoose.connect('mongodb://127.0.0.1:27017/passwordGenerator')
//         .then(() => {
//             console.log("Connected to the database");
//         })
//         .catch((err) => {
//             console.error("MongoDB connection failed", err.message);
//         });
// };
async (): Promise<void> => {
    try {
      // await mongoose.connect('mongodb://127.0.0.1:27017/passwordGenerator', mongooseOptions)
      await mongoose.connect(String(process.env.MONGO_DB_URL), mongooseOptions)
      console.log("Connected to database");
    } catch (error) {
      console.error("Failed to connect to database:", error);
      process.exit(1);
    }
  };