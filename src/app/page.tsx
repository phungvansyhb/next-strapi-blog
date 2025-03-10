import NewsletterOptin from '@/components/NewsletterBox';
import {Metadata} from 'next';
import {appInfo, genSiteMetaData} from "@/constants/sitemetaData";
import {ContainerScroll} from "@/components/ui/container-scroll-animation";
import {Boxes} from "@/components/ui/background-boxes";
import {ColourfulText} from "@/components/ui/colourful-text";

export const metadata: Metadata = genSiteMetaData('Trang chủ')

export default async function Home() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": appInfo.siteURL
        },
        "name": appInfo.siteName,
        "description": metadata.description,
        "image": [
            {
                "@type": "ImageObject",
                "url": "https://example.com/logo.jpg",
                "width": 200,
                "height": 100
            }
        ],
        "publisher": {
            "@type": "Person",
            "name": "Phung Van Sy, Michel",
            "url": "https://github.com/phungvansyhb"
        },
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Trang chủ",
                    "item": appInfo.siteURL
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Blog",
                    "item": appInfo.siteURL + '/blog'
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Category",
                    "item": appInfo.siteURL + '/danh-muc'
                },

            ]
        },
    }
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd, null, 2)}}
            />
            <div
                className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center ">
                <div
                    className="absolute inset-0 w-full h-full bg-slate-900 z-1 [mask-image:radial-gradient(transparent,white)] pointer-events-none"/>
                <Boxes/>
                <NewsletterOptin/>
            </div>
                <div className='grid grid-cols-5 max-w-screen-lg mx-auto'>
                <div className='col-span-2 hidden md:block self-center'>
                    <h2 className="text-4xl md:text-[3.5rem] font-bold mt-1 leading-none text-pretty">
                        Phần mềm {'\n'} <ColourfulText text="độc đáo" />
                    </h2>
                    <div className='pt-8'>
                        AdPIXABAY, 와우회원은 로켓배송 전 상품 무료배송 오늘주문 내일도착!
                        꼭 필요한 제품은 로켓배송으로 빠르게, 정기배송으로 더 저렴하게
                    </div>
                </div>
                <div className='col-span-5 md:col-span-3'>
                    <ContainerScroll
                        titleComponent={<div className='md:hidden'>
                            <h2 className="text-4xl md:text-[3.5rem] font-bold mt-1 leading-none text-pretty">
                                Phần mềm {'\n'} <ColourfulText text="độc đáo"/>
                            </h2>
                            <div className='pt-8'>
                                AdPIXABAY, 와우회원은 로켓배송 전 상품 무료배송 오늘주문 내일도착!
                                꼭 필요한 제품은 로켓배송으로 빠르게, 정기배송으로 더 저렴하게
                            </div>
                        </div>}
                    >
                        <img
                            src={`/linear.webp`}
                            alt="hero"
                            height={720}
                            width={1400}
                            className="mx-auto rounded-2xl object-cover h-full object-left-top"
                            draggable={false}
                        />
                    </ContainerScroll>
                </div>
            </div>
                <div className='grid grid-cols-5 max-w-screen-lg mx-auto'>
                <div className='col-span-5 md:col-span-3'>
                    <ContainerScroll
                        titleComponent={<div className='md:hidden'>
                            <h2 className="text-4xl md:text-[3.5rem] font-bold mt-1 leading-none text-pretty">
                                Khóa học <ColourfulText text=" chất lượng" />
                            </h2>
                            <div className='pt-8'>
                                AdPIXABAY, 와우회원은 로켓배송 전 상품 무료배송 오늘주문 내일도착!
                                꼭 필요한 제품은 로켓배송으로 빠르게, 정기배송으로 더 저렴하게
                            </div>
                        </div>}
                    >
                        <img
                            src={`/course.jpg`}
                            alt="hero"
                            height={720}
                            width={1400}
                            className="mx-auto rounded-2xl object-cover h-full object-left-top"
                            draggable={false}
                        />
                    </ContainerScroll>
                </div>
                <div className='col-span-2 hidden md:block self-center'>
                    <h2 className="text-4xl md:text-[3.5rem] font-bold mt-1 leading-none text-pretty">
                        Khóa học <ColourfulText text=" chất lượng"/>
                    </h2>
                    <div className='pt-8'>
                        AdPIXABAY, 와우회원은 로켓배송 전 상품 무료배송 오늘주문 내일도착!
                        꼭 필요한 제품은 로켓배송으로 빠르게, 정기배송으로 더 저렴하게
                    </div>
                </div>
            </div>

        </>
    );
}
