import { FormEvent, useRef, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { SubmitLoading } from "../../components/SubmitLoading";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { createNotice } from "../../store/notice/action";
import toast from "react-hot-toast";

export const NewNotice = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File | null>(null); // Usar o tipo File para imagem
    const [banner, setBanner] = useState<string | null>(null);
    const [inputs, setInputs] = useState({
        title: "",
        description: ""
    });

    // Função para pré-visualizar a imagem
    const previewProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setImage(file); // Salva o arquivo de imagem no estado

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setBanner(reader.result as string); // Exibe a imagem em base64 para pré-visualização
                }
            };
            reader.readAsDataURL(file); // Converte o arquivo para base64
        }
    };

    const handleCreateNew = async (e: FormEvent) => {
        e.preventDefault();

        // Verificação para garantir que todos os campos estejam preenchidos e que a imagem tenha sido selecionada
        if (!inputs.title || !inputs.description || !image) {
            alert('Por favor, preencha todos os campos e adicione uma imagem.');
            return;
        }

        setIsLoading(true);

        // Cria um objeto FormData
        const formData = new FormData();
        formData.append('title', inputs.title); // Adiciona o título
        formData.append('description', inputs.description); // Adiciona a descrição

        // Se houver uma imagem, envie o arquivo original (não base64)
        if (image) {
            formData.append('banner', image); // Aqui está o arquivo da imagem (não a string base64)
        }

        try {
            // Dispatch para o Redux, passando o formData
            await dispatch(createNotice(formData));
            toast.success("Atualizado com sucesso!");
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            toast.error("Erro ao atualizar");
        } finally {
            setIsLoading(false);
            // Limpeza dos estados
            setInputs({ title: "", description: "" });
            setImage(null); // Limpar imagem
            setBanner(null); // Limpar pré-visualização
        }
    };

    return (
        <>
            <Navbar />

            <main className="border border-1 p-5 mt-10 max-w-5xl mx-auto rounded-md">
                <h2 className="text-center">Nova Notícia</h2>
                <form onSubmit={handleCreateNew} className="flex items-center max-lg:flex-col gap-4">
                    <div className="w-full">
                        {/* Exibe a imagem de pré-visualização se houver */}
                        <label
                            htmlFor="dropzone-file"
                            className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            {/* Se banner existir, mostra a imagem como background */}
                            {banner ? (
                                <img
                                    src={banner}
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
                            {/* Input de arquivo escondido */}
                            <input
                                id="dropzone-file"
                                type="file"
                                ref={ref}
                                className="hidden"
                                onChange={previewProfile} // Atualiza imagem e banner
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
                            disabled={isLoading}
                        >
                            {isLoading ? <SubmitLoading /> : 'Cadastrar'}
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}
