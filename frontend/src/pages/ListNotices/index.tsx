import { useEffect, useState } from "react";
import { api, BASE_URL } from "../../services/api";
import { Navbar } from "../../components/Navbar";
import { Link } from "react-router-dom";
import { getToken } from "../../utils/getToken";
import { Dialog } from "../../components/Dialog";

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

export const ListNotices = () => {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [isShowDialog, setIsShowDialog] = useState(false);
    const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchNews() {
            const token = getToken();
            try {
                const request = await api.get('/news', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setNotices(request.data);
            } catch (error) {
                console.log("Erro ao carregar notícias:", error);
            }
        }

        fetchNews();
    }, []);

    const handleDeleteClick = (id: string) => {
        setSelectedNoticeId(id);
        setIsShowDialog(true);
    };

    const handleDialogClose = () => {
        setIsShowDialog(false);
        setSelectedNoticeId(null);
    };

    return (
        <>
            {isShowDialog && (
                <Dialog 
                    isOpen={isShowDialog}
                    onClose={handleDialogClose}
                    noticeId={selectedNoticeId}
                />
            )}
            <Navbar />
            <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mt-10 px-4">
                {notices.length > 0 ? (
                    notices.map((notice) => (
                        <div
                            key={notice.id}
                            className="flex flex-col justify-between max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg"
                        >
                            <img 
                                className="w-full h-56 object-cover" 
                                src={`${BASE_URL}/files/banners/${notice.image}`} 
                                alt="Imagem do Card" 
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-bold text-gray-800">{notice.title}</h2>
                                <p className="text-gray-500 text-sm mt-2">{notice.description}</p>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-around mt-4 md:mt-6">
                                    <Link 
                                        to={`/edit-notice/${notice.id}`} 
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Atualizar
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteClick(notice.id)}
                                        className="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-red-500 rounded-lg border border-gray-200 hover:bg-red-700 focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        Deletar
                                    </button>
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
