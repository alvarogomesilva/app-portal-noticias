import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../../components/Navbar";
import { RootState } from "../../types";
import { FormEvent, useRef, useState } from "react";
import { AppDispatch } from "../../store/store";
import { updateUser } from "../../store/user/action";
import { SubmitLoading } from "../../components/SubmitLoading";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.currentUser);
    const ref = useRef<HTMLInputElement>(null);
    const [photoProfile, setPhotoProfile] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<File | null>(null);
    const [inputs, setInputs] = useState({
        name: user?.name || "",
        lastname: user?.lastname || "",
        email: user?.email || "",
        phone: user?.phone || "",
        avatar: user?.avatar
    });
    const [isUpdating, setIsUpdating] = useState(false);

    const previewProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setAvatar(file)
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setPhotoProfile(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateUser = async (e: FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);

        const formData = new FormData();
        formData.append('name', inputs.name);
        formData.append('lastname', inputs.lastname);
        formData.append('email', inputs.email);
        formData.append('phone', inputs.phone);
        if (avatar) {
            formData.append('avatar', avatar);
        }

        try {
            await dispatch(updateUser(formData));
            toast.success("Atualizado com sucesso!")
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        } finally {
            setIsUpdating(false);
        }
    }

    return (
        <>
            <Navbar />
            <form className="max-w-2xl mx-auto" encType="multipart/form-data">
                <div className="my-9">
                    <div className="text-center">
                        <div className="mt-2">
                            <input
                                type="file"
                                className="hidden"
                                ref={ref}
                                onChange={previewProfile}
                            />
                            <img
                                src={
                                    photoProfile ||
                                    (inputs.avatar !== null ? `http://localhost:3000/files/${user?.avatar}` : null) ||
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                            value={inputs.name}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sobrenome</label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                            value={inputs.email}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
                            value={inputs.phone}
                            required
                        />
                    </div>
                </div>
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                    onClick={handleUpdateUser}
                    disabled={isUpdating}
                >
                    {isUpdating ? <SubmitLoading /> : 'Atualizar'}
                </button>
            </form>
        </>
    );
}
