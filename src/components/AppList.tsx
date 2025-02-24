import {App, Author, Category} from '@/lib/types';
import AppCard from './AppCard';
import PostSearchBar from "@/components/PostSearchBar";
import React from "react";

export default function AppList({
                                    apps,
                                    header,
                                    categories,
                                    authors
                                }: {
    apps: App[];
    header?: string;
    categories: Category[],
    authors: Author[]
}) {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-screen-lg">
                {header && (
                    <h2 className="text-2xl font-semibold mb-6">
                        {header}
                    </h2>
                )}
                <PostSearchBar categories={categories?.map(c => ({value: c.slug, label: c.name}))}
                               authors={authors?.map(a => ({value: a.name, label: a.name}))}/>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {apps.map((app) => (
                        <AppCard key={app.id} app={app}/>
                    ))}
                </div>
            </div>
        </section>
    );
}
