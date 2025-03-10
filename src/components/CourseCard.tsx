import { Course} from '@/lib/types';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import {Dayjs} from "@/lib/utils";
const CourseCard = ({ course }: { course: Course }) => {
  return (
    <article className="flex flex-col">
      <Link href={`/khoa-hoc/${course.slug}`} className="block">
        <div className="relative w-full h-[300px] aspect-auto lg:h-auto lg:aspect-square">
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="transition-transform duration-200 ease-in-out hover:scale-[1.02] w-full h-[300px] object-cover object-top lg:aspect-square rounded-md"
          />
        </div>
        <div className="mt-2 sm:mt-3">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 my-2">
            <span>#{course.category}</span>
          </div>
          <div className="flex items-center justify-between my-2">
            <time className="text-xs text-gray-500 dark:text-gray-400">
              {Dayjs(course.createdAt).fromNow()}
            </time>
          </div>
          <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-3 font-light">
            {course.description}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default CourseCard;
