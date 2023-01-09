import express,{Request,Response} from "express";
import { getAllAreas, getAreaDetails, getOneUrban } from "../controller/areaController";

const router = express.Router();

router.get("/", getAllAreas)
router.get("/urban/:id", getOneUrban)
router.get("/area/:id", getAreaDetails)




export default router;