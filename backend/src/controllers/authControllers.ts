import { Request, Response } from "express"
import { Auth } from "../models/authModels"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



process.loadEnvFile()

//Mostrar todos los usuarios
const getUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await Auth.find({}, {password: 0})//Significa que {password: 0} no me va a traer ese dato.
        res.json({
            success: true,
            data: users,
            message: "Obteniendo todos los usuarios"
        })
    } catch (error) {
        const err = error as Error
        res.status(500).json ({
            success: false,
            message: err.message
            
        })
    }

}

//Agregar o crear usuarios nuevos
const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body


        const hash = await bcrypt.hash(body.password, 10)

        const newUser = new Auth({email: body.email, password: hash})
        await newUser.save()

        res.status(201).json({
            success: true,
            data:{_id: newUser._id, email: newUser.email},
            message: "usuario creado con éxito"
        })
    } catch (error) {
       const err = error as Error
        res.status(500).json ({
            success: false,
            message: err.message
            
        })
    }

}

//loguear un usuario existente
const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body

        const foundUser = await Auth.findOne({email: body.email})
        if(!foundUser) {
            return res.status(401).json({

                
                succes:false,
                message: "unauthorized"
            })
        }

       
        const match = await bcrypt.compare(body.password, foundUser.password)
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "unauthorized"
            })
        }


    // Generar la credencial que expira = (EL TOKEN)(Para que el usuario inicie sesion). Necesita los sig parametros: 
    // Payload
    // Contraseña secreta
    // Tiempo de expiración
        const payload = {     // Payload
         id: foundUser._id,
         email: foundUser.email
        }
        const JWT_SECRET = process.env.JWT_SECRET! // Contraseña secreta

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1m" })// Tiempo de expiración
        res.status(201).json({ token, user: { _id: foundUser._id, email: foundUser.email } })

        
    } catch (error) {
        const err = error as Error
        res.status(500).json ({
            success: false,
            message: err.message
            
        })
    }
}

export {getUsers, register, login}