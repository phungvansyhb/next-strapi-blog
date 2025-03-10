'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import PostCard from '@/components/PostCard';
import { Post } from '@/lib/types';
import DynamicPagination from '@/components/Pagination';
import { allPosts } from '@/constants/posts';

interface SearchPageContentProps {
  initialQuery: string;
  initialResults: Post[];
}

export default function SearchPageContent({
  initialQuery,
  initialResults,
}: SearchPageContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Post[]>(initialResults);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = (term: string) => {
    const results = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(searchTerm.trim())}`);
      performSearch(searchTerm);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-md mx-auto">
        <h1 className="text-xl font-medium text-gray-900 dark:text-white mb-8 text-center">
          Tìm kiếm
        </h1>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <Input
              type="search"
              placeholder="Tìm kiếm tài nguyên..."
              value={searchTerm}
              onChange={handleInputChange}
              className="w-full"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>
        </form>
      </div>
      <div className="max-w-screen-lg mx-auto">
        {searchResults.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchResults.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <div className="mt-8">
              <DynamicPagination
                currentPage={1}
                totalPages={Math.ceil(searchResults.length / 9)}
                onPageChange={() => {}}
              />
            </div>
          </>
        ) : searchTerm ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Không tìm thấy kết quả nào cho &quot;{searchTerm}&quot;.
          </p>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">
            Bắt đầu tìm kiếm của bạn để xem kết quả.
          </p>
        )}
      </div>
    </div>
  );
}
