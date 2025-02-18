'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DynamicPagination from '@/components/Pagination';
import {App, Author, Category} from "@/lib/types";
import {Pagination} from "@/service/rawTypes";
import {useRouter} from "next/navigation";
import AppList from "@/components/AppList";


type Props = {
    popularApps: App[],
    latestApps: App[],
    allApp: {
        data: App[],
        pagination: Pagination
    },
    fetchAllApp: Function,
    categories : Category[]
    authors : Author[]
}

export default function Content({popularApps, latestApps, allApp, fetchAllApp , categories , authors}: Props) {
    const router = useRouter()
    return (
        <div className="">
            <section className="px-4 sm:px-6 lg:px-8 my-8">
                <div className="max-w-screen-lg mx-auto">
                    <h2 className="text-2xl font-semibold mb-6 ">
                        Bài viết phổ biến
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {popularApps.map((app) => (
                            <Link href={`/ung-dung/${app.slug}`} key={app.id} className="flex flex-col group">
                                <div className="relative w-full aspect-square md:aspect-video mb-4 overflow-hidden rounded-md">
                                    <Image
                                        src={app.imageUrl}
                                        alt={app.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                                    {app.title}
                                </h3>

                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-3 font-light">
                                    {app.description}
                                </p>

                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 px-4 sm:px-6 lg:px-8 mb-8">
                <div className="max-w-screen-lg mx-auto">
                    <h2 className="text-2xl font-semibold mb-6">Bài viết mới nhất</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {latestApps.map((app) => (
                            <Link href={`/ung-dung/${app.slug}`} key={app.id} className="group">
                                <div className="relative w-full mb-4 aspect-square md:aspect-video overflow-hidden rounded-md">
                                    <Image
                                        src={app.imageUrl}
                                        alt={app.title}
                                        layout="fill"
                                        objectFit="cover"
                                        className="transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div
                                    className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 my-2">
                                    <span>#{app.category}</span>

                                </div>
                                <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                                    {app.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-3 font-light">
                                    {app.description}
                                </p>
                                <div className="flex items-center mt-auto">
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section>
                <AppList apps={allApp.data} header={'Tất cả các ứng dụng '} categories={categories} authors={authors}/>
                <DynamicPagination
                    currentPage={allApp.pagination.page}
                    totalPages={allApp.pagination.pageCount}
                    onPageChange={(page) => {
                        router.push(`/ung-dung?page=${page}`)
                        fetchAllApp()
                    }}
                />
            </section>
        </div>
    );
}
