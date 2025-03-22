import NewsletterOptin from '@/components/NewsletterBox';
import Content from './Content';
import {App, Author, Category, PageProps} from "@/lib/types";
import {Pagination} from "@/typeDefs/rawTypes";
import {Metadata} from "next";
import {genSiteMetaData} from "@/constants/sitemetaData";
import {getListApps, getListLatestApp, getListPopularApp} from "@/service/appService";
import {convertRawAppsToApps} from "@/DTOs/appDTO";
import {getListCategory} from "@/service/categoryService";
import {convertRawCategoriesToCategories} from "@/DTOs/categoryDTO";
import {getListAuthor} from "@/service/postService";

export const metadata: Metadata = genSiteMetaData('Ứng dụng')

/*TODO : fetch pagination*/
async function fetchApp({title , author , category}:{title? : string, author?:string , category? : string}): Promise<{data : App[] , pagination : Pagination}> {
    'use server'
    const rawApps = await getListApps({author , category , title})
    return {data : convertRawAppsToApps(rawApps.data), pagination : rawApps.meta.pagination }
}

async function fetchPopularApps(): Promise<App[]> {
    const rawApps = await getListPopularApp()
    return convertRawAppsToApps(rawApps.data)
}

async function fetchLatestApps(): Promise<App[]> {
    const rawApps = await getListLatestApp()
    return convertRawAppsToApps(rawApps.data)
}

async function fetchCategories(): Promise<Category[]> {
    const categoriesRaw = await getListCategory()
    return convertRawCategoriesToCategories(categoriesRaw.data, 'app')
}

async function fetchAuthors(): Promise<Author[]> {
    const rawType = await getListAuthor()
    return rawType.data.map(c => ({
        id: c.id,
        name: c.attributes.name,
        avatar: '',
        altText: '',
        description : ''

    }))
}

export default async function BlogPage({params , searchParams} : PageProps) {
    const searchParamsObj = await searchParams

    const [latestApps, popularApps , apps , categories , authors] = await Promise.all([
        fetchLatestApps(),
        fetchPopularApps(),
        fetchApp({title : searchParamsObj['title'] as string , category : searchParamsObj['category'] as string , author : searchParamsObj['author'] as string}),
        fetchCategories(),
        fetchAuthors()
    ]);
  return (
    <div className="">
      <NewsletterOptin />
      <Content popularApps={popularApps} latestApps={latestApps} allApp={apps} fetchAllApp={fetchApp} authors={authors} categories={categories}/>
    </div>
  );
}
