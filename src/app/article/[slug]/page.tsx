import { Metadata } from 'next';
import ArticlePageContent from './Content';
import { article, categories, relatedPosts } from '@/constants/posts';
import { sitemetaData } from '@/constants/sitemetaData';
import { Article, Post, Category } from '@/lib/types';

type Props = {
  params: { slug: string };
};

async function fetchArticle(slug: string): Promise<Article> {
  return article;
}

async function fetchRelatedPosts(slug: string): Promise<Post[]> {
  return relatedPosts;
}

async function fetchCategories(): Promise<Category[]> {
  return categories;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (!slug) return {};

  const article = await fetchArticle(slug);

  return {
    title: `${article.title} | ${sitemetaData.title}`,
    description: ``,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const [article, relatedPosts, categories] = await Promise.all([
    fetchArticle(slug),
    fetchRelatedPosts(slug),
    fetchCategories(),
  ]);

  const props = { article, relatedPosts, categories: categories.slice(0, 5) };
  return <ArticlePageContent {...props} />;
}
