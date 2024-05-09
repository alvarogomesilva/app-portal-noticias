import { useSelector } from "react-redux"
import { Navbar } from "../../components/Navbar"
import { RootState } from "../../types"
import { Link } from "react-router-dom"


export default function ActionPage() {
    const roleId = useSelector((state: RootState) => state.user.currentUser.roleId)


    return (
        <>
            <Navbar />
            <h1>Página de ações</h1>
            {
                roleId == 1 ? (

                    <div>
                        <h3>Gerenciamento de Noticias</h3>
                        <ul>
                            <li><a href="#">Cadastrar Notícia</a></li>
                            <li><a href="#">Editar Notícia</a></li>
                        </ul>

                        <div>
                            <h3>Gerenciamento de Usuários</h3>
                            <ul>
                                <li><Link to="/new-user">Cadastrar usuário</Link></li>
                                <li><a href="#">Editar usuário</a></li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3>Gerenciamento de Noticias</h3>
                        <ul>
                            <li><a href="#">Cadastrar Notícia</a></li>
                            <li><a href="#">Editar Notícia</a></li>
                        </ul>
                    </div>
                )
            }
        </>
    )
}