import { Request, Response } from "express"
import { UserFindById, addUser, findPasswordsByUserId, findUser, savePassword } from "../repositories/userRepo";
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { IUser } from "src/entities/interfaces";

dotenv.config();

export const registerUser=async(req:Request,res:Response)=>{
    console.log("here1")
    const {userName,email,password}:IUser = req.body;

    try{
        console.log("here1")
        console.log(userName);
        const existingUser=await findUser(email);
        if(existingUser){
            return res.status(400).json({error:"User Alredy Exists"});
        }
        const saltRounds=10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userData: any = { userName, email, password: hashedPassword };
        const newUser = await addUser(userData);
        console.log(newUser)

        const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
            expiresIn: "7d",
          });


        res.status(200).json({ user: newUser.userName,  token: `Bearer ${token}`});


    }catch(err){
        console.log(err)
        throw new Error(err);
    }

}

export const loginUser=async(req:Request,res:Response)=>{
    const {email,password}:IUser = req.body;
    try{
        console.log("login")
        console.log(email);
        const user= await findUser(email);
        if(!user){
            return res.status(400).json({error:"Invalid email or password"});
        }
        console.log(user);
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(400).json({error:"Invalid email or password"});
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            {
              expiresIn: "7d",
            }
          );
          res.status(200).json({ user: user.userName,  token: `Bearer ${token}`});

    }
    catch(error){
        res.status(500).json({ error: "Failed to login User" });
    }
}

export const savedPassword = async (req: any, res: Response) => {
    try {
      const userId = req.user.userId;
      const { appName, userName, password } = req.body;
  
      const user = await UserFindById(userId);
      console.log(1)
      if(!user){
        res.status(400).json({error:"No User Found"})
      }
      const savedPasswordData:any = {
        appName,
        userName,
        password,
      };
  
      await savePassword(userId, savedPasswordData);
  
      res.status(201).json({ message: 'Saved password successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  export const fetchSavedData = async (req: any, res: Response) => {
    try {
      const userId = req.user.userId;
  
      const savedPasswords = await findPasswordsByUserId(userId);
  
      const savedPass = savedPasswords ? savedPasswords.savedPassword.map((item: any) => ({
        userName: item.userName,
        appName: item.appName,
        password: item.password,
      })) : [];
  
      return res.status(200).json(savedPass);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };