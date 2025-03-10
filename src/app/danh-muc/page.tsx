import Link from 'next/link';
import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import NewsletterOptin from '@/components/NewsletterBox';
import {Metadata} from 'next';
import {genSiteMetaData} from "@/constants/sitemetaData";
import {getListCategory} from "@/service/categoryService";
import {convertRawCategoriesToCategories} from "@/DTOs/categoryDTO";
import {Category} from "@/lib/types";
import LazyImage from "@/components/LazyImage";
export const metadata: Metadata = genSiteMetaData('Danh mục')

function RenderList({type, data}: { type: 'app'|'course', data: Category[] }) {
    if (data.length === 0) return <></>
    return (
        <>
            <h3 className="text-lg font-semibold mb-4 dark:text-white ">
                {type === 'app' ? "Danh mục ứng dụng" : "Danh mục khoá học"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.map((category) => (
                    <Link key={category.slug} href={type === 'app' ? `/ung-dung?category=${category.slug}#search` : `/khoa-hoc?category=${category.slug}#search`}>
                        <Card className="overflow-hidden border-none">
                            <div className="relative aspect-square">
                                <LazyImage src={category.image || '/404.png'} alt={category.name} objectFit='cover' className='aspect-square'  />

                                <div
                                    className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 hover:bg-opacity-30"/>
                                <CardContent
                                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                    <h2 className="text-xl font-semibold mb-2 text-white">
                                        {category.name}
                                    </h2>
                                    <Badge variant="secondary" className="bg-white text-black">
                                        {category.count} {type === 'app' ? ' ứng dụng' : ' khoá học'}
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
    const categoriesCourse = convertRawCategoriesToCategories(categoriesRaw.data, 'course')
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
                <RenderList type='course' data={categoriesCourse}/>
                <br/>
                <RenderList type='app' data={categoriesApp}/>
            </div>
            <NewsletterOptin/>
        </>
    );
}
