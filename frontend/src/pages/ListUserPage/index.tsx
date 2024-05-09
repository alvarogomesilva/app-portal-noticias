import { useSelector } from "react-redux";
import { Navbar } from "../../components/Navbar";
import { RootState } from "../../types";
import { useEffect, useState } from "react";
import { api } from "../../api";
import { Link } from "react-router-dom";

const BASE_URL = 'http://localhost:3000/files'

type TUsers = {
    id: string;
    name: string;
    lastname: string;
    avatar: string;
    phone: string;
    email: string;
    roleId: number;
}

export default function ListUserPage() {
    const userId = useSelector((state: RootState) => state.user.currentUser.id)
    const [users, setUsers] = useState<TUsers[] | []>([])

    useEffect(() => {
        async function loadUsers() {
            try {
                const token = localStorage.getItem('@u')
                const response = await api.get('/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setUsers(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        loadUsers()
    }, [])


    return (
        <>
            <Navbar />



           <div className="mx-20 my-10 grid sm:grid-cols-3 gap-4">
          {
            users.length > 0  ? (
               users.map((user) => (
                <div 
                key={user.id}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <div className="flex flex-col items-center pb-10 mt-4">
                    <img className="w-24 h-24 mb-3 object-cover rounded-full shadow-lg" src={`${BASE_URL}/${user.avatar}`} alt="Bonnie image" />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {user.roleId === 2 && 'Manutenção'}
                        {user.roleId === 3 && 'Usuário'}
                    </span>
                    <div className="flex mt-4 md:mt-6">
                        <Link to="/edit-user" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Atualizar</Link>
                        <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Deletar</a>
                    </div>
                </div>
            </div>
               ))
            ) : (
                <h2>Não tem outros usuários</h2>
            )
          }
          
              
           </div>

        </>
    )
}