import { Post } from '@/lib/types';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import {Dayjs} from "@/lib/utils";
const PostCard = ({ post }: { post: Post }) => {
  return (
    <article className="flex flex-col">
      <Link href={`/article/${post.slug}`} className="block">
        <div className="relative w-full h-[300px] aspect-auto lg:h-auto lg:aspect-square">
          <img
            src={post.imageUrl}
            alt={post.title}
            // layout="fill"
            // objectFit="cover"
            objectPosition="center"
            className="transition-transform duration-200 ease-in-out hover:scale-[1.02] w-full h-[300px] object-cover object-top lg:aspect-square rounded-md"
          />
        </div>
        <div className="mt-2 sm:mt-3">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 my-2">
            <span>#{post.category}</span>
            <span>
              <span>Thời gian đọc: </span>
              <span>{post.readTime}</span>
            </span>
          </div>
          <div className="flex items-center justify-between my-2">
            <div className="flex items-center ">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                width={24}
                height={24}
                className="rounded-full mr-2 object-cover h-6"
              />
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                {post.author.name}
              </span>
            </div>
            <time className="text-xs text-gray-500 dark:text-gray-400">
              {Dayjs(post.date).fromNow()}
            </time>
          </div>
          <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-3 font-light">
            {post.description}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
