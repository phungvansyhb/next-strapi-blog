import NewsletterOptin from '@/components/NewsletterBox';
import Content from './Content';
import {Category, PageProps, Course} from "@/lib/types";
import {getListLatestCourse, getListPopularCourse, getListCourse} from "@/service/courseService";
import {convertRawCoursesToCourses} from "@/DTOs/courseDTO";
import {Pagination} from "@/typeDefs/rawTypes";
import {Metadata} from "next";
import {genSiteMetaData} from "@/constants/sitemetaData";
import {getListCategory} from "@/service/categoryService";
import {convertRawCategoriesToCategories} from "@/DTOs/categoryDTO";

export const metadata: Metadata = genSiteMetaData('Khoá học')

/*TODO : fetch pagination*/
async function fetchCourse({title  , category}:{title? : string, category? : string}): Promise<{ data: Course[], pagination: Pagination }> {
    'use server'
    const rawCourses = await getListCourse({title, category})
    return {data: convertRawCoursesToCourses(rawCourses.data), pagination: rawCourses.meta.pagination}
}

async function fetchPopularCourse(): Promise<Course[]> {
    const rawCourses = await getListLatestCourse()
    return convertRawCoursesToCourses(rawCourses.data)
}

async function fetchLatestCourse(): Promise<Course[]> {
    const rawCourses = await getListPopularCourse()
    return convertRawCoursesToCourses(rawCourses.data)
}

async function fetchCategories(): Promise<Category[]> {
    const categoriesRaw = await getListCategory()
    return convertRawCategoriesToCategories(categoriesRaw.data, 'course')
}


export default async function BlogPage({params , searchParams} : PageProps) {
    const searchParamsObj = await searchParams

    const [latestCourses, popularCourses, Courses, categories] = await Promise.all([
        fetchLatestCourse(),
        fetchPopularCourse(),
        fetchCourse({title : searchParamsObj['title'] as string , category : searchParamsObj['category'] as string}),
        fetchCategories(),
    ]);
    return (
        <div className="">
            <NewsletterOptin/>
            <Content popularCourses={popularCourses} latestCourses={latestCourses}
                     allCourse={Courses} fetchAllCourse={fetchCourse}
                     categories={categories}
            />
        </div>
    );
}
