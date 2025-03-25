import {Pagination, RawArticle, RawPost, Comment, RawAuthor} from "@/typeDefs/rawTypes";
import qs from 'qs';
import {PAGE_SIZE} from "@/constants/app";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_SERVER_TOKEN;

if (!API_URL || !API_TOKEN) {
    throw new Error('Server URL or token is not defined');
}

const headers = {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": 'application/json'
};

const fetchApi = async (url: string, options: any = {}) => {
    try {
        const response = await fetch(`${API_URL}${url}`, { headers, ...options });
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export async function getListPost({
                                      title,
                                      author,
                                      category,
                                      page = 0
                                  }: {
    title?: string;
    author?: string;
    category?: string;
    page?: number
}): Promise<{ data: RawPost[]; meta: { pagination: Pagination } }> {
    const query = qs.stringify({
        populate: ['cover', 'category', 'author', 'author.avatar'],
        select: ['documentId', 'name','description', 'slug', 'publishedAt', 'readingTime'],
        filters: {
            name: title ? { $contains: title } : undefined,
            author: author ? { name: { $contains: author } } : undefined,
            category: category ? { slug: { $contains: category } } : undefined,
        },
        pagination : {
            page : page ,
            pageSize : PAGE_SIZE
        }
    });
    return fetchApi('/api/articles?'+ query , {next : {tag : "posts"}}  );
}

export async function getDetailArticle(slug: string): Promise<RawArticle> {
    const query = qs.stringify({
        populate: {
            author: {
                populate: 'avatar'
            },
            category: {
                populate: 'cover'
            },
            related_article: {
                populate: '*'
            },
            comment: {
                populate: '*'
            },
            cover: {
                populate: '*'
            },
            seo: {
                populate: {
                    metaSocial: {
                        populate: '*'
                    },
                    metaImage: {
                        populate: '*'
                    }
                }
            }
        },
        filters: {
            slug: {
                $eq: slug
            }
        }
    });
    return fetchApi('/api/find-art-by-slug?'+  query );
}

export async function getListLatestPost(): Promise<{ data: RawPost[], meta: { pagination: Pagination } }> {
    const query = qs.stringify({
        populate: ['cover', 'category', 'author', 'author.avatar'],
        select: ['id', 'name','description', 'slug', 'publishedAt', 'readingTime'],
        sort: {
            publishedAt: 'desc'
        },
        pagination: {
            limit: 4
        }
    });
    return fetchApi('/api/articles?'+  query );
}

export async function getListPopularPost(): Promise<{ data: RawPost[], meta: { pagination: Pagination } }> {
    const query = qs.stringify({
        populate: ['cover', 'category', 'author', 'author.avatar'],
        select: ['id', 'name','description', 'slug', 'publishedAt', 'readingTime'],
        sort: {
            viewCount: 'desc'
        },
        pagination: {
            limit: 4
        }
    });
    return fetchApi('/api/articles?'+ query );
}

export type CreateComment = {
    app?: {
        connect: number[];
    };
    article?: {
        connect: number[];
    };
    authorName: string;
    email?: string;
    phone?: string;
    content: string;
};

export async function getListCommentBySlug(slug: string): Promise<{
    data: { id: string, attributes: Comment }[],
    meta: { pagination: Pagination }
}> {
    const query = qs.stringify({
        filters: {
            article: {
                slug: {
                    $eq: slug
                }
            }
        },
        sort: {
            createdAt: 'desc'
        }
    });
    return fetchApi('/api/comments?'+ query , { next: { tag: "comments" }} );
}

export async function createComment(data: CreateComment) {
    return fetchApi('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ data }),

    });
}

export async function getListAuthor(): Promise<{ data: RawAuthor[], meta: { pagination: Pagination } }> {
    return fetchApi('/api/authors');
}