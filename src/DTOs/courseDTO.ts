import {RawCourse, RawCourseDetail} from "@/typeDefs/rawTypes";
import {Course, CourseDetail} from "@/lib/types";

export function convertRawCourseToCourse(rawCourse : RawCourse):Course{
    if(!rawCourse) throw Error("require parameter type RawCourse")
    return {
        id : rawCourse.id,
        author : rawCourse.attributes.author,
        title : rawCourse.attributes.name,
        slug : rawCourse.attributes.slug,
        description : rawCourse.attributes.description,
        imageUrl : process.env.NEXT_PUBLIC_SERVER_URL + (rawCourse.attributes.cover?.data?.attributes?.formats?.large?.url || rawCourse.attributes.cover?.data?.attributes?.url),
        cover : {
            altText : rawCourse.attributes.cover?.data?.attributes?.alternativeText,
            fileUrl : process.env.NEXT_PUBLIC_SERVER_URL+ (rawCourse.attributes.cover?.data?.attributes?.formats?.large?.url  || rawCourse.attributes.cover?.data?.attributes?.url),
            width : rawCourse.attributes.cover?.data?.attributes?.width,
            height : rawCourse.attributes.cover?.data?.attributes?.height,
        },
        category : rawCourse.attributes?.category?.data?.attributes?.name,
        createdAt : rawCourse.attributes.createdAt,
        modifiedAt : rawCourse.attributes.publishedAt,
    }
}

export function convertRawCoursesToCourses(rawCourses : RawCourse[]):Course[]{
    if(!rawCourses) return []
    return rawCourses.map(item=>convertRawCourseToCourse(item))
}
export function convertRawCourseDetailToCourseDetail(rawCourse: RawCourseDetail):CourseDetail{
    return  {
        id : rawCourse.id,
        author : rawCourse.author,
        description : rawCourse.description,
        title : rawCourse.name,
        slug : rawCourse.slug,
        imageUrl : process.env.NEXT_PUBLIC_SERVER_URL+rawCourse.cover.url,
        cover : {
            altText : rawCourse.cover.alternativeText,
            fileUrl : process.env.NEXT_PUBLIC_SERVER_URL+ (rawCourse.cover.formats.medium.url || rawCourse.cover.url ),
            width : rawCourse.cover.width,
            height : rawCourse.cover.height,
        },
        category : rawCourse.category.name,
        outline : rawCourse.outline,
        seo : rawCourse.seo,
        createdAt : rawCourse.createdAt,
        modifiedAt : rawCourse.publishedAt,
    }
}
