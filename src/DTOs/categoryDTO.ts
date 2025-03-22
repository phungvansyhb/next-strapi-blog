import {Category} from "@/lib/types";
import {RawCate} from "@/typeDefs/rawTypes";

export function convertRawCategoryToCategory(rawCate: RawCate): Category {
    if (!rawCate) throw Error("require parameter type RawCate")
    return {
        name: rawCate.name,
        slug: rawCate.slug,
        count: rawCate.numberArticles,
        image: rawCate?.cover?.formats?.medium?.url ? process.env.NEXT_PUBLIC_SERVER_URL + rawCate?.cover?.formats?.medium?.url :
            process.env.NEXT_PUBLIC_SERVER_URL + rawCate?.cover?.url
    }
}

export function convertRawCategoriesToCategories(rawCaties: RawCate[], type: 'article' | 'app'|'course'): Category[] {
    if (!rawCaties) return []
    return rawCaties.filter(item => item.type === type).map(item => convertRawCategoryToCategory(item))
}


