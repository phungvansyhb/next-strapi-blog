'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CourseList from '@/components/CourseList';
import DynamicPagination from '@/components/Pagination';
import { Category, Course} from "@/lib/types";
import {Pagination} from "@/typeDefs/rawTypes";
import {useRouter} from "next/navigation";
import {
    Carousel,
    CarouselContent,
    CarouselDot,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"


type Props = {
    popularCourses: Course[],
    latestCourses: Course[],
    allCourse: {
        data: Course[],
        pagination: Pagination
    },
    fetchAllCourse: Function,
    categories : Category[]
}

export default function Content({popularCourses, latestCourses, allCourse, fetchAllCourse, categories }: Props) {
    const router = useRouter()
    return (
        <div >
            <div className="grid grid-cols-4 gap-4 max-w-screen-lg mx-auto">
                <section className="col-span-4 md:col-span-3 px-4 lg:px-0">
                    <div >
                        <h2 className="text-2xl font-semibold mb-6 ">
                            Bài viết phổ biến
                        </h2>

                        <Carousel className="w-full" plugins={[
                            Autoplay({
                                delay: 2000,
                            }),
                        ]}>
                            <CarouselContent className="-ml-1">
                                {popularCourses.map((Course, index) => (
                                    <CarouselItem key={index} className="pl-1">
                                        <div className="p-1 w-full rounded-md">
                                            <Link href={`/bai-viet/${Course.slug}`} key={Course.id}
                                                  className="flex flex-col group rounded-md">
                                                <div className="relative w-full aspect-video md:aspect-video mb-4 overflow-hidden rounded-md ">
                                                    <Image
                                                        src={Course.imageUrl}
                                                        alt={Course.title}
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className="transition-transform duration-300 group-hover:scale-105 brightness-75"
                                                    />
                                                    <h3 className="absolute text-white text-medium font-semibold bottom-0 left-6 mb-4 backdrop-brightness-125">
                                                        {Course.title}
                                                    </h3>
                                                </div>

                                            </Link>
                                        </div>
                                    </CarouselItem>
                                ))}

                            </CarouselContent>
                            <div className='flex w-full justify-center'>
                                <CarouselDot/>
                            </div>
                        </Carousel>
                    </div>
                </section>

                <section className=" col-span-4 md:col-span-1 px-4 lg:px-0">
                    <div >
                        <h2 className="text-2xl font-semibold mb-6">Bài viết mới nhất</h2>
                        <div className='flex flex-col gap-6 md:max-h-[500px] overflow-y-auto'>
                            {latestCourses.map((Course, index) => (
                                <div className="p-1" key={Course.id}>
                                    <Link href={`/bai-viet/${Course.slug}`} key={Course.id} className="group flex gap-2">
                                        <div
                                            className="relative shrink-0 grow-0 w-[80px] h-[80px] aspect-square mb-2 overflow-hidden rounded-md">
                                            <Image
                                                src={Course.cover.fileUrl}
                                                alt={Course.title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className='flex flex-col justify-between'>
                                            <h3 className="text-xs font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                                                {Course.title}
                                            </h3>
                                            <div
                                                className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 my-2">
                                                <span>#{Course.category}</span>
                                            </div>
                                        </div>

                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <section>
                <CourseList courses={allCourse.data} categories={categories}
                          header={'Tất cả các khóa học'}/>
                <DynamicPagination
                    currentPage={allCourse.pagination.page}
                    totalPages={allCourse.pagination.pageCount}
                    onPageChange={(page) => {
                        router.push(`/khoa-hoc?page=${page}`)
                        fetchAllCourse()
                    }}
                />
            </section>
        </div>
    );
}
