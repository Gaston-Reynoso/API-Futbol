import { NextFunction, Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken"
import  jwt  from "jsonwebtoken"




declare global {

    namespace Express{

        interface Request {

            user?: string | JwtPayload
        }
    }
}
//Middleware: "En el medio de" => funcion que esta entre medio de la base de mi ruta y el router. Lo que va a hacer es verificar que el token que envia el usuario se correcto y si es asi se da paso al router.
//middleware tiene la posibilidad de recibir un 3er parametro: next:NextFuncion

const authMiddleware = async(req:Request, res:Response, next:NextFunction): Promise<any> => {
    const header = req.headers.authorization //Vamos a necesitar recuperar el token que envia el usuario. Agregamos a los headers (authorization) donde delante agregamos "Bearer". Luego separamos el bearer del token.

    const token = header?.split(" ")[1]
    
 

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unhautorized, token is required"

        })
    }

    try {
        //Validar Token existente
    const JWT_SECRET = process.env.JWT_SECRET!
    const decoded = jwt.verify(token, JWT_SECRET)
      // Enviarle a la petición que sigue, de quien corresponde    
    req.user = decoded
    next()
    } catch (error) {
        const err = error as Error
        res.status(401).json({success:false, message: err.message})
    }
}

export {authMiddleware}