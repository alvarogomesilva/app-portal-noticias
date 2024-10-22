import { Dispatch } from "redux";
import { api } from "../../api";
import { getToken } from "../../utils/getToken";

export const createNotice = (formData: FormData) => async (dispatch: Dispatch) => {
    try {
        const token = getToken()

        await api.post('/notice', formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })

    } catch (error) {
        console.log(error)
    }
}