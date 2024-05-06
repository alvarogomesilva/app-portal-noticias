import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../types";
import { logout } from "../../store/user/action";
import { AppDispatch } from "../../store/store";


export const Navbar = () => {

    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const user = useSelector((state: RootState) => state.user.currentUser)
    const dispatch = useDispatch<AppDispatch>();

    function handleLogout() {
        dispatch(logout())
    }

    return (
        <header className="bg-blue-900">
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="text-white font-bold text-xl">
                        <a href="#">Logo</a>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            <li><a href="#" className="text-white">Home</a></li>
                            <li><a href="#" className="text-white">Noticias</a></li>
                            <li><a href="#" className="text-white">Contato</a></li>
                            {
                                isAuthenticated ? (
                                    <>
                                    <li ><Link to="/login" className="text-white" onClick={handleLogout}>Sair</Link></li>
                                        <li>

                                            <div className=" flex flex-col items-center justify-center">
                                                <img className="inline-block size-[46px] rounded-full" src="https://sujeitoprogramador.com/steve.png" alt="" />
                                                <div className="font-medium dark:text-white">
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">{user.name}</span>
                                                </div>
                                            </div>

                                        </li>
                                        
                                    </>
                                ) : (
                                    <li className="border-2 px-4 py-1 rounded"><Link to="/login" className="text-white">Login</Link></li>
                                )
                            }
                        </ul>
                    </div>
                    <div className="md:hidden">
                        <button className="outline-none mobile-menu-button">
                            <svg className="w-6 h-6 text-white" x-show="!showMenu" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="mobile-menu hidden md:hidden">
                    <ul className="mt-4 space-y-4">
                        <li><a href="#" className="block px-4 py-2 text-white bg-gray-900 rounded">Home</a></li>
                        <li><a href="#" className="block px-4 py-2 text-white bg-gray-900 rounded">About</a></li>
                        <li><a href="#" className="block px-4 py-2 text-white bg-gray-900 rounded">Services</a></li>
                        <li><a href="#" className="block px-4 py-2 text-white bg-gray-900 rounded">Contact</a></li>
                    </ul>
                </div>

            </nav>
        </header>

    )
}