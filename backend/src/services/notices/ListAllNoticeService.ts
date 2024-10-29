import { Prisma } from "../../prisma"

export const ListAllNoticeService = async ({page}: {page: string}) => {
    let take = 6
    let pageNumber = parseInt(page) || 1
    let skip = (pageNumber - 1) * take
 
    
    try {
        const news = await Prisma.new.findMany({
            take: take,
            skip: skip,
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ],
           select: {
            id: true,
            title: true,
            description: true,
            image: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    name: true,
                    avatar: true
                }
            }
           }
        })
        const totalNews = await Prisma.new.count();
        const totalPages = Math.ceil(totalNews / take);

        return {
            news,
            pagination: {
                currentPage: pageNumber,
                totalPages,
                totalNews,
            }
        };
    } catch (error) {
        console.log(error)
    }
}