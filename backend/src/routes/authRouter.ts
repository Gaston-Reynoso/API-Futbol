import { Router } from "express";
import { getUsers, login, register } from "../controllers/authControllers";

const authRouter = Router()

authRouter.get("/", getUsers)
authRouter.post("/register", register)
authRouter.post("/login", login)



export{authRouter}