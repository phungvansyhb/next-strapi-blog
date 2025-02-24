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
            <section >
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
