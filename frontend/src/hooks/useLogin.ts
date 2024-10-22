import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { AppDispatch } from "../store/store";
import { login } from "../store/user/action";

export function useLogin() {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({ email: "", password: "" });

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await dispatch(login(inputs));
            if (localStorage.getItem('@u')) {
                navigate('/');
                toast.success('Seja bem-vindo!');
            } else {
                toast.error('Email/senha incorretos!');
            }
        } catch (error) {
            console.error('Erro de login:', error);
            toast.error('Ocorreu um erro ao fazer login.');
        } finally {
            setLoading(false);
        }
    };

    return {
        inputs,
        setInputs,
        handleLogin,
        loading,
    };
}
