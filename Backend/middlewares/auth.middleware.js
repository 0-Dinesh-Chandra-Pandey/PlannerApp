import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res
            .status(400)
            .send({ message: "Unauthorized HTTP, Token not provided" });
    }
    
    const formattedToken = token.replace("Bearer ", "").trim();
    
    try {
        const isVerified = jwt.verify(formattedToken, process.env.JWT_SECRET_KEY);
                
        // FINDING THE USER IN THE DATABASE 
        const userData = await User.findOne({username: isVerified.username}).select("-password");
        
        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        
        next()
    } catch (error) {
        return res.status(400).send({message: "error while fetching the data", error});
    }
};

export default authMiddleware;
