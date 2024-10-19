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

        <form className="max-w-2xl mx-auto border border-1 p-5 mt-10">
                <h2 className="my-3 text-center text-2xl">Editar Usuário</h2>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                        <input
                            type="text"
                            className="py-2 px-2 border-0 ring-2 ring-gray-300 outline-none focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
                            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                            value={inputs.name}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sobrenome</label>
                        <input
                            type="text"
                            className="py-2 px-2 border-0 ring-2 ring-gray-300 outline-none focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
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
                            className="py-2 px-2 border-0 ring-2 ring-gray-300 outline-none focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                            value={inputs.email}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                        <input
                            type="text"
                            className="py-2 px-2 border-0 ring-2 ring-gray-300 outline-none focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
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
                        className="py-2 px-2 border-0 ring-2 ring-gray-300 outline-none focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
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
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleUpdateUser}
                >
                    Atualizar
                </button>
            </form>
       </>
    )
}
