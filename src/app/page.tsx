import NewsletterOptin from '@/components/NewsletterBox';
import PostList from '@/components/PostList';
import {Metadata} from 'next';
import {getListPost} from "@/service/postService";
import {convertRawPostsToPosts} from "@/service/postDTO";
import {appInfo, genSiteMetaData} from "@/constants/sitemetaData";

export const metadata: Metadata = genSiteMetaData('Trang chủ')

export default async function Home() {
    const posts = await getListPost({})
    const allPosts = convertRawPostsToPosts(posts.data)
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
                    "item": appInfo.siteURL + '/categorie'
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
            <NewsletterOptin/>
            <PostList posts={allPosts}/>
        </>
    );
}
