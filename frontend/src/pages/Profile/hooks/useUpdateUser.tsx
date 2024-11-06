import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../types";
import { FormEvent, useState } from "react";
import { updateUser } from "../../../store/user/action";
import toast from "react-hot-toast";
import { AppDispatch } from "../../../store/store";


const useUpdateUser = (preview: File | undefined) => {
    const user = useSelector((state: RootState) => state.user.currentUser)
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    
    const [inputs, setInputs] = useState({
        name: user?.name || "",
        lastname: user?.lastname || "",
        email: user?.email || "",
        phone: user?.phone || "",
        avatar: user?.avatar
    });

    const handleUpdateUser = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', inputs.name);
        formData.append('lastname', inputs.lastname);
        formData.append('email', inputs.email);
        formData.append('phone', inputs.phone);
        
        if (preview && preview instanceof File) {
            formData.append('avatar', preview);
        }

        try {
            await dispatch(updateUser(formData));
            toast.success("Atualizado com sucesso!");
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            toast.error("Erro ao atualizar usuário");
        } finally {
            setIsLoading(false);
        }
    }

    return {
        inputs,
        setInputs,
        isLoading,
        handleUpdateUser,
    }
}

export default useUpdateUser;