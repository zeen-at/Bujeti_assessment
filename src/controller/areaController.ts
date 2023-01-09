import express,{Response, Request} from "express"
import fetch from "node-fetch-commonjs";

const baseUrl = "https://api.teleport.org/api/continents/geonames%3AAF/urban_areas/"

export const getAllAreas = async (req: Request, res: Response,) => {
    try {
        const areas = [];
        const allArea: string[] = []
        const response = await fetch(baseUrl);
        const data: any = await response.json();
        areas.push(data._links[`ua:items`])
        const allAreaData = areas[0]
        // console.log(allAreaData)

        areas.map((area) => {
            area.forEach((each: any) => {
                allArea.push(each.name)
                // console.log(allArea)
            })
        }) 
        return res.status(200).json({
            message: "List of all urban areas",
            messages: allArea
        })
    } catch (error) {
        res.status(400).json({
            message: "Error getting all areas"
        })
    }
}

export const getOneUrban = async (req: Request, res: Response) => {
    try {
        const areaData = [];
        const response = await fetch(baseUrl);
        const data: any = await response.json();
        areaData.push(data._links[`ua:items`])
        const allAreaData = areaData[0]
        
        let prams = req.params.id
        let id = prams[0].toUpperCase()+prams.slice(1)
    
        const results = allAreaData.find((item:any) => item.name == id)
        if(results.name == id){
            return res.status(200).json({
                message: "Particular Urban area",
                messages: id
            })
        }
        else{
            return res.status(400).json({
                message: "urban area not found"
            })
        }
        
    } catch (error) {
        res.status(400).json({
            message: "Error getting particular area"
        })
    }
}
//   getOneUrban();

export const getAreaDetails = async (req: Request, res: Response) => {
    try {
        const areaData = [];
        const response = await fetch(baseUrl);
        const data: any = await response.json();
        areaData.push(data._links[`ua:items`])
        
        const allAreaData = areaData[0]
        // console.log(allAreaData)

        let prams = req.params.id
        let id = prams[0].toUpperCase()+prams.slice(1)
    
        const results = allAreaData.find((item:any) => item.name == id)
        if(results.name == id){
          
            const areaName = results.name

            const imageApi = results.href
            const newScoreApi = await fetch(`${imageApi}scores`)
            const scoreData: any = await newScoreApi.json()
            const cityScore = scoreData.teleport_city_score

            const newImageApi = await fetch(`${imageApi}images`)
            const imageData: any = await newImageApi.json()
            const photos = imageData.photos[0]['image']
            // console.log(photos['web'])
            const cityPhoto = photos['web']

            const newSalaryApi = await fetch(`${imageApi}salaries`)
            const datas: any = await newSalaryApi.json()
            const salaries = datas["salaries"]
            const jobType = salaries[0]["job"].title
            const salaryPercentile = salaries[0]["salary_percentiles"]["percentile_50"]

            
            if(results.name == id){
                return res.status(200).json({
                    id: req.params.id,
                    message: `${areaName} Information`,
                    City_score: `City Score for ${areaName} is ${cityScore}`,
                    city_Image: `City photo for ${areaName} is ${cityPhoto}`,
                    Average_salary: `Average salary for ${areaName} for ${jobType} role is ${salaryPercentile}`
    
                })
            }
            else{
                return res.status(400).json({
                    message: "urban area does not exist"
                })
            }
        }
    } catch (error) {
        res.status(400).json({
            message: "Error getting city details",
            error: error
        })
    }
  
}
//  getAreaDetails();



