import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../types";
import { logout } from "../../store/user/action";
import { AppDispatch } from "../../store/store";
import { useEffect, useState } from "react";
import { FaBlog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";


export const Navbar = () => {

    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const user = useSelector((state: RootState) => state.user.currentUser)
    const [avatar, setAvatar] = useState<string>("");

    useEffect(() => {
        if (user?.avatar) {
            setAvatar(`http://localhost:3000/files/avatars/${user.avatar}`);
        } else {
            setAvatar("");
        }

    }, [user]);

    const dispatch = useDispatch<AppDispatch>();
    function handleLogout() {
        dispatch(logout())
    }
    return (
        <header className="bg-blue-800">
            <nav className="container mx-auto px-6 py-6">
                <div className="flex items-center justify-between">
                    <div className="text-white font-bold text-xl">
                        <Link to="/"><FaBlog size={40} /></Link>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            <li><a href="#" className="text-white hover:text-gray-300">Home</a></li>
                            <li><Link to="/" className="text-white hover:text-gray-300">Ultimas Notícias</Link></li>

                            <li><a href="#" className="text-white hover:text-gray-300">Contato</a></li>
                            {user.roleId === 1
                                &&
                                <li ><Link to="/actions" className="text-white hover:text-gray-300">Administrador</Link></li>
                            }
                            {user.roleId === 2
                                &&
                                <li ><Link to="/actions" className="text-white hover:text-gray-300">Manutenção</Link></li>}

                            {
                                isAuthenticated ? (
                                    <>
                                       
                                        <li>
                                            <Link to="/perfil"><div className=" flex flex-col items-center justify-center">
                                                <img className="w-10 h-10 p-1 object-cover rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={avatar || "https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"} alt="" />
                                            </div>
                                            </Link>
                                        </li>
                                        <li ><Link to="/login" className="text-white hover:text-gray-300" onClick={handleLogout}>
                                        <MdLogout  size={30}/>    
                                        </Link></li>

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