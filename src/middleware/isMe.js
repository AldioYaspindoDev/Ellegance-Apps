export const isMe = (req, res, next) => {
    if(req.user.role !== "customer"){
        return res.status(403).json({
            message: "You are not authorized to perform this action",
        });
    }
    next();
};