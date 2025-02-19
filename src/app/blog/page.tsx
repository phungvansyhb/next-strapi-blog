import NewsletterOptin from '@/components/NewsletterBox';
import Content from './Content';
import {Author, Category, PageProps, Post} from "@/lib/types";
import {getListLatestPost, getListPopularPost, getListPost} from "@/service/postService";
import {convertRawPostsToPosts} from "@/service/postDTO";
import {Pagination} from "@/service/rawTypes";
import {Metadata} from "next";
import {genSiteMetaData} from "@/constants/sitemetaData";
import {getListCategory} from "@/service/categoryService";
import {convertRawCategoriesToCategories} from "@/service/categoryDTO";
import {getListAuthor} from "@/service/postService";

export const metadata: Metadata = genSiteMetaData('blog')

/*TODO : fetch pagination*/
async function fetchArticle({title , author , category}:{title? : string, author?:string , category? : string}): Promise<{ data: Post[], pagination: Pagination }> {
    'use server'
    const rawPosts = await getListPost({title, author, category})
    return {data: convertRawPostsToPosts(rawPosts.data), pagination: rawPosts.meta.pagination}
}

async function fetchPopularArticle(): Promise<Post[]> {
    const rawPosts = await getListLatestPost()
    return convertRawPostsToPosts(rawPosts.data)
}

async function fetchLatestArticle(): Promise<Post[]> {
    const rawPosts = await getListPopularPost()
    return convertRawPostsToPosts(rawPosts.data)
}

async function fetchCategories(): Promise<Category[]> {
    const categoriesRaw = await getListCategory()
    return convertRawCategoriesToCategories(categoriesRaw.data, 'article')
}

async function fetchAuthors(): Promise<Author[]> {
    const rawType = await getListAuthor()
    return rawType.data.map(c => ({
        id: c.id,
        name: c.attributes.name,
        avatar: '',
        altText: ''

    }))
}

export default async function BlogPage({params , searchParams} : PageProps) {
    const searchParamsObj = await searchParams

    const [latestPosts, popularPosts, posts, categories, authors] = await Promise.all([
        fetchLatestArticle(),
        fetchPopularArticle(),
        fetchArticle({title : searchParamsObj['title'] as string , category : searchParamsObj['category'] as string , author : searchParamsObj['author'] as string}),
        fetchCategories(),
        fetchAuthors()
    ]);
    return (
        <div className="">
            <NewsletterOptin/>
            <Content popularPosts={popularPosts} latestPosts={latestPosts}
                     allPost={posts} fetchAllPost={fetchArticle}
                     categories={categories} authors={authors}
            />
        </div>
    );
}
