import {Author, Category, Post} from '@/lib/types';
import PostCard from './PostCard';
import React from "react";
import PostSearchBar from "@/components/PostSearchBar";


export default function PostList({
                                     posts,
                                     header,
                                     categories,
                                     authors
                                 }: {
    posts: Post[];
    header?: string;
    categories: Category[],
    authors: Author[]
}) {

    return (
        <section className="py-6 md:py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-screen-lg">
                {header && (
                    <h2 className="text-2xl font-semibold mb-6">
                        {header}
                    </h2>
                    )}
                <PostSearchBar categories={categories?.map(c => ({value: c.slug, label: c.name}))}
                               authors={authors?.map(a => ({value: a.name, label: a.name}))}/>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post}/>
                    ))}
                </div>
            </div>
        </section>
    );
}
