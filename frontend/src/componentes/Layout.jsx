import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

const Layout = ({ children }) => { {/*Para iyectar el Layaout en nuestra pagina usamos la prop: CHILDREN */}
    const navigate = useNavigate()

    const {user, logout} = useAuth()

    const handleLogout = () => {
    logout()
    navigate("/login")
}

return (
        <>
            <header>
                <nav>
                    {
                        user && (
                            <ul>
                                <li><Link to={"/"}> Incio</Link></li>
                                <button onClick={handleLogout}>Cerrar Sesión</button>
                            </ul>
                        )
                    }
                    {
                        !user &&(
                             <ul>
                                 <li><Link to={"/"}> Incio</Link></li>
                                 <li><Link to={"/login"}>Login</Link></li>
                                 <li><Link to={"/register"}>Register</Link></li>
                             </ul>
                        )
                    }
                   
                </nav>
                
            </header>
            <main>
                {children}
            </main>
            <footer>
                <p>Realizado por: Gaston Reynoso</p>
            </footer>
        </>
    )
}

export {Layout}