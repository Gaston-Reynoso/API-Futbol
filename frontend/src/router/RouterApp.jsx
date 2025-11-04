import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from "../views/Home/Home"
import { Login } from "../views/Login/Login"
import { Register } from "../views/Register/Register"


const RouterApp = () => {
    return (
        
        <BrowserRouter> {/*Componente necesario para manejar rutas en el front*/}
            <Routes>{/*Aqui se contienen todas las rutas*/}
                <Route path = "/" element={<Home/>} />{/*La ruta en concreto*/}
                <Route path = "/login" element={<Login/>} />
                <Route path = "/register" element={<Register/>} />
                <Route path="*" element={ <h2>No se encuentra la pagina</h2> } />{/*El "*" significa que si no es ninguna de la anteriores rutas....*/}
            </Routes>  
        </BrowserRouter>
        
    )
}

export { RouterApp }