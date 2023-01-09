"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const areaRouter_1 = __importDefault(require("./routes/areaRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use("/", areaRouter_1.default);
app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}...`);
});
exports.default = app;
