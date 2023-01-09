"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAreaDetails = exports.getOneUrban = exports.getAllAreas = void 0;
const node_fetch_commonjs_1 = __importDefault(require("node-fetch-commonjs"));
const baseUrl = "https://api.teleport.org/api/continents/geonames%3AAF/urban_areas/";
const getAllAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const areas = [];
        const allArea = [];
        const response = yield (0, node_fetch_commonjs_1.default)(baseUrl);
        const data = yield response.json();
        areas.push(data._links[`ua:items`]);
        const allAreaData = areas[0];
        console.log(allAreaData);
        areas.map((area) => {
            area.forEach((each) => {
                allArea.push(each.name);
                // console.log(allArea)
            });
        });
        return res.status(200).json({
            message: "List of all urban areas",
            messages: allArea
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Error getting all areas"
        });
    }
});
exports.getAllAreas = getAllAreas;
const getOneUrban = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const areaData = [];
        const response = yield (0, node_fetch_commonjs_1.default)(baseUrl);
        const data = yield response.json();
        areaData.push(data._links[`ua:items`]);
        const allAreaData = areaData[0];
        let prams = req.params.id;
        let id = prams[0].toUpperCase() + prams.slice(1);
        const results = allAreaData.find((item) => item.name == id);
        if (results.name == id) {
            return res.status(200).json({
                message: "Particular Urban area",
                messages: id
            });
        }
        else {
            return res.status(400).json({
                message: "urban area not found"
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Error getting particular area"
        });
    }
});
exports.getOneUrban = getOneUrban;
//   getOneUrban();
const getAreaDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const areaData = [];
        const response = yield (0, node_fetch_commonjs_1.default)(baseUrl);
        const data = yield response.json();
        areaData.push(data._links[`ua:items`]);
        const allAreaData = areaData[0];
        console.log(allAreaData);
        let prams = req.params.id;
        let id = prams[0].toUpperCase() + prams.slice(1);
        const results = allAreaData.find((item) => item.name == id);
        if (results.name == id) {
            const areaName = results.name;
            const imageApi = results.href;
            const newScoreApi = yield (0, node_fetch_commonjs_1.default)(`${imageApi}scores`);
            const scoreData = yield newScoreApi.json();
            const cityScore = scoreData.teleport_city_score;
            const newImageApi = yield (0, node_fetch_commonjs_1.default)(`${imageApi}images`);
            const imageData = yield newImageApi.json();
            const photos = imageData.photos[0]['image'];
            console.log(photos['web']);
            const cityPhoto = photos['web'];
            const newSalaryApi = yield (0, node_fetch_commonjs_1.default)(`${imageApi}salaries`);
            const datas = yield newSalaryApi.json();
            const salaries = datas["salaries"];
            const jobType = salaries[0]["job"].title;
            const salaryPercentile = salaries[0]["salary_percentiles"]["percentile_50"];
            if (results.name == id) {
                return res.status(200).json({
                    id: req.params.id,
                    message: `${areaName} Information`,
                    City_score: `City Score for ${areaName} is ${cityScore}`,
                    city_Image: `City photo for ${areaName} is ${cityPhoto}`,
                    Average_salary: `Average salary for ${areaName} for ${jobType} role is ${salaryPercentile}`
                });
            }
            else {
                return res.status(400).json({
                    message: "urban area does not exist"
                });
            }
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Error getting city details",
            error: error
        });
    }
});
exports.getAreaDetails = getAreaDetails;
//  getAreaDetails();
