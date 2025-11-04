import { Team } from "../models/teamModels";
import { Request, Response } from "express";
import { eTeam } from "../interfaces/team";

//Recuperar equipos
const getTeams = async (req: Request, res: Response): Promise<any> => {

    const user = req.user
    console.log(user, "<- Usuario logueado del controlador")

    try {
        const teams = await Team.find()
        return res.json({
            success: true,
            message: "Recuperando equipos",
             data: teams
        })
        
    } catch (error) {
        const err = error as Error
        return res.status(500).json({
            success: false,
            error: err.message
        })
        
    }
}

//Agregar equipo
const addTeam = async (req: Request, res: Response): Promise<any> =>{
   
   const body = req.body
   const{name, province, yearOfFoundation, liga} = body
   if(!name || !province || !yearOfFoundation || !liga) {
    return res.status(400).json({success: false, message: "Invalid data"})
   }
    try {
        const newTeamData: eTeam = {name, province, yearOfFoundation, liga}

        const newTeam = new Team(newTeamData)
        await newTeam.save()

        return res.status(201).json({success:true, data:newTeam, message: "Equipo agregado correctamente!"})
        
    } catch (error) {
        const err = error as Error
        return res.json({success: false, message: err.message})
        
    }
}

//Modificar equipos
const updateTeam = async (req: Request, res: Response): Promise<any> =>{
    
    try {
        const id = req.params.id
    const body = req.body

    const updateTeam = await Team.findByIdAndUpdate(id, body, {new: true} )

    if (!updateTeam){
        return res.status(404).json({
            success: false,
            message: "Team not found"
        })
    }

    res.json({
        success: true,
        message: "Successfully update team",
        data: updateTeam
    })
        
    } catch (error) {
        const err = error as Error
        res.status(500).json({success: false, message: err.message})
    }
    
}

//Eliminar equipo
const deleteTeam = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id
    try {
        const deleteTeam = await Team.findByIdAndDelete(id)
        if(!deleteTeam){
            return res.status(404).json({
                success: false,
                message: "Team not found"
            })
        }
        res.json({
            success: true,
            message: "Successfully deleted team",
            data: deleteTeam
        })
    } catch (error) {
        const err = error as Error
        res.status(500).json({success:false, message: err.message})
    }

}

export {getTeams, addTeam, updateTeam, deleteTeam}