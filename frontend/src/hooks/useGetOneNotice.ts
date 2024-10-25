import { useEffect, useState } from "react"
import { getToken } from "../utils/getToken"
import { api } from "../api"

interface Notice {
    id: number;
    title: string;
    description: string;
    image: string;
}

export const useGetOneNotice = (id: string) => {
    const [notice, setNotice] = useState<Notice | null>()

        useEffect(() => {
            async function getOneNotice() {
                const token = getToken()
                try {
                    const request = await api.get(`/notice/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setNotice(request.data)
                    
                } catch (error) {
                    console.log(error)
                }
            }

            getOneNotice()
        }, [])
    

    return { notice }
}