import React from "react";
import PostCard from "./PostCard";
import { Post } from "@/types/types";

interface DataAllProps {
  PostAllData: Post[];
}

const PostList = ({ PostAllData }: DataAllProps) => {
  // 受け取った記事データをCardコンポーネントに渡す
  return (
    <div className="grid mt-2 gap-4">
      {PostAllData.map((Post: Post) => (
        <PostCard key={Post.id} PostData={Post} /> // map関数ではkeyを指定しないとエラーになる
      ))}
    </div>
  );
};

export default PostList;
