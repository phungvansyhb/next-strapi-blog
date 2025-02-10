import {RawArticle, RawPost} from "@/service/rawTypes";
import {Article, Post} from "@/lib/types";
import  readingTime from 'reading-time'

export function convertRawPostToPost(rawPost : RawPost):Post{
    return {
        id : rawPost.id,
        author : {
            name : rawPost.author.name,
            avatar : rawPost.author.avatar.url
        },
        title : rawPost.title,
        slug : rawPost.slug,
        date : rawPost.publishedAt,
        excerpt : '',
        imageUrl : rawPost.cover.url,
        category : rawPost.category.name,
    }
}

export function convertRawArticleToArticle(rawPost: RawArticle):Article{
    return  {
        author : {
            name : rawPost.author.name,
            avatar : rawPost.author.avatar.url
        },
        title : rawPost.title,
        date : rawPost.publishedAt,
        imageUrl : rawPost.cover.url,
        category : rawPost.category.name,
        readTime : readingTime(rawPost.body).text,
        content : rawPost.body
    }
}