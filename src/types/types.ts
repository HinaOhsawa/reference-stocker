export interface Post {
  id: string;
  title: string;
  url: string;
  memo: string | undefined;
  // userId: string;
  published: boolean;
  user: User;
  createdAt: string;
  updatedAt: string;
  tags?: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
