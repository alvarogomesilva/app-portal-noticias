import { useSelector } from "react-redux";
import { Navbar } from "../../components/Navbar";
import { RootState } from "../../types";
import { useRef } from "react";

import { SubmitLoading } from "../../components/SubmitLoading";

import { usePreviewImage } from "../../hooks/usePreviewImage";
import { BASE_URL } from "../../services/api";
import useUpdateUser from "./hooks";

const Profile = () => {
    const user = useSelector((state: RootState) => state.user.currentUser);
    const ref = useRef<HTMLInputElement>(null);
    const { image, preview, previewImage } = usePreviewImage()
    const { handleUpdateUser, inputs, isLoading, setInputs } = useUpdateUser(preview)

    return (
        <>
            <Navbar />
            <form className="border border-1 rounded-md p-5 mt-5 max-w-2xl mx-auto" encType="multipart/form-data">
                <div className="my-9">
                    <div className="text-center">
                        <div className="mt-2">
                            <input
                                type="file"
                                className="hidden"
                                ref={ref}
                                onChange={previewImage}
                            />
                            <img
                                src={
                                    image ||
                                    (inputs.avatar !== null ? `${BASE_URL}/files/avatars/${user?.avatar}` : null) ||
                                    "https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                                }
                                alt="Profile"
                                className="w-40 h-40 m-auto rounded-full object-cover"
                            />
                        </div>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
                            onClick={() => ref.current?.click()}
                        >
                            Selecione uma foto
                        </button>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                        <input
                            type="text"
                            className="py-2 px-2  border-0 ring-2 ring-gray-300 outline-none focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
                            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                            value={inputs.name}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sobrenome</label>
                        <input
                            type="text"
                            className="py-2 px-2  border-0 ring-2 ring-gray-300 outline-none focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
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
                            className="py-2 px-2  border-0 ring-2 ring-gray-300 outline-none focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                            value={inputs.email}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                        <input
                            type="text"
                            className="py-2 px-2  border-0 ring-2 ring-gray-300 outline-none focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
                            onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
                            value={inputs.phone}
                            required
                        />
                    </div>
                </div>
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                    onClick={handleUpdateUser}
                    disabled={isLoading}
                >
                    {isLoading ? <SubmitLoading /> : 'Atualizar'}
                </button>
            </form>
        </>
    );
}

export default Profile