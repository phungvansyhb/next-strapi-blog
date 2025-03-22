'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {DownloadIcon, Search} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import NewsletterOptin from '@/components/NewsletterBox';
import {AppDetail, Category} from '@/lib/types';
import rehypeRaw from "rehype-raw";
import {DateFormatUtil, Dayjs} from "@/lib/utils";
import Comment from "@/components/Comment";
import CreateCommentForm from "@/components/CreateCommentForm";
import {Pagination} from "@/typeDefs/rawTypes";
import DynamicPagination from "@/components/Pagination";
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
} from 'next-share'
import LazyImage from "@/components/LazyImage";

interface appDetailPageContentProps {
    appDetail: AppDetail;
    categories: Category[];
    comments: {
        data: { id: string, attributes: Comment }[],
        meta: { pagination: Pagination }
    }
}

export default function AppPage({
                                    appDetail,
                                    categories,
                                    comments
                                }: appDetailPageContentProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <>
            <div className="">
                <div className="relative w-full h-[50vh] mb-8">
                    <div className="absolute inset-0">
                        <LazyImage
                            objectFit='cover'
                            src={appDetail.imageUrl}
                            alt={appDetail.title}
                            className="object-cover brightness-50 object-center "
                        />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8 max-w-screen-lg mx-auto">
                        <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-white">
                            {appDetail.title}
                        </h1>
                        <div className="flex flex-wrap items-center text-sm sm:text-base text-white gap-2 sm:gap-4">
                            <span>{Dayjs(appDetail.date).format(DateFormatUtil['HH:mmDD/MM/YYYY'])}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{appDetail.viewCount} lượt xem</span>
                        </div>
                    </div>
                </div>

                {/* Two-column layout */}
                <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
                    {/* Main content */}
                    <div className="md:w-2/3">
                        <div className='flex justify-between items-center'>
                            <Link
                                target='_blank'
                                href={appDetail.src_url}>
                                <span className='underline inline-flex gap-2 items-center'>Tải xuống phần mềm <DownloadIcon size={14}/></span>
                            </Link>
                            <div className='flex gap-2 items-center mb-4 justify-end'>
                                <h3 className='text-slate-400'>Chia sẻ </h3>
                                <FacebookShareButton
                                    url={process.env.NEXT_PUBLIC_SITE_URL! + /ung-dung/ + appDetail.slug}
                                    quote={appDetail.title}
                                    hashtag={appDetail.seo.keywords}
                                >
                                    <FacebookIcon size={32} round/>
                                </FacebookShareButton>
                                <TelegramShareButton
                                    url={process.env.NEXT_PUBLIC_SITE_URL! + /ung-dung/ + appDetail.slug}
                                    title={appDetail.title}
                                >
                                    <TelegramIcon size={32} round/>
                                </TelegramShareButton>
                                <TwitterShareButton
                                    url={process.env.NEXT_PUBLIC_SITE_URL! + /ung-dung/ + appDetail.slug}
                                    title={appDetail.title}
                                >
                                    <TwitterIcon size={32} round/>
                                </TwitterShareButton>
                                <LinkedinShareButton
                                    url={process.env.NEXT_PUBLIC_SITE_URL! + /ung-dung/ + appDetail.slug}>
                                    <LinkedinIcon size={32} round/>
                                </LinkedinShareButton>

                            </div>
                        </div>

                        <article
                            className="prose dark:prose-invert max-w-none prose-headings:mb-4 prose-p:mb-4 prose-ul:mb-4 prose-ol:mb-4">
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({className, children, ...props}) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return match ? (
                                            <SyntaxHighlighter
                                                // @ts-expect-error SyntaxHighlighter style error
                                                style={atomDark}
                                                language={match[1]}
                                                PreTag="div"
                                                {...props}
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                }}
                            >
                                {appDetail.content}
                            </ReactMarkdown>
                        </article>
                        <div className='flex gap-2 items-center'>
                            <h3 className="text-lg font-semibold ">Download phần mềm </h3>
                            <Link
                                target='_blank'
                                href={appDetail.src_url}>
                                <Button type='button' variant='outline'><DownloadIcon/> Download</Button>
                            </Link>
                        </div>
                        <h3 className="text-lg font-semibold mt-10">Bình luận</h3>
                        <div className='max-h-[500px] overflow-y-auto'>
                            {comments.data.length === 0 &&
                                <div className='text-center text-slate-400 text-sm'>Chưa có bình luận nào</div>}
                            {comments.data.map(item => <Comment data={item.attributes} key={item.id}/>)}
                        </div>
                        <DynamicPagination currentPage={comments.meta.pagination.page}
                                           totalPages={comments.meta.pagination.pageCount}
                                           onPageChange={(page) => {
                                               if (page !== comments.meta.pagination.page) {
                                                   router.push(`/ung-dung/${appDetail.slug}?pageComment=${page}`)
                                               }
                                           }}/>
                        <CreateCommentForm articleId={appDetail.id} type='app'/>
                    </div>

                    {/* Sidebar */}
                    <div className="md:w-1/3 space-y-8">
                        <div className="sticky top-8">
                            {/* Search input */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4">Tìm kiếm</h3>
                                <form onSubmit={handleSearch} className="flex">
                                    <Input
                                        type="search"
                                        name="q"
                                        placeholder="Tìm kiếm ứng dụng..."
                                        className="rounded-r-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Button type="submit" className="rounded-l-none">
                                        <Search className="h-4 w-4"/>
                                        <span className="sr-only">Nhập từ khóa</span>
                                    </Button>
                                </form>
                            </div>

                            {/* Categories */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Category</h3>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <Link
                                            href={`/danh-muc/${category.name.toLowerCase()}`}
                                            key={category.name}
                                            className="flex justify-between items-center group"
                                        >
                      <span className="text-sm group-hover:text-primary transition-colors">
                        {category.name}
                      </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                        {category.count}
                      </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <NewsletterOptin/>
            </div>
        </>
    );
}
