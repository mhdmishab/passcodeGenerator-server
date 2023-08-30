
import passwordSchema, { IPassword, ISavedPassword } from "../model/passwordSchema";
import userSchema, { IUser } from "../model/userSchema"


export const findUser=async(email:String)=>{
    try{

        const user=await userSchema.findOne({email:email});
        return user;

    }catch(err){
        throw new Error("No user Found");
    }
}

export const addUser=async(userData:IUser)=>{
    try{
        const savedUser=await new userSchema(userData).save();
        return savedUser;
    }
    catch(err){
        throw new Error("Failed to create user");
    }
}

export const UserFindById = async (userId: string) => {
    try {
      const user = await userSchema.findById(userId);
  
      return user;
    } catch (error) {
      throw new Error('Failed to find user by ID');
    }
  };

export const findPasswordsByUserId = async (userId: string): Promise<IPassword | null> => {
    try {
      const passwords = await passwordSchema.findOne({ userId });
  
      return passwords;
    } catch (error) {
      console.log(error);
      return null;
    }
  };


  export const savePassword = async (userId: string, savedPasswordData: ISavedPassword) => {
    try {
  
        let password = await passwordSchema.findOne({ userId: userId });

        if (!password) {
          password = await passwordSchema.create({
            userId,
            savedPassword: [savedPasswordData],
          });
        } else {
          password.savedPassword.push(savedPasswordData);
          await password.save();
        }
    } catch (error) {
        console.log(error);
      throw new Error('Failed to save password');
    }
  };

