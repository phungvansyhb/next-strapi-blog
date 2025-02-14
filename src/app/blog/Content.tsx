'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PostList from '@/components/PostList';
import DynamicPagination from '@/components/Pagination';
import {Post} from "@/lib/types";
import {Pagination} from "@/service/rawTypes";
import {DateFormatUtil, Dayjs} from "@/lib/utils";
import {useRouter} from "next/navigation";


type Props = {
    popularPosts: Post[],
    latestPosts: Post[],
    allPost: {
        data: Post[],
        pagination: Pagination
    },
    fetchAllPost: Function
}

export default function Content({popularPosts, latestPosts, allPost, fetchAllPost}: Props) {
    const router = useRouter()
    return (
        <div className="">
            <section className="px-4 sm:px-6 lg:px-8 my-8">
                <div className="max-w-screen-lg mx-auto">
                    <h2 className="text-2xl font-semibold mb-6 ">
                        Bài viết phổ biến
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {popularPosts.map((post) => (
                            <Link href={`/article/${post.slug}`} key={post.id} className="flex flex-col group">
                                <div className="relative w-full aspect-square md:aspect-video mb-4 overflow-hidden rounded-md">
                                    <Image
                                        src={post.imageUrl}
                                        alt={post.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                                    {post.title}
                                </h3>

                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-3 font-light">
                                    {post.description}
                                </p>
                                <div className="flex items-center mt-auto">
                                    <Image
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full mr-3 object-cover h-10"
                                    />
                                    <div>
                                        <p className="font-medium">{post.author.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {Dayjs(post.date).format(DateFormatUtil["HH:mmDD/MM/YYYY"])} · {post.readTime}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 px-4 sm:px-6 lg:px-8 mb-8">
                <div className="max-w-screen-lg mx-auto">
                    <h2 className="text-2xl font-semibold mb-6">Bài viết mới nhất</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {latestPosts.map((post) => (
                            <Link href={`/article/${post.slug}`} key={post.id} className="group">
                                <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
                                    <Image
                                        src={post.imageUrl}
                                        alt={post.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div
                                    className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 my-2">
                                    <span>#{post.category}</span>
                                    <span>
                                        <span>Thời gian đọc: </span>
                                        <span>{post.readTime}</span>
                                      </span>
                                </div>
                                <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-3 font-light">
                                    {post.description}
                                </p>
                                <div className="flex items-center mt-auto">
                                    <Image
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full mr-6 object-cover h-10"
                                    />
                                    <div>
                                        <p className="font-medium">{post.author.name}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {Dayjs(post.date).format(DateFormatUtil["HH:mmDD/MM/YYYY"])} · {post.readTime}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section>
                <PostList posts={allPost.data} header={'Tất cả các bài viết'}/>
                <DynamicPagination
                    currentPage={allPost.pagination.page}
                    totalPages={allPost.pagination.pageCount}
                    onPageChange={(page) => {
                        router.push(`/blog?page=${page}`)
                        fetchAllPost()
                    }}
                />
            </section>
        </div>
    );
}
