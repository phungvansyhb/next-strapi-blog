import {SEO} from "@/service/rawTypes";

export interface Author {
  name: string;
  avatar: string;
  altText:string
}
export interface Media{
  fileUrl : string ,
  altText : string ,
  width : number ,
  height : number
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
  createdAt : string;
  modifiedAt : string;
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
  slug : string ;
  description: string;
  date: string;
  readTime: string;
  category: string;
  author: Author;
  cover : Media;
  imageUrl: string;
  createdAt : string;
  modifiedAt : string;
  content: string;
  related_post: Partial<Post>[],
  comment : any[],
  seo : SEO,
  viewCount : number
}
