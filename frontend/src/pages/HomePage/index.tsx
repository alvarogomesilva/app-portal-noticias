import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { api } from "../../api";


interface Notice {
    id: string;
    title: string;
    description: string;
    image: string;
    user: {
        name: string;
        avatar: string;
    };
}

export default function HomePage() {
    const [notices, setNotices] = useState<Notice[]>([])


    useEffect(() => {
        async function fetchNews() {
            try {
                const request = await api.get('/notices');
                setNotices(request.data)
            } catch (error) {
                console.log("Erro ao carregar notícias:", error);
            }
        }

        fetchNews();
    }, []); 

    return (
        <>
            <Navbar />

            <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto mt-10">

                {notices.length > 0 ? (
                    notices.map((notice) => (

                        <div 
                        key={notice.id}
                        className="flex flex-col justify-between max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg">

                            <img className="w-full h-56 object-cover" src={`http://localhost:3000/files/banners/${notice.image}`} alt="Imagem do Card" />


                            <div className="p-4">
                                <h2 className="text-xl font-bold text-gray-800">{notice.title}</h2>
                                <p className="text-gray-500 mt-2">{notice.description}</p>
                            </div>

                            <div className="p-4">
                                <div className="flex items-center">
                                    <img className="w-10 h-10 rounded-full mr-4" src={`http://localhost:3000/files/avatars/${notice.user.avatar}`} alt="Avatar of Jonathan Reinink" />
                                        <div className="text-sm">
                                            <p className="text-gray-900 leading-none">{notice.user.name}</p>
                                            <p className="text-gray-600">Aug 18</p>
                                        </div>
                                </div>
                            </div>
                        </div>



                    ))
                ) : (
                    <h1>Nenhuma notícia cadastrada!</h1>
                )}
            </div>
        </>
    );
}
