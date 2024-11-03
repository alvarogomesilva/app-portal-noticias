import { api } from "../../api"; 
import { getToken } from "../../utils/getToken";

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    noticeId: string | null;
}

export const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, noticeId }) => {
    
    const handleDelete = async () => {
        if (!noticeId) return;

        const token = getToken();
        try {
            await api.delete(`/notice/${noticeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Noticia exluida')
            
            onClose(); 
        } catch (error) {
            console.error("Erro ao deletar notícia:", error);
            
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
                <button
                    type="button"
                    className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                    onClick={onClose}
                >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="p-4 md:p-5 text-center">
                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500">Tem certeza que deseja excluir?</h3>
                    <div className="flex justify-center">
                        <button
                            onClick={handleDelete}
                            type="button"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 mr-2"
                        >
                            Sim, tenho!
                        </button>
                        <button
                            onClick={onClose}
                            type="button"
                            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                        >
                            Não, cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};