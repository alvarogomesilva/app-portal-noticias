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

            <main className="border border-1 p-5 mt-10 max-w-5xl mx-auto rounded-md">
                <h2 className="text-center">Nova Noticia</h2>
            <form className="flex items-center max-lg:flex-col gap-4">
                <div className=" w-full">
                <img className="h-60 w-full rounded-lg object-cover" src="https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" alt="image description" />
                </div>


               <div className=" w-full">
               <div className="mb-5 mt-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titulo</label>
                    <input
                        type="text"
                        className="py-2 px-2 border-0 ring-2 ring-gray-300 outline-none focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
                        onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
                        value={inputs.title}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
                    <textarea id="message" rows={4} className="py-2 px-2 border-0 ring-2 ring-gray-300 outline-none focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
                    value={inputs.description}
                    onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                    ></textarea>
                </div>

                <button
                    className="text-white bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                    onClick={handleCreateNew}
                    disabled={isLoading}
                >
                    {isLoading ? <SubmitLoading /> : 'Cadastrar'}
                </button>
               </div>
            </form>
            </main>
        </>
    )
}