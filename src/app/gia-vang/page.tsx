import {genSiteMetaData} from "@/constants/sitemetaData";
import {Dayjs} from "@/lib/utils";
import {Metadata} from "next";
import {InfoIcon, Moon, Sun} from "lucide-react";
import {getGoldPriceByDoji, getGoldPriceByGemini} from "@/service/goldPriceService";


export const metadata: Metadata = genSiteMetaData(`Giá vàng ngày ${Dayjs().date()} tháng ${Dayjs().month()+1} năm ${Dayjs().year()}`)

export default async function GoldPrice() {
    const data = await getGoldPriceByDoji()
    const data2 = await getGoldPriceByGemini()
    return <div>
        <section className="px-4 sm:px-6 lg:px-8 my-8">
            <div className="max-w-screen-lg mx-auto">
                <h1 className="text-2xl font-semibold mb-6 ">
                    Giá vàng ngày {Dayjs().date()} tháng {Dayjs().month() + 1} năm {Dayjs().year()}
                </h1>
                <span className='text-sm text-slate-400 flex gap-1 items-center'><InfoIcon size={14}/> Giá vàng được lấy theo niêm yết của công ty Doji </span>

                <div>
                    {data.GoldList.DGPlist?.Row?.map(item => <div key={item.Name}>
                        <b>{item.Name}</b> : {item.Buy} : {item.Sell}
                    </div>)}
                </div>
            </div>

        </section>
    </div>
}