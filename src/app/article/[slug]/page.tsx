import {Metadata} from 'next';
import ArticlePageContent from './Content';
import {relatedPosts} from '@/constants/posts';
import {Article, Category, Post} from '@/lib/types';
import {getListCategory} from "@/service/categoryService";
import {convertRawCategoriesToCategories} from "@/service/categoryDTO";
import {getDetailArticle, getListCommentBySlug} from "@/service/postService";
import {convertRawArticleToArticle} from "@/service/postDTO";
import {appInfo} from "@/constants/sitemetaData";
import {Comment, Pagination, RawPost} from "@/service/rawTypes";

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function fetchArticle(slug: string): Promise<Article> {
    const rawArticle = await getDetailArticle(slug)
    return convertRawArticleToArticle(rawArticle);
}

async function fetchCategories(): Promise<Category[]> {
    const categoriesRaw = await getListCategory()
    return convertRawCategoriesToCategories(categoriesRaw.data, 'article')
}

async function fetchComments(slug: string): Promise<{
    data: { id: string, attributes: Comment }[],
    meta: { pagination: Pagination }
}>{
    return getListCommentBySlug(slug)
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {slug} = await params;
    if (!slug) return {};
    const article = await fetchArticle(slug);
    const seoMeta = article.seo
    const facebookSocial = article.seo.metaSocial.find(item => item.socialNetwork === 'Facebook')
    const twitterSocial = article.seo.metaSocial.find(item => item.socialNetwork === 'Twitter')
    return {
        metadataBase: new URL(appInfo.siteURL),
        title: seoMeta.metaTitle,
        description: seoMeta.metaDescription,
        keywords: seoMeta.keywords,
        applicationName: appInfo.siteName,
        referrer: "origin",
        alternates: {
            canonical: appInfo.siteURL + '/article/' + article.slug,
        },
        robots: seoMeta.metaRobots,
        authors: {
            name: article.author.name,
            url: process.env.NEXT_PUBLIC_SERVER_URL + article.author.avatar
        },
        category: article.category,
        icons: seoMeta.metaImage.url,
        openGraph: {
            title: facebookSocial?.title,
            description: facebookSocial?.description,
            images: [{
                url: process.env.NEXT_PUBLIC_SERVER_URL + facebookSocial?.image.formats.thumbnail.url!,
                width: facebookSocial?.image.formats.thumbnail.width,
                height: facebookSocial?.image.formats.thumbnail.height,
            }],
            url: appInfo.siteURL + '/article/' + article.slug,
            type: 'website',
            siteName: appInfo.siteName,
        },
        twitter: {
            site: appInfo.siteName,
            images: [{
                url: process.env.NEXT_PUBLIC_SERVER_URL + facebookSocial?.image.formats.thumbnail.url!,
                width: facebookSocial?.image.formats.thumbnail.width,
                height: facebookSocial?.image.formats.thumbnail.height,
            }],
            title: twitterSocial?.title,
            description: twitterSocial?.description,
        },
    };
}

export default async function ArticlePage({params}: Props) {
    const {slug} = await params;

    const [article, categories , comments] = await Promise.all([
        fetchArticle(slug),
        fetchCategories(),
        fetchComments(slug),
    ]);
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": article.title,
        "description": article.description,
        // "image": article.imageUrl,
        "image": [
            {
                "@type": "ImageObject",
                "url": article.imageUrl,
                "width": article.cover.width,
                "height": article.cover.height
            }
        ],
        "datePublished": new Date(article.createdAt).toISOString(),
        "dateModified": new Date(article.modifiedAt).toISOString(),
        "author": [{
            "@type": "Person",
            "name": article.author.name,
            "url": process.env.NEXT_PUBLIC_SERVER_URL + article.author.avatar,
        }],
        "keywords": article.seo.keywords
    }


    const props = {article, categories: categories.slice(0, 5) , comments};
    return (<>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
        <ArticlePageContent {...props} />
    </>)
}
