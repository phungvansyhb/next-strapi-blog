import {genSiteMetaData} from "@/constants/sitemetaData";
import {Dayjs} from "@/lib/utils";
import {Metadata} from "next";
import {SolarDate} from "@nghiavuive/lunar_date_vi";
import {Moon, Sun} from "lucide-react";


export const metadata: Metadata = genSiteMetaData(`Lịch âm ngày ${Dayjs().date()} tháng ${Dayjs().month()+1} năm ${Dayjs().year()}`)

export default function LichAmPage() {
    const solar = new SolarDate(new Date());
    const lunarDate = solar.toLunarDate();
    return <div>
        <section className="px-4 sm:px-6 lg:px-8 my-8">
            <div className="max-w-screen-lg mx-auto">
                <h1 className="text-2xl font-semibold mb-6 ">
                    Lịch âm ngày {solar['day']} tháng {solar['month']} năm {solar['year']}
                </h1>
                <div className='grid-cols-2 grid relative'>
                    {/***** Duong lich *********/}
                    <div className='col-span-2 lg:col-span-1 border text-center p-8'>
                        <h3 className='font-semibold py-3 bg-accent flex justify-center gap-2'>Dương lịch <Sun/> </h3>
                        <div className='my-4 text-2xl'>tháng {solar['month']} năm {solar['year']}</div>
                        <div className='font-bold text-8xl '>
                            {solar['day']}
                        </div>
                    </div>
                    {/*<div*/}
                    {/*    className='p-2 flex border text-slate-400 rounded-full absolute left-1/2 transform -translate-x-1/2 bg-white cursor-pointer'*/}
                    {/*    role='button'>*/}
                    {/*    <ArrowRightLeft size={18}/>*/}
                    {/*</div>*/}
                    {/***** Am lich *********/}
                    <div className='col-span-2 lg:col-span-1 border text-center p-8'>
                        <h3 className='font-semibold py-3 bg-accent flex justify-center gap-2'>Âm lịch <Moon/></h3>
                        <div className='my-4 text-2xl'>tháng {lunarDate['month']} năm {lunarDate['year']}</div>
                        <div className='font-bold text-8xl text-red-600'>
                            {lunarDate['day']}
                        </div>
                        <div>
                            Tiết khí <b>{lunarDate.getSolarTerm()}</b>, ngày <b>{lunarDate.getDayName()}</b>,
                            tháng <b>{lunarDate.getMonthName()}</b>, năm <b>{lunarDate.getYearName()}</b>
                        </div>
                    </div>

                </div>
                <div className='text-center py-3 bg-accent font-semibold'>Giờ hoàng đạo</div>
                <div className='mt-2 flex flex-wrap gap-2 justify-center'>
                    {lunarDate.getLuckyHours().map((item, index) => <span key={item.name}>{item.name} ({item.time[0]} giờ - {item.time[1]} giờ )
                        {index!==lunarDate.getLuckyHours().length-1 && <span className='text-accent ml-2'>|</span>}</span>)}
                </div>
            </div>
        </section>
    </div>
}