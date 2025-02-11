import {Metadata} from 'next';
import ArticlePageContent from './Content';
import {article, relatedPosts} from '@/constants/posts';
import {Article, Category, Post} from '@/lib/types';
import {getListCategory} from "@/service/categoryService";
import {convertRawCategoriesToCategories} from "@/service/categoryDTO";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function fetchArticle(slug: string): Promise<Article> {
  console.log(slug);
  return article;
}

async function fetchRelatedPosts(slug: string): Promise<Post[]> {
  console.log(slug);
  return relatedPosts;
}

async function fetchCategories(): Promise<Category[]> {
    const categoriesRaw = await getListCategory()
    return convertRawCategoriesToCategories(categoriesRaw.data, 'article')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (!slug) return {};

  const article = await fetchArticle(slug);

  return {
      title: article.title,
      description: 'Website chuyên tin tức nổi bật, chia sẻ phần mềm hay, các tool tiện ích.\n Xem ngày, giờ hoàng đạo.\n Xem tỷ giá ngoại tệ, giá vàng',
      keywords: 'software, tiện ích, blog, xem ngày hoàng đạo',
      viewport: 'width=device-width, initial-scale=1',
      robots: 'index, follow',
      openGraph: {
          title: article.title,
          description: 'Website chuyên tin tức nổi bật, chia sẻ phần mềm hay, các tool tiện ích.\n Xem ngày, giờ hoàng đạo.\n Xem tỷ giá ngoại tệ, giá vàng',
          images: 'https://example.com/image.jpg',
          type: 'website',
          url: 'https://example.com',
      },
      twitter: {
          card: 'summary_large_image',
          images: 'https://example.com/image.jpg',
          title: article.title,
          description: 'Website chuyên tin tức nổi bật, chia sẻ phần mềm hay, các tool tiện ích.\n Xem ngày, giờ hoàng đạo.\n Xem tỷ giá ngoại tệ, giá vàng',
      },
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
