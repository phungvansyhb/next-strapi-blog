import { Suspense } from 'react';
import SearchPageContent from './Content';
import type { Metadata } from 'next';
import {genSiteMetaData} from "@/constants/sitemetaData";
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { q: query } = await searchParams;
  return genSiteMetaData(query ? `Tìm kiếm ${query}` : 'Tìm kiếm')
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q: query } = await searchParams;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent
        initialQuery={query as string}
        initialResults={[]}
      />
    </Suspense>
  );
}
