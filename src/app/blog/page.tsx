import NewsletterOptin from '@/components/NewsletterBox';
import Content from './Content';
import {Post} from "@/lib/types";
import {getListLatestPost, getListPopularPost, getListPost} from "@/service/postService";
import {convertRawPostsToPosts} from "@/service/postDTO";
import {Pagination} from "@/service/rawTypes";


/*TODO : fetch pagination*/
async function fetchArticle(): Promise<{data : Post[] , pagination : Pagination}> {
    'use server'
    const rawPosts = await getListPost()
    return {data : convertRawPostsToPosts(rawPosts.data), pagination : rawPosts.meta.pagination }
}

async function fetchPopularArticle(): Promise<Post[]> {
    const rawPosts = await getListLatestPost()
    return convertRawPostsToPosts(rawPosts.data)
}

async function fetchLatestArticle(): Promise<Post[]> {
    const rawPosts = await getListPopularPost()
    return convertRawPostsToPosts(rawPosts.data)
}

export default async function BlogPage() {
    const [latestPosts, popularPosts , posts] = await Promise.all([
        fetchLatestArticle(),
        fetchPopularArticle(),
        fetchArticle()
    ]);
  return (
    <div className="">
      <NewsletterOptin />
      <Content popularPosts={popularPosts} latestPosts={latestPosts} allPost={posts} fetchAllPost={fetchArticle}/>
    </div>
  );
}
