import { connect } from "mongoose"

process.loadEnvFile()
const URI_DB = process.env.URI_DB || " "

const connectMongodb = async () => {
    try {
        await connect(URI_DB)
        console.log("✅ Conectado a la base de datos con exito.")
    } catch (error) {
        const err = error as Error
        console.log("❌ Error al conectar a la base de datos." + (err))
        
    }
}

export {connectMongodb}