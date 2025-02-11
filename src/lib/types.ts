export interface Author {
  name: string;
  avatar: string;
  altText:string
}
export interface Media{
  fileUrl : string ,
  altText : string
}

export interface Post {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  cover : Media;
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
  description: string;
  date: string;
  readTime: string;
  category: string;
  author: Author;
  cover : Media;
  imageUrl: string;
  content: string;
}
