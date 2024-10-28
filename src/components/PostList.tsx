import { Post } from '@/lib/types';
import PostCard from './PostCard';

export default function PostList({
  posts,
  header,
}: {
  posts: Post[];
  header?: string;
}) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-lg">
        {header && (
          <h2 className="text-3xl font-medium text-gray-900 dark:text-white mb-8 text-center">
            {header}
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
