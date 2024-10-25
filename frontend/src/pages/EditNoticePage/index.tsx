import { useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar";

import { useGetOneNotice } from "../../hooks/useGetOneNotice";
import { FormEvent, useEffect, useRef, useState } from "react";
import { api, BASE_URL } from "../../api";
import { usePreviewImage } from "../../hooks/usePreviewImage";
import { getToken } from "../../utils/getToken";

export function EditNoticePage() {

    const { noticeId } = useParams()
    const { notice } = useGetOneNotice(noticeId)
    const ref = useRef<HTMLInputElement>(null);
    const { image, preview, previewImage } = usePreviewImage()

    const [inputs, setInputs] = useState({
        idNew: null,
        title: '',
        description: '',
        image: ''
    })

    useEffect(() => {
        if (notice) {
            setInputs({
                idNew: notice.id,
                title: notice.title,
                description: notice.description,
                image: notice.image
            });
        }
    }, [notice]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('idNew', inputs.idNew)
        formData.append('title', inputs.title)
        formData.append('description', inputs.description)
        formData.append('banner', preview)

        try {
            const token = getToken()
            await api.put('/notice', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        } catch (error) {
            console.log(error)
        }

    }


    return (
        <>
            <Navbar />

            <main className="border border-1 p-5 mt-10 max-w-5xl mx-auto rounded-md">
                <h2 className="text-center">Editar Notícia</h2>
                <form onSubmit={handleSubmit} className="flex items-center max-lg:flex-col gap-4">
                    <div className="w-full">

                        <label
                            htmlFor="dropzone-file"
                            className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            {inputs.image ? (
                                <img
                                    src={
                                        image || `${BASE_URL}/files/banners/${inputs.image}`}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                                    </p>
                                </div>
                            )}

                            <input
                                id="dropzone-file"
                                type="file"
                                ref={ref}
                                className="hidden"
                                onChange={previewImage}
                            //onChange={previewProfile} // Atualiza imagem e banner
                            />
                        </label>
                    </div>

                    <div className="w-full">
                        <div className="mb-5 mt-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Título
                            </label>
                            <input
                                type="text"
                                className="py-2 px-2 border-0 ring-2 ring-gray-300 outline-none focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
                                onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
                                value={inputs.title}
                                required
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Descrição
                            </label>
                            <textarea
                                maxLength={160}
                                id="message"
                                rows={4}
                                className="py-2 px-2 border-0 ring-2 ring-gray-300 outline-none focus:ring-blue-600 focus:ring-2 rounded-md mt-1 block w-full"
                                value={inputs.description}
                                onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                        //disabled={isLoading}
                        >
                            Editar
                            {/* {isLoading ? <SubmitLoading /> : 'Cadastrar'} */}
                        </button>
                    </div>
                </form>
            </main>
        </>
    )
} 