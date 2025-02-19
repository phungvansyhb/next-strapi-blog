import {Pagination, RawCate, RawPost} from "@/service/rawTypes";

export async function getListCategory(): Promise<{data : RawCate[]}> {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/summary-category',
        {
            headers: {
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_SERVER_TOKEN
            }
        }).then(res=>res.json())
}


export async function getDetailCategory(documentId: string) {
    return await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/categories/' + documentId,
        {
            headers: {
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_SERVER_TOKEN
            }
        })
}