'use client';
import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import PostList from '@/components/PostList';
import DynamicPagination from '@/components/Pagination';
import { Author, Category, Post } from '@/lib/types';
import { Pagination } from '@/typeDefs/rawTypes';
import { useRouter } from 'next/navigation';
import { Carousel, CarouselContent, CarouselDot, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import LazyImage from '@/components/LazyImage';
import { revalidateTag } from 'next/cache';
import revalidatePost from '@/actions/postAction';
import { useServerAction } from '@/hooks/useServerAction';

type Props = {
	popularPosts: Post[];
	latestPosts: Post[];
	allPost: {
		data: Post[];
		pagination: Pagination;
	};
	fetchAllPost: Function;
	categories: Category[];
	authors: Author[];
};

export default function Content({
	popularPosts,
	latestPosts,
	allPost,
	fetchAllPost,
	categories,
	authors,
}: Props) {
	const router = useRouter();

	return (
		<div>
			<div className='grid grid-cols-4 gap-4 max-w-screen-lg mx-auto'>
				<section className='col-span-4 md:col-span-3 px-4 lg:px-0'>
					<div>
						<h2 className='text-2xl font-semibold mb-6 '>Bài viết phổ biến</h2>

						<Carousel
							className='w-full'
							plugins={[
								Autoplay({
									delay: 2000,
								}),
							]}>
							<CarouselContent className='-ml-1'>
								{popularPosts.map((post, index) => (
									<CarouselItem
										key={index}
										className='pl-1'>
										<div className='p-1 w-full rounded-md'>
											<Link
												href={`/bai-viet/${post.slug}`}
												key={post.id}
												className='flex flex-col group rounded-md'>
												<div className='relative w-full aspect-video md:aspect-video mb-4 overflow-hidden rounded-md '>
													<LazyImage
														effect='opacity'
														objectFit='cover'
														src={post.imageUrl}
														alt={post.title}
														className=' w-full h-full rounded-md transition-transform duration-300 group-hover:scale-105 brightness-75'
													/>
													<h3 className='absolute text-white text-medium font-semibold bottom-0 left-6 mb-4 backdrop-brightness-125'>
														{post.title}
													</h3>
												</div>
											</Link>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<div className='flex w-full justify-center'>
								<CarouselDot />
							</div>
						</Carousel>
					</div>
				</section>

				<section className=' col-span-4 md:col-span-1 px-4 lg:px-0'>
					<div>
						<h2 className='text-2xl font-semibold mb-6'>Bài viết mới nhất</h2>
						<div className='flex flex-col gap-6 md:max-h-[500px] overflow-y-auto'>
							{latestPosts.map((post, index) => (
								<div
									className='p-1'
									key={post.id}>
									<Link
										href={`/bai-viet/${post.slug}`}
										key={post.id}
										className='group flex gap-2'>
										<div className='relative shrink-0 grow-0 w-[80px] h-[80px] aspect-square mb-2 overflow-hidden rounded-md'>
											<LazyImage
												effect='opacity'
												objectFit='cover'
												src={post.cover.fileUrl}
												alt={post.title}
												className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-105'
											/>
										</div>
										<div className='flex flex-col justify-between'>
											<h3 className='text-xs font-medium text-gray-900 dark:text-white mb-2 line-clamp-2'>
												{post.title}
											</h3>
											<div className='flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 my-2'>
												<span>#{post.category}</span>
												<span>{post.readTime}</span>
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
				<PostList
					posts={allPost.data}
					authors={authors}
					categories={categories}
					header={'Tất cả các bài viết'}
				/>
				<DynamicPagination
					currentPage={allPost.pagination.page}
					totalPages={allPost.pagination.pageCount}
					onPageChange={async (page) => {
						await revalidatePost();
						router.push(`/blog?page=${page}`, { scroll: false });
					}}
				/>
			</section>
		</div>
	);
}
