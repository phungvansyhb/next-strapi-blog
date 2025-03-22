'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Facebook, Instagram, Mail, Search} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import NewsletterOptin from '@/components/NewsletterBox';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Article, Category} from '@/lib/types';
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

interface ArticlePageContentProps {
    article: Article;
    categories: Category[];
    comments: {
        data: { id: string, attributes: Comment }[],
        meta: { pagination: Pagination }
    }
}

export default function ArticlePage({
                                        article,
                                        categories,
                                        comments
                                    }: ArticlePageContentProps) {
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
                            src={article.imageUrl}
                            alt={article.title}
                            objectFit="cover"
                            className="brightness-50 object-center"
                        />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-8 max-w-screen-lg mx-auto">
                        <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 text-white">
                            {article.title}
                        </h1>
                        <div className="flex flex-wrap items-center text-sm sm:text-base text-white gap-2 sm:gap-4">
                            <span>{article.author.name}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{Dayjs(article.date).format(DateFormatUtil['HH:mmDD/MM/YYYY'])}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{article.viewCount} lượt xem</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{article.readTime}</span>
                        </div>
                    </div>
                </div>

                {/* Two-column layout */}
                <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
                    {/* Main content */}
                    <div className="md:w-2/3">
                        <div className='flex gap-2 items-center mb-4 justify-end'>
                            <h3 className='text-slate-400'>Chia sẻ </h3>
                            <FacebookShareButton
                                url={process.env.NEXT_PUBLIC_SITE_URL! + /bai-viet/ + article.slug}
                                quote={article.title}
                                hashtag={article.seo.keywords}
                            >
                                <FacebookIcon size={32} round/>
                            </FacebookShareButton>
                            <TelegramShareButton
                                url={process.env.NEXT_PUBLIC_SITE_URL! + /bai-viet/ + article.slug}
                                title={article.title}
                            >
                                <TelegramIcon size={32} round/>
                            </TelegramShareButton>
                            <TwitterShareButton
                                url={process.env.NEXT_PUBLIC_SITE_URL! + /bai-viet/ + article.slug}
                                title={article.title}
                            >
                                <TwitterIcon size={32} round/>
                            </TwitterShareButton>
                            <LinkedinShareButton url={process.env.NEXT_PUBLIC_SITE_URL! + /bai-viet/ + article.slug}>
                                <LinkedinIcon size={32} round />
                            </LinkedinShareButton>

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
                                {article.content}
                            </ReactMarkdown>
                        </article>
                        <div className="mt-12 pt-8 border-t border-border">
                            <div className="flex items-start space-x-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage
                                        src={article.author.avatar}
                                        alt={article.author.name}
                                    />
                                    <AvatarFallback>
                                        {article.author.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {article.author.name}
                                    </h3>

                                    <div className="flex space-x-2 mt-2">
                                        <Link
                                            href='#'
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary"
                                        >
                                            <Facebook className="h-5 w-5"/>
                                            <span className="sr-only">Facebook</span>
                                        </Link>
                                        <Link
                                            href='#'
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary"
                                        >
                                            <Instagram className="h-5 w-5"/>
                                            <span className="sr-only">Instagram</span>
                                        </Link>
                                        <Link
                                            href='#'
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary"
                                        >
                                            <Mail className="h-5 w-5"/>
                                            <span className="sr-only">Email</span>
                                        </Link>
                                    </div>

                                    <div className='mt-4 text-sm text-slate-600'>{article.author.description}</div>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold mt-10">Bình luận</h3>
                        <div className='max-h-[500px] overflow-y-auto'>
                            {comments.data.map(item => <Comment data={item.attributes} key={item.id}/>)}
                        </div>
                        <DynamicPagination currentPage={comments.meta.pagination.page}
                                           totalPages={comments.meta.pagination.pageCount}
                                           onPageChange={(page) => {
                                               if (page !== comments.meta.pagination.page) {
                                                   router.push(`/bai-viet/${article.slug}?pageComment=${page}`)
                                               }
                                           }}/>
                        <CreateCommentForm articleId={article.id}/>
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
                                        placeholder="Tìm kiếm bài viết..."
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

                            {/* Related posts */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4">
                                    Bài viết liên quan
                                </h3>
                                <div className="space-y-4">
                                    {article.related_post.map((post) => (
                                        <Link
                                            href={`/bai-viet/${post.slug}`}
                                            key={post.slug}
                                            className="flex items-center space-x-4 group"
                                        >
                                            <div className="relative w-16 h-16 flex-shrink-0">
                                                <LazyImage
                                                    src={post.cover.url || ''}
                                                    alt={post.cover.alternativeText!}
                                                    objectFit="cover"
                                                    className="rounded-md"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                                                    {post.name}
                                                </h4>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                        </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
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
