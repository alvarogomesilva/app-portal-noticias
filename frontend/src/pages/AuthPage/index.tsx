import { useDispatch } from "react-redux";
import { Navbar } from "../../components/Navbar";
import { FormEvent, useState } from "react";
import { login } from "../../store/user/action";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await dispatch(login(inputs));
            // Se o login for bem-sucedido, redirecione para a página inicial
            if (localStorage.getItem('@u')) {
                navigate('/');

            }
        } catch (error) {
            console.error('Erro de login:', error);
            // Se ocorrer um erro, mantenha o usuário na página de login
            // Não é necessário fazer nada aqui, o usuário permanecerá na mesma página
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />

            <div className="w-full bg-gray-50 flex flex-col sm:justify-center items-center pt-9">
                <div className="w-full sm:max-w-md p-5 mx-auto pt-9 border-2 rounded">
                    <h2 className="mb-6 text-center text-3xl font-bold text-blue-900">Login</h2>
                    <form>
                        <div className="mb-5">
                            <label className="block mb-1" >Email</label>
                            <input id="email" type="text" name="email" className="py-2 px-3  border-0 ring-2 ring-gray-300  focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
                                value={inputs.email}
                                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-1">Senha</label>
                            <input id="password" type="password" name="password" className="py-2 px-3  border-0 ring-2 ring-gray-300  focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
                                value={inputs.password}
                                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                            />
                        </div>

                        <div className="mt-8">
                            <button
                                onClick={handleLogin}
                                className="w-full inline-flex items-center justify-center px-4 py-4 bg-blue-800 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-blue-900 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition">{loading ? 'Logando...': 'Entrar'}</button>
                        </div>

                    </form>
                </div>
            </div>

        </>
    )
}