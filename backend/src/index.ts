import { connectMongodb } from "./config/connectMongodb"
import express, {Request, Response, NextFunction } from "express"
import { teamRouter } from "./routes/teamRouter"
import { authRouter } from "./routes/authRouter"
import { authMiddleware } from "./middleware/authMiddleware"
import cors from "cors"


const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())//Esto nos permite hacer uso en cosola del cuerpo de la peticion (en formato json)
app.use(cors()) //Le decis a la app que haga uso de cors

app.use("/api/auth", authRouter)

app.use("/api/teams", authMiddleware, teamRouter)

//Conexion al servidor:
app.listen(PORT, ()=>{
    console.log(`✅ Servidor en escucha en el puerto: http://localhost:${PORT}`)
    connectMongodb()
}) 



