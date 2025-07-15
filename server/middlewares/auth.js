import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.token;
    const token = authHeader && authHeader.startsWith("Bearer ") 
        ? authHeader.split(" ")[1] 
        : authHeader;

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized. Login again!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id }; // Prefer req.user for authentication info
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

export default userAuth;
