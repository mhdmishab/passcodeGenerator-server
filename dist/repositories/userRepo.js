"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.findUser = void 0;
const userSchema_1 = __importDefault(require("../model/userSchema"));
const findUser = async (email) => {
    try {
        const user = await userSchema_1.default.findOne({ email: email });
        return user;
    }
    catch (err) {
        throw new Error("No user Found");
    }
};
exports.findUser = findUser;
const addUser = async (userData) => {
    try {
        const savedUser = await new userSchema_1.default(userData);
        return savedUser;
    }
    catch (err) {
        throw new Error("Failed to create user");
    }
};
exports.addUser = addUser;
//# sourceMappingURL=userRepo.js.map