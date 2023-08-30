"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./routes/route"));
const morgan_1 = __importDefault(require("morgan"));
const dbConnection_1 = require("./dbConnection");
(0, dbConnection_1.db)();
const port = 4000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use('/api', route_1.default);
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
//# sourceMappingURL=index.js.map