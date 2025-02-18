import {RawApp, RawAppDetail, RawArticle, RawPost} from "@/service/rawTypes";
import {App, AppDetail, Article, Post} from "@/lib/types";
import  readingTime from 'reading-time'

export function convertRawAppToApp(rawPost : RawApp):App{
    if(!rawPost) throw Error("require parameter type RawApp")
    return {
        id : rawPost.id,
        title : rawPost.attributes.name,
        slug : rawPost.attributes.slug,
        date : rawPost.attributes.publishedAt,
        description : rawPost.attributes.description,
        imageUrl : process.env.NEXT_PUBLIC_SERVER_URL + (rawPost.attributes.cover.data.attributes.url || ''),
        cover : {
            altText : rawPost.attributes.cover.data.attributes.alternativeText,
            fileUrl : process.env.NEXT_PUBLIC_SERVER_URL+ (rawPost.attributes.cover.data.attributes?.url || ''),
            width : rawPost.attributes.cover.data.attributes.width,
            height : rawPost.attributes.cover.data.attributes.height,
        },
        category : rawPost.attributes?.category?.data?.attributes?.name,
        createdAt : rawPost.attributes.createdAt,
        modifiedAt : rawPost.attributes.publishedAt,
    }
}

export function convertRawAppDetailToAppDetail(rawPost : RawAppDetail):AppDetail{
    if(!rawPost) throw Error("require parameter type RawApp")
    return {
        id : rawPost.id,
        src_url : rawPost.src_url,
        description : rawPost.description,
        title : rawPost.name,
        slug : rawPost.slug,
        date :  rawPost.publishedAt,
        imageUrl : process.env.NEXT_PUBLIC_SERVER_URL+rawPost.cover.url,
        cover : {
            altText : rawPost.cover.alternativeText,
            fileUrl : process.env.NEXT_PUBLIC_SERVER_URL+ (rawPost.cover.formats.medium?.url || rawPost.cover.url ),
            width : rawPost.cover.width,
            height : rawPost.cover.height,
        },
        category : rawPost.category.name,
        content : rawPost.content,
        seo : rawPost.seo,
        createdAt : rawPost.createdAt,
        modifiedAt : rawPost.publishedAt,
        viewCount : rawPost.viewCount
    }
}

export function convertRawAppsToApps(rawPosts : RawApp[]):App[]{
    if(!rawPosts) return []
    return rawPosts.map(item=>convertRawAppToApp(item))
}
