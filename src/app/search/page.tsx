import { Suspense } from 'react';
import { allPosts } from '@/constants/posts';
import SearchPageContent from './Content';
import type { Metadata } from 'next';
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { q: query } = await searchParams;

  return {
    title: `Recherche : ${query}`,
    description: `Résultats de recherche pour "${query}".`,
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q: query } = await searchParams;
  const initialResults = query
    ? allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes((query as string).toLowerCase()) ||
          post.excerpt.toLowerCase().includes((query as string).toLowerCase())
      )
    : [];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent
        initialQuery={query as string}
        initialResults={initialResults}
      />
    </Suspense>
  );
}
