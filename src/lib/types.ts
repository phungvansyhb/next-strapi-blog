import { Comment, SEO} from "@/typeDefs/rawTypes";

export interface Author {
  name: string;
  avatar: string;
  altText:string;
  description : string;
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

export interface App {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  cover : Media;
  date: string;
  category: string;
  createdAt : string;
  modifiedAt : string;
  slug: string;
}

export interface AppDetail {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  cover : Media;
  date: string;
  category: string;
  createdAt : string;
  modifiedAt : string;
  slug: string;
  seo : SEO,
  content : string,
  viewCount : number,
  src_url :string
}

export interface Category {
  name: string;
  slug: string;
  count: number;
  image: string;
}

export interface Article {
  id : number;
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
  related_post: {
    slug : string ,
    name : string,
    cover : {
      name : string ,
      alternativeText : string ,
      url : string
    }
  }[],
  // comments : Comment[],
  seo : SEO,
  viewCount : number
}


export interface Course {
  id : number;
  title: string;
  slug : string ;
  description: string;
  category: string;
  author: string;
  cover : Media;
  imageUrl: string;
  createdAt : string;
  modifiedAt : string;
  // outline: string;
  // seo : SEO
}

export interface CourseDetail {
  id : number;
  title: string;
  slug : string ;
  description: string;
  category: string;
  author: string;
  cover : Media;
  imageUrl: string;
  createdAt : string;
  modifiedAt : string;
  outline: string;
  seo : SEO
}
export type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
