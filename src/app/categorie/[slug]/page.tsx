import React from 'react';
import CategoryPage from './Content';
import { Metadata } from 'next';
import { allPosts } from '@/constants/posts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slug;

  return {
    title: `Catégorie : ${categoryName}`,
    description: `Découvrez tous nos articles dans la catégorie ${categoryName}.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <CategoryPage posts={allPosts} slug={slug} />;
}
