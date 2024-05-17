import { Dispatch } from "redux";
import { api } from "../../api";
import { getToken } from "../../utils";

export const createNotice = (inputs) => async (dispatch: Dispatch) => {
    try {
        const token = getToken()
        await api.post('/new', inputs, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

    } catch (error) {
        console.log(error)
    }
}