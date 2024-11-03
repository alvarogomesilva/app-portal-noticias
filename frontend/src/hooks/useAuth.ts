import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../types";
import { useEffect, useState } from "react";
import { getToken } from "../utils/getToken";
import { fetchUser } from "../store/user/action";

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function checkAuthentication() {
        const token = getToken()
        if (token) {
          await dispatch(fetchUser());
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
  
      checkAuthentication();
    }, [dispatch]);

    return { user, loading }
}