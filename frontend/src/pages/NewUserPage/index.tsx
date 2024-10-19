import { FormEvent, useEffect, useState } from "react"
import { Navbar } from "../../components/Navbar"
import { api } from "../../api"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { createUser } from "../../store/user/action";
import toast from "react-hot-toast";
import { SubmitLoading } from "../../components/SubmitLoading";

type Roles = {
    id: number;
    type: string;
}

export default function NewUserPage() {
    const dispatch = useDispatch<AppDispatch>()
    const [roles, setRoles] = useState<Roles[] | []>([])
    const [selectedRole, setSelectedRole] = useState<number | null>(null)
    const [inputs, setInputs] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        password: "123"
    })

    const [isLoading, setIsLoading] = useState(false)
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
            } catch (error) {
                console.log(error)
            }
        }

        loadRoles()
    }, [])

    const handleCreateUser = async (e: FormEvent) => {
        e.preventDefault()

        if (!inputs.email || !inputs.name || !inputs.lastname || !inputs.phone || selectedRole === null) {
            return toast.error("Preencha todos os campos!")
        }

        dispatch(createUser(inputs, selectedRole))
        setInputs({
            name: "",
            lastname: "",
            email: "",
            phone: "",
            password: "123"
        })
        setSelectedRole(null)
        toast.success("Criado com sucesso!")
    }

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(parseInt(e.target.value, 10))
    };

    return (
        <>
            <Navbar />
            <form className="max-w-2xl mx-auto border border-1 p-5 mt-10">
                <h2 className="my-3 text-center text-2xl">Novo Usuário</h2>
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
                    >
                        <option value="">Selecione um tipo</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>{role.type}</option>
                        ))}
                    </select>
                </div>
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                    onClick={handleCreateUser}
                    disabled={isLoading}
                >
                    {isLoading ? <SubmitLoading /> : 'Cadastrar'}
                </button>
            </form>
        </>
    )
}
