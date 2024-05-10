import { useDispatch } from "react-redux";
import { Navbar } from "../../components/Navbar";
import { FormEvent, useState } from "react";
import { login } from "../../store/user/action";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { FaBlog } from "react-icons/fa";
import { SubmitLoading } from "../../components/SubmitLoading";
import toast from 'react-hot-toast';

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
            if (localStorage.getItem('@u')) {
                navigate('/');
                toast.success('Seja bem-vindo!');
            } else {
                toast.error('Email/senha incorretos!')
            }
        } catch (error) {
            console.error('Erro de login:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />

            <div className="w-full bg-gray-50 flex flex-col sm:justify-center items-center pt-9">
                <div className="w-full sm:max-w-sm p-5 mx-auto pt-9 border rounded-md">
                    <h2 className="mb-6 text-center flex justify-center text-3xl font-bold text-blue-900">
                        <FaBlog size={60} />
                    </h2>
                    <form>
                        <div className="mb-3">
                            <input id="email" type="text" name="email" className="py-1 px-3  border-0 ring-2 ring-gray-300  focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
                                placeholder="Email"
                                value={inputs.email}
                                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                            />
                        </div>
                        <div className="mb-5">
                            <input id="password" type="password" name="password" className="py-1 px-3  border-0 ring-2 ring-gray-300  focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
                                placeholder="Senha"
                                value={inputs.password}
                                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                            />
                        </div>

                        <div className="mt-5">
                            <button
                                onClick={handleLogin}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-full px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? <SubmitLoading /> : 'Entrar'}</button>
                        </div>

                    </form>
                </div>
            </div>

        </>
    )
}