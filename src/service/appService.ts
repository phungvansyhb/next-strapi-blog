import {Comment, Pagination, RawApp, RawAppDetail, RawArticle, RawPost} from "@/service/rawTypes";
import {Author} from "@/lib/types";

export async function getListApps(): Promise<{ data: RawPost[], meta: { pagination: Pagination } }> {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/apps?select=documentId' +
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


export async function getListLatestApp(): Promise<{ data: RawPost[], meta: { pagination: Pagination } }> {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/apps?select=documentId' +
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

export async function getListPopularApp(): Promise<{ data: RawPost[], meta: { pagination: Pagination } }> {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/apps?select=documentId' +
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

export async function getDetailApp(slug: string): Promise<RawAppDetail> {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/find-app-by-slug/' +
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

export async function getListAppCommentBySlug(slug: string): Promise<{
    data: { id: string, attributes: Comment }[],
    meta: { pagination: Pagination }
}> {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/comments?filters[app][slug]=${slug}&sort[createdAt]=desc`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + process.env.NEXT_PUBLIC_SERVER_TOKEN
        },
        next: { tags: ['comment'] }

    }).then(res => res.json())
}

