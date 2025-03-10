import {Course, Author, Category} from '@/lib/types';
import CourseCard from './CourseCard';
import PostSearchBar from "@/components/PostSearchBar";
import React from "react";

export default function CourseList({
                                    courses,
                                    header,
                                    categories,
                                }: {
    courses: Course[];
    header?: string;
    categories: Category[],
}) {
    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-screen-lg">
                {header && (
                    <h2 className="text-2xl font-semibold mb-6">
                        {header}
                    </h2>
                )}
                <PostSearchBar removeAuthor categories={categories?.map(c => ({value: c.slug, label: c.name}))}/>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course}/>
                    ))}
                </div>
            </div>
        </section>
    );
}
