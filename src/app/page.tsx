import NewsletterOptin from '@/components/NewsletterBox';
import PostList from '@/components/PostList';
// import {allPosts} from '@/constants/posts';
import {Metadata} from 'next';
import {getListPost} from "@/service/postService";
import {convertRawPostsToPosts} from "@/service/postDTO";
import {genSiteMetaData} from "@/constants/sitemetaData";

export const metadata: Metadata = genSiteMetaData('Trang chủ')

export default async function Home() {
    const posts = await getListPost()

    const allPosts = convertRawPostsToPosts(posts.data)
    console.log(allPosts , posts)
    return (
        <>
            <NewsletterOptin/>
            <PostList posts={allPosts}/>

        </>
    );
}
