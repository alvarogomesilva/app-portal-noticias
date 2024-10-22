import { useSelector } from "react-redux"
import { Navbar } from "../../components/Navbar"
import { RootState } from "../../types"
import { Link } from "react-router-dom"

export default function ActionPage() {
    const roleId = useSelector((state: RootState) => state.user.currentUser.roleId)


    return (
        <>
            <Navbar />
            <div className="flex flex-wrap lg:w-2/5 sm:mx-auto sm:mb-2  p-4">
                {roleId === 1 && (
                    <>
                        <h2 className="text-3xl my-2 text-indigo-600">➥ Usuários</h2>
                        <div className="p-2 w-full">
                            <Link to="/new-user" className="bg-gray-200 rounded flex p-4 h-full items-center">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                                    className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                    <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                                <span className="font-medium">Cadastrar Usuário</span>
                            </Link>
                        </div>
                        <div className="p-2  w-full">
                            <Link to="/list-user" className="bg-gray-200 rounded flex p-4 h-full items-center">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                                    className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                    <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                                <span className="font-medium">Editar Usuário</span>
                            </Link>
                        </div>

                    </>
                )}

                <h2 className="text-3xl mt-4 text-indigo-600">➥ Noticias</h2>
                <div className="p-2 w-full">
                    <Link to="/new-notice" className="bg-gray-200 rounded flex p-4 h-full items-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                            className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                            <path d="M22 4L12 14.01l-3-3"></path>
                        </svg>
                        <span className="font-medium">Cadastrar Noticia</span>
                    </Link>
                </div>
                <div className="p-2  w-full">
                    <Link to="/list-notice" className="bg-gray-200 rounded flex p-4 h-full items-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                            className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                            <path d="M22 4L12 14.01l-3-3"></path>
                        </svg>
                        <span className="font-medium">Editar Noticia</span>
                    </Link>
                </div>

            </div>

        </>
    )
}

