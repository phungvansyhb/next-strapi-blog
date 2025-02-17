
export async function subcriberEmail(email: string): Promise<boolean> {
    const data = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/subcribers`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + process.env.NEXT_PUBLIC_SERVER_TOKEN
        },
        method:"POST",
        body : JSON.stringify({data : {email}})

    }).then(res => res.json()) as {
        data: any,
        error : any
        meta: any
    }
    return !(data.error)
}
