import { Navbar } from "../../components/Navbar";
import { FaBlog } from "react-icons/fa";
import { SubmitLoading } from "../../components/SubmitLoading";
import useLogin from "./hooks/useLogin";


const Login = () => {
    const { inputs, setInputs, handleLogin, loading } = useLogin();

    return (
        <>
            <Navbar />
            <div className="w-full flex flex-col sm:justify-center items-center pt-9 px-10">
                <div className="w-full sm:max-w-sm p-5 mx-auto pt-9 border rounded-md">
                    <h2 className="mb-6 text-center flex justify-center text-3xl font-bold text-blue-900">
                        <FaBlog size={60} />
                    </h2>
                    <form onSubmit={handleLogin}>
                        <div className="my-6">
                            <input
                                id="email"
                                type="text"
                                name="email"
                                className="py-3 px-3 border-0 ring-2 ring-gray-300 outline-none focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
                                placeholder="Digite seu email"
                                value={inputs.email}
                                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                            />
                        </div>
                        <div className="my-6">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                className="py-3 px-3 border-0 ring-2 ring-gray-300 outline-none focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
                                placeholder="Digite sua senha"
                                value={inputs.password}
                                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                            />
                        </div>
                        <div className="mt-5">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-full px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                {loading ? <SubmitLoading /> : 'Entrar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;