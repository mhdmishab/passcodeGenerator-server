import mongoose, { Document } from 'mongoose';

export interface IUser extends Document{
   
    userName: string;
    email: string;
    password: string;
}


const userSchema = new mongoose.Schema<IUser>({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },{timestamps: true});



  export default mongoose.model<IUser>("User", userSchema);
