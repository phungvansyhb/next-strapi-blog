import Link from 'next/link';
import Image from 'next/image';
import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import NewsletterOptin from '@/components/NewsletterBox';
import {Metadata} from 'next';
import {genSiteMetaData} from "@/constants/sitemetaData";
import {getListCategory} from "@/service/categoryService";
import {convertRawCategoriesToCategories} from "@/service/categoryDTO";
import {Category} from "@/lib/types";

export const metadata: Metadata = genSiteMetaData('Danh mục')

function RenderList({title, data}: { title: string, data: Category[] }) {
    if (data.length === 0) return <></>
    return (
        <>
            <h3 className="text-lg font-semibold mb-4 dark:text-white ">
                {title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.map((category) => (
                    <Link key={category.slug} href={`/danh-muc/${category.slug}`}>
                        <Card className="overflow-hidden border-none">
                            <div className="relative aspect-square">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-300 hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 hover:bg-opacity-30"/>
                                <CardContent
                                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                    <h2 className="text-xl font-semibold mb-2 text-white">
                                        {category.name}
                                    </h2>
                                    <Badge variant="secondary" className="bg-white text-black">
                                        {category.count} {title.toLowerCase()}
                                    </Badge>
                                </CardContent>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </>

    )
}

export default async function CategoriesPage() {
    const categoriesRaw = await getListCategory()
    const categoriesArt = convertRawCategoriesToCategories(categoriesRaw.data, 'article')
    const categoriesApp = convertRawCategoriesToCategories(categoriesRaw.data, 'app')
    return (
        <>
            <div className="max-w-screen-lg mx-auto px-4 py-8">
                <h2 className="text-3xl mb-2 font-medium text-gray-900 dark:text-white text-center">
                    Danh mục
                </h2>
                <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Khám phá bộ sưu tập các bài viết, phần mềm được tổ chức cẩn thận theo chủ đề. Mỗi danh mục mang đến
                    cho
                    bạn một góc nhìn độc đáo về những chủ đề mà bạn đam mê.
                </p>
                <RenderList title={'Danh mục bài viết'} data={categoriesArt}/>
                <br/>
                <RenderList title={'Danh mục ứng dụng'} data={categoriesApp}/>
            </div>
            <NewsletterOptin/>
        </>
    );
}
