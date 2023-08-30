"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const userRepo_1 = require("../repositories/userRepo");
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = (0, userRepo_1.findUser)(email);
        if (!existingUser) {
            return res.status(400).json({ error: "User Alredy Exists" });
        }
        const saltRounds = 10;
        const hashedPassword = await bcryptjs_1.default.hash(password, saltRounds);
        const userData = { name, email, password: hashedPassword };
        const newUser = await (0, userRepo_1.addUser)(userData);
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
            expiresIn: "7d",
        });
    }
    catch (err) {
    }
};
exports.registerUser = registerUser;
//# sourceMappingURL=userController.js.map