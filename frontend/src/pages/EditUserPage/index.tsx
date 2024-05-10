import React, { FormEvent, useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { useParams } from 'react-router-dom';
import { api } from "../../api";
import { updateUsers } from "../../store/user/action";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import toast from "react-hot-toast";

type Roles = {
    id: number;
    type: string;
}

export default function EditUserPage() {
    const dispatch = useDispatch<AppDispatch>()
    const { userId } = useParams()
    const [roles, setRoles] = useState<Roles[]>([])
    const [selectedRole, setSelectedRole] = useState<number | null>(null)
    const [inputs, setInputs] = useState({
        idUser: "",
        name: "",
        lastname: "",
        email: "",
        phone: ""
    })

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(parseInt(e.target.value, 10))
    };

    useEffect(() => {
        async function loadRoles() {
            try {
                const token = localStorage.getItem('@u')
                const response = await api.get('/roles', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setRoles(response.data)
                
                // Definir o roleId selecionado com base nos dados do usuário
                const userResponse = await api.get(`/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setSelectedRole(userResponse.data.roleId)
            } catch (error) {
                console.log(error)
            }
        }

        loadRoles()
    }, [userId]) // Dependência userId adicionada

    useEffect(() => {
        async function loadUser() {
            try {
                const token = localStorage.getItem('@u')
                const response = await api.get(`/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                const { id, name, lastname, email, phone, roleId } = response.data
                setInputs({
                    idUser: id,
                    name: name,
                    lastname: lastname,
                    email: email,
                    phone: phone
                })
                setSelectedRole(roleId)
            } catch (error) {
                console.log(error)
            }
        }

        loadUser()
    }, [userId]) // Dependência userId adicionada

    const handleUpdateUser = async (e: FormEvent) => {
        e.preventDefault()

        try {
            dispatch(updateUsers(inputs, selectedRole))
            toast.success("Atualizado com sucesso!")
        } catch (error) {
            console.log(error)
        }
    };

    return (
       <>
        <Navbar />

        <form className="max-w-2xl mx-auto">
                <h2 className="my-3 text-center text-2xl">Editar Usuário</h2>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                            value={inputs.name}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sobrenome</label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setInputs({ ...inputs, lastname: e.target.value })}
                            value={inputs.lastname}
                            required
                        />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                            type="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                            value={inputs.email}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
                            value={inputs.phone}
                            required
                        />
                    </div>
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
                    <select
                        id="countries"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleRoleChange}
                        value={selectedRole || ""}
                    >
                        <option value="">Selecione um tipo</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>{role.type}</option>
                        ))}
                    </select>
                </div>

              
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleUpdateUser}
                >
                    Atualizar
                </button>
            </form>
       </>
    )
}
