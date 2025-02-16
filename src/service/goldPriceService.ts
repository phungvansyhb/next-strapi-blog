import xml2json from '@hendt/xml2json'
import {PriceGold} from "@/service/rawTypes";
import {GoogleGenerativeAI} from "@google/generative-ai";

export async function getGoldPriceByDoji() : Promise<PriceGold>{
    const data = await fetch('http://giavang.doji.vn/api/giavang/?api_key=258fbd2a72ce8481089d88c678e9fe4f').then(data=>data.text())
    const response2 = xml2json(data)
    return response2 as PriceGold
}

export async function getGoldPriceByGemini() : Promise<string | undefined>{
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
        const prompt = "Hãy cho tôi biết giá vàng nhẫn, và vàng thỏi hôm nay ở Việt Nam, theo format giống mẫu sau : {name:$1, buy:$2, sell:$3} từ các cửa hàng PNJ,SJC.Trả về dữ liệu dạng json "
        const result = await model.generateContent(prompt)
        const response = await result.response;
        return response.text()
    } catch (error) {
        console.error(error)
    }
}