const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "4h" });
        const { password: _, ...userWithoutPassword } = user.toObject();

        res.json({ message: "User registered successfully!", user: userWithoutPassword, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "4h" });
        const { password: _, ...userWithoutPassword } = user.toObject();

        res.json({ user: userWithoutPassword, token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    register,
    login
}
