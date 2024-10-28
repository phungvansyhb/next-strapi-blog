import { Suspense } from 'react';
import { allPosts } from '@/constants/posts';
import SearchPageContent from './Content';
import type { Metadata } from 'next';
export const dynamic = 'force-dynamic';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const query = await searchParams.q;

  return {
    title: `Recherche : ${query}`,
    description: `Résultats de recherche pour "${query}".`,
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = (await searchParams.q) || '';
  const initialResults = query
    ? allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent initialQuery={query} initialResults={initialResults} />
    </Suspense>
  );
}
