"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const db = 
//  () => {
//     mongoose.set("strictQuery",false);
//     mongoose.connect('mongodb://127.0.0.1:27017/passwordGenerator')
//         .then(() => {
//             console.log("Connected to the database");
//         })
//         .catch((err) => {
//             console.error("MongoDB connection failed", err.message);
//         });
// };
async () => {
    try {
        await mongoose_1.default.connect('mongodb://127.0.0.1:27017/passwordGenerator', mongooseOptions);
        console.log("Connected to database");
    }
    catch (error) {
        console.error("Failed to connect to database:", error);
        process.exit(1);
    }
};
exports.db = db;
//# sourceMappingURL=dbConnection.js.map