import LazyImage from '@/components/LazyImage';
import NewsletterOptin from '@/components/NewsletterBox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { appInfo, genSiteMetaData } from '@/constants/sitemetaData';
import { convertRawCategoriesToCategories } from '@/DTOs/categoryDTO';
import { Category } from '@/lib/types';
import { getListCategory } from '@/service/categoryService';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = genSiteMetaData('Trang chủ');

function RenderList({ type, data }: { type: 'app' | 'article'; data: Category[] }) {
	if (data.length === 0) return <></>;
	return (
		<>
			<h3 className='text-lg font-semibold mb-4 dark:text-white '>
				{type === 'app' ? 'Danh mục ứng dụng' : 'Danh mục bài viết '}
			</h3>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{data.map((category) => (
					<Link
						key={category.slug}
						href={
							type === 'article'
								? `/blog?category=${category.slug}#search`
								: `/ung-dung?category=${category.slug}#search`
						}>
						<Card className='overflow-hidden border-none'>
							<div className='relative aspect-square'>
								<LazyImage
									effect='opacity'
									src={category.image || '/404.png'}
									alt={category.name}
									objectFit='cover'
									className='aspect-square'
								/>
								<div className='absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 hover:bg-opacity-30' />
								<CardContent className='absolute inset-0 flex flex-col items-center justify-center text-center p-4'>
									<h2 className='text-xl font-semibold mb-2 text-white'>
										{category.name}
									</h2>
									<Badge
										variant='secondary'
										className='bg-white text-black'>
										{category.count}{' '}
										{type === 'app' ? ' ứng dụng' : ' bài viết'}
									</Badge>
								</CardContent>
							</div>
						</Card>
					</Link>
				))}
			</div>
		</>
	);
}
export default async function Home() {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': appInfo.siteURL,
		},
		name: appInfo.siteName,
		description: metadata.description,
		image: [
			{
				'@type': 'ImageObject',
				url: './AppLogoTransparent.png',
				width: 500,
				height: 500,
			},
		],
		publisher: {
			'@type': 'Person',
			name: 'Phung Van Sy, Michel',
			url: 'https://github.com/phungvansyhb',
		},
		breadcrumb: {
			'@type': 'BreadcrumbList',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: 'Trang chủ',
					item: appInfo.siteURL,
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: 'Blog',
					item: appInfo.siteURL + '/blog',
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: 'Ứng dụng',
					item: appInfo.siteURL + '/ung-dung',
				},
				{
					'@type': 'ListItem',
					position: 4,
					name: 'Liên hệ',
					item: appInfo.siteURL + '/lien-he',
				},
				{
					'@type': 'ListItem',
					position: 5,
					name: 'Điều khoản sử dụng',
					item: appInfo.siteURL + '/dieu-khoan-su-dung',
				},
			],
		},
	};
	const categoriesRaw = await getListCategory();
	const categoriesBlog = convertRawCategoriesToCategories(categoriesRaw.data, 'article');
	const categoriesApp = convertRawCategoriesToCategories(categoriesRaw.data, 'app');
	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 2) }}
			/>
			<div className='py-8 relative w-full overflow-hidden flex flex-col items-center justify-center '>
				<NewsletterOptin />
			</div>
			<div className='max-w-screen-lg mx-auto px-4 py-8'>
				<h2 className='text-3xl mb-2 font-bold text-gray-900 dark:text-white text-center'>
					Danh mục
				</h2>
				<p className='text-center text-sm mb-8 max-w-2xl mx-auto'>
					Khám phá bộ sưu tập các bài viết, phần mềm được tổ chức cẩn thận theo chủ đề.
					Mỗi danh mục mang đến cho bạn một góc nhìn độc đáo về những chủ đề mà bạn đam
					mê.
				</p>
				<RenderList
					type='article'
					data={categoriesBlog}
				/>
				<br />
				<RenderList
					type='app'
					data={categoriesApp}
				/>
			</div>
		</>
	);
}
