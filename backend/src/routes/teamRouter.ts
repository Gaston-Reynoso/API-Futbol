import { Router } from "express";
import { getTeams, addTeam, updateTeam, deleteTeam } from "../controllers/teamControllers";

const teamRouter = Router()


//Recuperar equipos
teamRouter.get("/", getTeams)

//Recuperar equipos por id

//Agregar equipo
teamRouter.post("/", addTeam)

//Actualizar equipo
teamRouter.patch("/:id", updateTeam)

//Eliminar equipo
teamRouter.delete("/:id", deleteTeam)

export{teamRouter}