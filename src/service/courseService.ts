import {Pagination, RawCourse, Comment} from "@/typeDefs/rawTypes";
import qs from 'qs';

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_SERVER_TOKEN;

if (!API_URL || !API_TOKEN) {
    throw new Error('Server URL or token is not defined');
}

const headers = {
    Authorization: `Bearer ${API_TOKEN}`,
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

export async function getListCourse({
                                      title,
                                      author,
                                      category,
                                  }: {
    title?: string;
    author?: string;
    category?: string;
}): Promise<{ data: RawCourse[]; meta: { pagination: Pagination } }> {
    const query = qs.stringify({
        populate: ['cover', 'category'],
        select: ['documentId', 'name','description', 'slug', 'publishedAt'],
        filters: {
            name: title ? { $contains: title } : undefined,
            category: category ? { slug: { $contains: category } } : undefined,
        },
    });
    return fetchApi('/api/courses?'+ query );
}

export async function getDetailArticle(slug: string): Promise<RawCourse> {
    const query = qs.stringify({
        populate: {
            category: {
                populate: 'cover'
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
    return fetchApi('/api/find-course-by-slug?'+  query );
}

export async function getListLatestCourse(): Promise<{ data: RawCourse[], meta: { pagination: Pagination } }> {
    const query = qs.stringify({
        populate: ['cover', 'category'],
        select: ['id', 'name','description', 'slug', 'publishedAt'],
        sort: {
            publishedAt: 'desc'
        },
        pagination: {
            limit: 4
        }
    });
    return fetchApi('/api/courses?'+  query );
}

export async function getListPopularCourse(): Promise<{ data: RawCourse[], meta: { pagination: Pagination } }> {
    const query = qs.stringify({
        populate: ['cover', 'category'],
        select: ['id', 'name','description', 'slug', 'publishedAt'],
        sort: {
            viewCount: 'desc'
        },
        pagination: {
            limit: 4
        }
    });
    return fetchApi('/api/courses?'+ query );
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
    return fetchApi('/api/comments?'+ query );
}

export async function createComment(data: CreateComment) {
    return fetchApi('/api/comments', {
        method: 'Post',
        body: JSON.stringify({ data }),
    });
}
