import { useState } from "react"
import { Layout } from "../../componentes/Layout"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Login = () => {
    const [email, setEmail] = useState(""); {/*Para asignar valores al formulario y que se actualize */}
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate()

    const {login, token} = useAuth()

    const handleLogin = async (body) => {
        try {
            const response = await fetch("http://localhost:1111/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const token = response.json()
            return token;
        } catch (error) {
            console.log(error)
        }
    }

    const handleSumbit = async (e) => { {/* Nos permite controlar el formulario*/}
        e.preventDefault()
        
        {/*Una vez controlado, lo guardamos en un OBJECT*/}
        const dataUser = {  
            email,
            password
        }

        const {token} = await handleLogin(dataUser)
        login(token) //context
        navigate("/")//te lleva al inicio una vez logueado.
    }

    

    return (
        <Layout> 
            <h1>Login</h1>
           
            {
                !token && <form onSubmit={handleSumbit}>  {/*Como contolamos el formulario? */}
                <input type="email" placeholder= "Email" value={email} onChange={(e) => {setEmail(e.target.value)}} /> {/* value = es el valor que le damos con useState Y por el que lo actualizamos es onChange*/}
                <input type="password" placeholder= "Password"  value={password} onChange={(e) =>{setPassword(e.target.value)}}/>
                <button>Ingresar</button>
            </form>
            }
            {token && <p>Bienvenido! </p>}
        </Layout>  
    )

}

export { Login }