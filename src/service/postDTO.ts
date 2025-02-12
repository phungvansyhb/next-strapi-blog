import {RawArticle, RawPost} from "@/service/rawTypes";
import {Article, Post} from "@/lib/types";
import  readingTime from 'reading-time'

export function convertRawPostToPost(rawPost : RawPost):Post{
    if(!rawPost) throw Error("require parameter type RawPost")
    return {
        id : rawPost.id,
        author : {
            name : rawPost.attributes.author.data.attributes.name,
            avatar : process.env.NEXT_PUBLIC_SERVER_URL+rawPost.attributes.author.data.attributes.avatar.data.attributes.formats?.thumbnail?.url,
            altText : rawPost.attributes.author.data.attributes.avatar.data.attributes.alternativeText
        },
        title : rawPost.attributes.name,
        slug : rawPost.attributes.slug,
        date : rawPost.attributes.publishedAt,
        description : rawPost.attributes.description,
        imageUrl : process.env.NEXT_PUBLIC_SERVER_URL+rawPost.attributes.cover.data.attributes.formats.thumbnail.url,
        cover : {
            altText : rawPost.attributes.cover.data.attributes.alternativeText,
            fileUrl : process.env.NEXT_PUBLIC_SERVER_URL+rawPost.attributes.cover.data.attributes.formats?.thumbnail?.url,
            width : rawPost.attributes.cover.data.attributes.width,
            height : rawPost.attributes.cover.data.attributes.height,
        },
        category : rawPost.attributes.category.data.attributes.name,
        createdAt : rawPost.attributes.createdAt,
        modifiedAt : rawPost.attributes.publishedAt,
        readTime : 'khoảng '+ rawPost.attributes.readingTime + ' phút'
    }
}

export function convertRawPostsToPosts(rawPosts : RawPost[]):Post[]{
    if(!rawPosts) return []
    return rawPosts.map(item=>convertRawPostToPost(item))
}
export function convertRawArticleToArticle(rawPost: RawArticle):Article{
    return  {
        author : {
            name : rawPost.attributes.author.data.attributes.name,
            avatar : process.env.NEXT_PUBLIC_SERVER_URL+rawPost.attributes.author.data.attributes.avatar.data.attributes.url,
            altText : rawPost.attributes.author.data.attributes.avatar.data.attributes.alternativeText
        },
        description : rawPost.attributes.description,
        title : rawPost.attributes.name,
        slug : rawPost.attributes.slug,
        date :  rawPost.attributes.publishedAt,
        imageUrl : process.env.NEXT_PUBLIC_SERVER_URL+rawPost.attributes.cover.data.attributes.url,
        cover : {
            altText : rawPost.attributes.cover.data.attributes.alternativeText,
            fileUrl : process.env.NEXT_PUBLIC_SERVER_URL+rawPost.attributes.cover.data.attributes.url,
            width : rawPost.attributes.cover.data.attributes.width,
            height : rawPost.attributes.cover.data.attributes.height,
        },
        category : rawPost.attributes.category.data.attributes.name,
        readTime : readingTime(rawPost.attributes.content).text,
        content : rawPost.attributes.content,
        related_post : rawPost.attributes.related_article.data,
        comment : rawPost.attributes.comment.data,
        seo : rawPost.attributes.seo,
        createdAt : rawPost.attributes.createdAt,
        modifiedAt : rawPost.attributes.publishedAt,
    }
}
