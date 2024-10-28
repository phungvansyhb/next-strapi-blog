export interface Author {
  name: string;
  avatar: string;
}

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  category: string;
  author: Author;
  readTime: string;
  slug: string;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
  image: string;
}

export interface Article {
  title: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    position: string;
    avatar: string;
    twitter: string;
    linkedin: string;
    github: string;
  };
  imageUrl: string;
  content: string;
}
