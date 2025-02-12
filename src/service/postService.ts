import {Pagination, RawPost} from "@/service/rawTypes";

export async function getListPost(): Promise<{data : RawPost[],meta:{pagination : Pagination}}> {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/articles?select=documentId&select[1]=title&populate[0]=cover&populate[1]=category&populate[2]=author&select[2]=description' +
        '&select[3]=slug&select[4]=publishedAt&populate[3]=author.avatar&select[5]=readingTime',
        {
            headers: {
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_SERVER_TOKEN
            }
        }).then(res=>res.json())
}

export async function getDetailArticle(slug: string):Promise<RawPost> {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/articles/' +
        '?populate[author][populate]=avatar' +
        '&populate[category][populate]=cover' +
        '&populate[related_article][populate]=*' +
        '&populate[comment][populate]=*' +
        '&populate[cover][populate]=*' +
        '&populate[seo][populate][metaSocial][populate]=*' +
        '&populate[seo][populate][metaImage]=*' +
        '&filters[slug][$eq]='+slug ,
        {
            headers: {
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_SERVER_TOKEN
            }
        }).then(res => res.json()).then(data=>data.data[0])
}

