import {Metadata} from 'next';
import appDetailPageContent from './Content';
import {AppDetail, Category} from '@/lib/types';
import {getListCategory} from "@/service/categoryService";
import {convertRawCategoriesToCategories} from "@/service/categoryDTO";
import {appInfo} from "@/constants/sitemetaData";
import {Comment, Pagination} from "@/service/rawTypes";
import {getDetailApp, getListAppCommentBySlug} from "@/service/appService";
import {convertRawAppDetailToAppDetail} from "@/service/appDTO";
import AppPage from "./Content";

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function fetchAppDetail(slug: string): Promise<AppDetail> {
    const rawApp = await getDetailApp(slug)
    return convertRawAppDetailToAppDetail(rawApp);
}

async function fetchCategories(): Promise<Category[]> {
    const categoriesRaw = await getListCategory()
    return convertRawCategoriesToCategories(categoriesRaw.data, 'app')
}

async function fetchComments(slug: string): Promise<{
    data: { id: string, attributes: Comment }[],
    meta: { pagination: Pagination }
}>{
    return getListAppCommentBySlug(slug)
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {slug} = await params;
    if (!slug) return {};
    const appDetail = await fetchAppDetail(slug);
    const seoMeta = appDetail.seo
    const facebookSocial = appDetail.seo.metaSocial.find(item => item.socialNetwork === 'Facebook')
    const twitterSocial = appDetail.seo.metaSocial.find(item => item.socialNetwork === 'Twitter')
    return {
        metadataBase: new URL(appInfo.siteURL),
        title: seoMeta.metaTitle,
        description: seoMeta.metaDescription,
        keywords: seoMeta.keywords,
        applicationName: appInfo.siteName,
        referrer: "origin",
        alternates: {
            canonical: appInfo.siteURL + '/appDetail/' + appDetail.slug,
        },
        robots: seoMeta.metaRobots,
        authors: {
            name: appInfo.siteName,
            url: appInfo.siteURL
        },
        category: appDetail.category,
        icons: seoMeta.metaImage.url,
        openGraph: {
            title: facebookSocial?.title,
            description: facebookSocial?.description,
            images: [{
                url: process.env.NEXT_PUBLIC_SERVER_URL + facebookSocial?.image.formats.thumbnail.url!,
                width: facebookSocial?.image.formats.thumbnail.width,
                height: facebookSocial?.image.formats.thumbnail.height,
            }],
            url: appInfo.siteURL + '/appDetail/' + appDetail.slug,
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

export default async function appDetailPage({params}: Props) {
    const {slug} = await params;

    const [appDetail, categories , comments] = await Promise.all([
        fetchAppDetail(slug),
        fetchCategories(),
        fetchComments(slug),
    ]);
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsappDetail",
        "headline": appDetail.title,
        "description": appDetail.description,
        // "image": appDetail.imageUrl,
        "image": [
            {
                "@type": "ImageObject",
                "url": appDetail.imageUrl,
                "width": appDetail.cover.width,
                "height": appDetail.cover.height
            }
        ],
        "datePublished": new Date(appDetail.createdAt).toISOString(),
        "dateModified": new Date(appDetail.modifiedAt).toISOString(),
        "author": [{
            "@type": "Person",
            "name": appInfo.siteName,
            "url": appInfo.siteURL,
        }],
        "keywords": appDetail.seo.keywords
    }


    const props = {appDetail, categories: categories.slice(0, 5) , comments};
    return (<>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
        <AppPage {...props} />
    </>)
}
