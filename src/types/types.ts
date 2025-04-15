export interface Post {
  id: string;
  title: string;
  url: string;
  memo: string | undefined | null;
  // userId: string;
  published: boolean;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  tags?: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface Bookmark {
  id: string;
  createdAt: Date;
  post: Post[];
}
