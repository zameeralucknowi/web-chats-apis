import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signup = async(req,res) =>{
    const {fullName,userName,password,confirmPassword,gender} = req.body;

    if(password!=confirmPassword){
       return  res.status(403).json({error : "password does not match"});
    }

    try {
        const user =  await User.findOne({userName});
        if(user){
            return res.status(409).json({error:"userName already exists"})
        }else{
            const boyProfilepic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
            const girlProfilPic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

            const hashedPassword = await bcrypt.hash(password,10);
            const newUser =  new User({
                fullName : fullName,
                userName : userName,
                password : hashedPassword,
                gender : gender,
                profilePic : gender === "male"?boyProfilepic : girlProfilPic
            })

            if(newUser){
                await newUser.save();
                // generate jwt 
                generateTokenAndSetCookie(newUser._id,res);
                return res.status(201).json(newUser)
            }
            else{
                return res.status(400).json({error:"invalid input data"})
            }
    
        }
    } catch (error) {
        return res.status(500).json({error:"Error in  signup ccontroller",error})
    }
}

export const login = async(req,res) =>{
   try {
        const {userName,password} = req.body;
        const user = await User.findOne({userName});
        const checkPassword = await bcrypt.compare(password,user?.password || "");
        if(!user || !checkPassword ){
            return res.status(403).json({error:"Invalid userName or password"})
        }
        generateTokenAndSetCookie(user._id,res);
        return res.status(200).json(user)
   } catch (error) {
        return res.status(500).json({error:"Error login ccontroller ",error})
   }
}

export const logout = (req,res) =>{
    try {
        res.clearCookie('jwt')
       return res.status(200).json({message:"user logged out"})
    } catch (error) {
        return res.status(500).json({error:"Error",error})
    }
}