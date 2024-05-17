import { FormEvent, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { SubmitLoading } from "../../components/SubmitLoading";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { createNotice } from "../../store/notice/action";


export default function NewNoticePage() {
    const dispatch = useDispatch<AppDispatch>()
    const [isLoading, setIsLoading] = useState(false)

    const [inputs, setInputs] = useState({
        title: "",
        description: ""
    })

    const handleCreateNew = async (e: FormEvent) => {
        setIsLoading(true)
        e.preventDefault()

        await dispatch(createNotice(inputs))

        setIsLoading(false)
        setInputs({
            title: "",
            description: ""
        })

    }

    return (
        <>
            <Navbar />

            <form className="max-w-xl mx-auto my-10">
                <img className="h-60 w-full rounded-lg object-cover" src="https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" alt="image description" />


                <div className="mb-5 mt-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titulo</label>
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
                        value={inputs.title}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                    <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={inputs.description}
                    onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                    ></textarea>
                </div>




                <button
                    className="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-sm sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                    onClick={handleCreateNew}
                    disabled={isLoading}
                >
                    {isLoading ? <SubmitLoading /> : 'Cadastrar'}
                </button>
            </form>
        </>
    )
}