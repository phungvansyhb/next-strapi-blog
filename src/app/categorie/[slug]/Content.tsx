'use client';

import NewsletterOptin from '@/components/NewsletterBox';
import DynamicPagination from '@/components/Pagination';
import PostList from '@/components/PostList';
import { Post } from '@/lib/types';
import React from 'react';

interface CategoryPageProps {
  posts: Post[];
  slug: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ posts, slug }) => {
  const categoryName = slug;

  return (
    <>
      <NewsletterOptin />
      <PostList posts={posts} header={`categorie/${categoryName}`} />
      <DynamicPagination
        currentPage={2}
        totalPages={2}
        onPageChange={() => {}}
      />
    </>
  );
};

export default CategoryPage;
