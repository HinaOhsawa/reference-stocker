export interface Post {
  id: string;
  title: string;
  url: string;
  memo: string;
  userId: string;
  published: boolean;
  user: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
}

export interface Tag {
  id: string;
  name: string;
}
