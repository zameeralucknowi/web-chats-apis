import User from "../models/user.model.js";

export const getUsersForSidebar = async(req,res)=>{
    try { 
        const loggedInUser = req.user._id;
        const allUsers = await User.find({_id:{$ne:loggedInUser}}).select("-password")
        return res.status(200).json(allUsers);
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"internal server error"})
    }

}