import {Comment, Pagination, RawAppDetail, RawPost} from "@/typeDefs/rawTypes";
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

export async function getListApps({
                                      title,
                                      author,
                                      category,
                                  }: {
    title?: string;
    author?: string;
    category?: string;
}): Promise<{ data: RawPost[], meta: { pagination: Pagination } }> {
    const query = qs.stringify({
        select: ['id', 'name','description', 'slug', 'publishedAt','cover'],
        populate: ['cover', 'category', 'author', 'author.avatar'],
        filters: {
            name: title ? { $contains: title } : undefined,
            author: author ? { name: { $contains: author } } : undefined,
            category: category ? { slug: { $contains: category } } : undefined,
        },
    } , {encode : false});
    return fetchApi('/api/apps?'+ query );
}

export async function getListLatestApp(): Promise<{ data: RawPost[], meta: { pagination: Pagination } }> {
    const query = qs.stringify({
        populate: ['cover', 'category', 'author', 'author.avatar'],
        select: ['id', 'name','description', 'slug', 'publishedAt'],
        sort: {
            publishedAt: 'desc'
        },
        pagination: {
            limit: 4
        }
    },{encode : false});
    return fetchApi('/api/apps?' +query );
}

export async function getListPopularApp(): Promise<{ data: RawPost[], meta: { pagination: Pagination } }> {
    const query = qs.stringify({
        populate: ['cover', 'category', 'author', 'author.avatar'],
        select: ['id', 'name','description', 'slug', 'publishedAt'],
        sort: {
            viewCount: 'desc'
        },
        pagination: {
            limit: 4
        }
    },{encode : false});
    return fetchApi('/api/apps?'+ query );
}

export async function getDetailApp(slug: string): Promise<RawAppDetail> {
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
    return fetchApi('/api/find-app-by-slug?' + query );
}

export async function getListAppCommentBySlug(slug: string): Promise<{
    data: { id: string, attributes: Comment }[],
    meta: { pagination: Pagination }
}> {
    const query = qs.stringify({
        filters: {
            app: {
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