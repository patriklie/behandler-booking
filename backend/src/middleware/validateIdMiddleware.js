export const validateIdMiddleware = (req, res, next) => {

    const { id } = req.user;

    if (!id) {
        return res.status(400).json({ message: "No ID found on req.user.id from Token." })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid user ID." })
    }

    next();
};