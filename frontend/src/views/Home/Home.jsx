import { useState, useEffect } from "react"
import { Layout } from "../../componentes/Layout"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/authContext"

const Home = () => {
    const [teams, setTeams] = useState([])
    const [error, setError] = useState(null)

    const {user} = useAuth()

    useEffect(() => {
        const fetchingTeams = async () => {
            const token = localStorage.getItem("token")
            try {
                const response = await fetch("http://localhost:1111/api/teams", {
                    headers: {Authorization: `Bearer ${token}` }
                })

                if(!response.ok) {
                    setError("Necesitas loguearte para ver los equipos...")
                    localStorage.removeItem("token")
                    throw new Error("Falló el fetch :(")
                }
                const dataTeams = await response.json()
                setTeams(dataTeams.data)
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchingTeams()
    }, [])

    return (
        <Layout>
            <h1>Lista de Equipos</h1>
            
            {user && <p className="welcome-message">Bienvenido {user.email}</p>}
            
            
            {!user && error && (
                <div className="error-container">
                    <h2>{error}</h2>
                    <Link to={"/login"}>Ir al login</Link>
                </div>
            )}
            
            <div className="teams-container">
                {teams.map((team) => (
                    <div key={team._id} className="team-card fade-in">
                        <h2>{team.name}</h2>
                        <p><strong>Provincia:</strong> {team.province}</p>
                        <p><strong>Fundación:</strong> {team.yearOfFoundation}</p>
                        <p><strong>Liga:</strong> {team.liga}</p>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export { Home }