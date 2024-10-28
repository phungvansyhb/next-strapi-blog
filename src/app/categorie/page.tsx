import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import NewsletterOptin from '@/components/NewsletterBox';
import { categories } from '@/constants/posts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function CategoriesPage() {
  return (
    <>
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <h2 className="text-3xl mb-2 font-medium text-gray-900 dark:text-white text-center">
          Catégories
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          Explorez notre collection d&apos;articles soigneusement organisés par
          thèmes. Chaque catégorie vous offre une perspective unique sur les
          sujets qui vous passionnent.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categorie/${category.slug}`}>
              <Card className="overflow-hidden border-none">
                <div className="relative aspect-square">
                  <Image
                    src={category.image}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 hover:bg-opacity-30" />
                  <CardContent className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <h2 className="text-xl font-semibold mb-2 text-white">
                      {category.name}
                    </h2>
                    <Badge variant="secondary" className="bg-white text-black">
                      {category.count} articles
                    </Badge>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <NewsletterOptin />
    </>
  );
}
