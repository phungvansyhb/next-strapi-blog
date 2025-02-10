export async function getListPost() {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/articles?select=documentId&select[1]=title&populate[0]=cover&populate[1]=category&populate[2]=author&select[2]=description' +
        '&select[3]=slug&select[4]=publishedAt&populate[3]=author.avatar',
        {
            headers: {
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_SERVER_TOKEN
            }
        })
}

export async function getDetailArticle(documentId: string) {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/articles/' + documentId,
        {
            headers: {
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_SERVER_TOKEN
            }
        })
}

export async function getListCategory() {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/categories?populate=*',
        {
            headers: {
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_SERVER_TOKEN
            }
        })
}

export async function getDetailCategory(documentId: string) {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/categories/' + documentId
        ,
        {
            headers: {
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_SERVER_TOKEN
            }
        })
}