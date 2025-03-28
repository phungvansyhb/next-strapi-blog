import {RawArticle, RawPost} from "@/typeDefs/rawTypes";
import {Article, Post} from "@/lib/types";
import  readingTime from 'reading-time'

export function convertRawPostToPost(rawPost : RawPost):Post{
    if(!rawPost) throw Error("require parameter type RawPost")
    return {
        id : rawPost.id,
        author : {
            name : rawPost.attributes.author?.data?.attributes?.name,
            avatar : process.env.NEXT_PUBLIC_SERVER_URL+ rawPost.attributes.author?.data?.attributes?.avatar?.data?.attributes?.formats.thumbnail?.url || '',
            altText : rawPost.attributes.author?.data?.attributes?.avatar?.data?.attributes?.alternativeText,
            description : rawPost.attributes.author.data.attributes.description
        },
        title : rawPost.attributes.name,
        slug : rawPost.attributes.slug,
        date : rawPost.attributes.publishedAt,
        description : rawPost.attributes.description,
        imageUrl : process.env.NEXT_PUBLIC_SERVER_URL + (rawPost.attributes.cover?.data?.attributes?.formats?.large?.url || rawPost.attributes.cover?.data?.attributes?.url || ''),
        cover : {
            altText : rawPost.attributes.cover?.data?.attributes?.alternativeText,
            fileUrl : process.env.NEXT_PUBLIC_SERVER_URL+ (rawPost.attributes.cover?.data?.attributes?.formats?.large?.url  || rawPost.attributes.cover?.data?.attributes?.url || ''),
            width : rawPost.attributes.cover?.data?.attributes?.width,
            height : rawPost.attributes.cover?.data?.attributes?.height,
        },
        category : rawPost.attributes?.category?.data?.attributes?.name,
        createdAt : rawPost.attributes.createdAt,
        modifiedAt : rawPost.attributes.publishedAt,
        readTime : 'khoảng '+ rawPost.attributes?.readingTime + ' phút'
    }
}

export function convertRawPostsToPosts(rawPosts : RawPost[]):Post[]{
    if(!rawPosts) return []
    return rawPosts.map(item=>convertRawPostToPost(item))
}
export function convertRawArticleToArticle(rawPost: RawArticle):Article{
    return  {
        id : rawPost.id,
        author : {
            name : rawPost.author.name,
            avatar : process.env.NEXT_PUBLIC_SERVER_URL+rawPost.author.avatar.formats.thumbnail?.url || '',
            altText : rawPost.author.avatar.alternativeText,
            description : rawPost.author.description
        },
        description : rawPost.description,
        title : rawPost.name,
        slug : rawPost.slug,
        date :  rawPost.publishedAt,
        imageUrl : process.env.NEXT_PUBLIC_SERVER_URL+rawPost.cover?.url || '',
        cover : {
            altText : rawPost.cover.alternativeText,
            fileUrl : process.env.NEXT_PUBLIC_SERVER_URL+ (rawPost.cover.formats.medium?.url || rawPost.cover?.url || '' ),
            width : rawPost.cover.width,
            height : rawPost.cover.height,
        },
        category : rawPost.category.name,
        readTime : readingTime(rawPost.content).text,
        content : rawPost.content,
        related_post : rawPost.related_article.map(item=>({...item, cover : {...item.cover , url : process.env.NEXT_PUBLIC_SERVER_URL+
                    (item.cover.formats.medium?.url || item.cover.url)
        }})),
        seo : rawPost.seo,
        createdAt : rawPost.createdAt,
        modifiedAt : rawPost.publishedAt,
        viewCount : rawPost.viewCount
    }
}
