import {Category} from "@/lib/types";
import {RawCate} from "@/service/rawTypes";

export function convertRawCategoryToCategory(rawCate: RawCate): Category {
    if (!rawCate) throw Error("require parameter type RawCate")
    return {
        name: rawCate.name,
        slug: rawCate.slug,
        count: rawCate.numberArticles,
        image: rawCate?.cover?.formats?.medium?.url ? process.env.NEXT_PUBLIC_SERVER_URL + rawCate?.cover?.formats?.medium?.url : ''
    }
}

export function convertRawCategoriesToCategories(rawCaties: RawCate[], type: 'article' | 'app'): Category[] {
    if (!rawCaties) return []
    return rawCaties.filter(item => item.type === type).map(item => convertRawCategoryToCategory(item))
}


