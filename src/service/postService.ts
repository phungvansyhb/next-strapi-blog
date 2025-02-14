import {Pagination, RawArticle, RawPost, Comment} from "@/service/rawTypes";

export async function getListPost(): Promise<{ data: RawPost[], meta: { pagination: Pagination } }> {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/articles?select=documentId' +
        '&select[1]=title' +
        '&populate[0]=cover' +
        '&populate[1]=category' +
        '&populate[2]=author' +
        '&select[2]=description' +
        '&select[3]=slug' +
        '&select[4]=publishedAt' +
        '&populate[3]=author.avatar' +
        '&select[5]=readingTime',
        {
            headers: {
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_SERVER_TOKEN
            }
        }).then(res => res.json())
}

export async function getDetailArticle(slug: string): Promise<RawArticle> {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/find-art-by-slug/' +
        '?populate[author][populate]=avatar' +
        '&populate[category][populate]=cover' +
        '&populate[related_article][populate]=*' +
        '&populate[comment][populate]=*' +
        '&populate[cover][populate]=*' +
        '&populate[seo][populate][metaSocial][populate]=*' +
        '&populate[seo][populate][metaImage]=*' +
        '&filters[slug][$eq]=' + slug,
        {
            headers: {
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_SERVER_TOKEN
            }
        }).then(res => res.json())
}

export async function getListLatestPost(): Promise<{ data: RawPost[], meta: { pagination: Pagination } }> {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/articles?select=documentId' +
        '&select[1]=title' +
        '&populate[0]=cover' +
        '&populate[1]=category' +
        '&populate[2]=author' +
        '&select[2]=description' +
        '&select[3]=slug' +
        '&select[4]=publishedAt' +
        '&populate[3]=author.avatar' +
        '&select[5]=readingTime' +
        '&sort[publishedAt]=desc' +
        '&pagination[limit]=4',
        {
            headers: {
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_SERVER_TOKEN
            }
        }).then(res => res.json())
}

export async function getListPopularPost(): Promise<{ data: RawPost[], meta: { pagination: Pagination } }> {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/articles?select=documentId' +
        '&select[1]=title' +
        '&populate[0]=cover' +
        '&populate[1]=category' +
        '&populate[2]=author' +
        '&select[2]=description' +
        '&select[3]=slug' +
        '&select[4]=publishedAt' +
        '&populate[3]=author.avatar' +
        '&select[5]=readingTime' +
        '&sort[viewCount]=desc' +
        '&pagination[limit]=4',
        {
            headers: {
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_SERVER_TOKEN
            }
        }).then(res => res.json())
}

export type CreateComment = {
    authorName: string,
    email?: string,
    phone?: string,
    content: string,
    article: {
        connect: number[]
    }
}

export async function getListCommentBySlug(slug: string): Promise<{
    data: { id: string, attributes: Comment }[],
    meta: { pagination: Pagination }
}> {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/comments?filters[article][slug]=${slug}&sort[createdAt]=desc`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + process.env.NEXT_PUBLIC_SERVER_TOKEN
        },
        next: { tags: ['comment'] }

    }).then(res => res.json())
}


export async function createComment(data: CreateComment) {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + process.env.NEXT_PUBLIC_SERVER_TOKEN
        },
        body: JSON.stringify({data})
    })
}