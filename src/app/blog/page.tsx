import NewsletterOptin from '@/components/NewsletterBox';
import Content from './Content';
import {Author, Category, Post} from "@/lib/types";
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
async function fetchArticle(): Promise<{ data: Post[], pagination: Pagination }> {
    'use server'
    const rawPosts = await getListPost()
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

export default async function BlogPage() {
    const [latestPosts, popularPosts, posts, categories, authors] = await Promise.all([
        fetchLatestArticle(),
        fetchPopularArticle(),
        fetchArticle(),
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
