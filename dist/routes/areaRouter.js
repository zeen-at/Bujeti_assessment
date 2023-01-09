"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const areaController_1 = require("../controller/areaController");
const router = express_1.default.Router();
router.get("/", areaController_1.getAllAreas);
router.get("/urban/:id", areaController_1.getOneUrban);
router.get("/area/:id", areaController_1.getAreaDetails);
exports.default = router;
