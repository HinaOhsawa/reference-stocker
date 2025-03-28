import React from "react";
import PostCard from "./PostCard";
import { Post } from "@/types/types";

interface DataAllProps {
  PostAllData: Post[];
}

const PostList = ({ PostAllData }: DataAllProps) => {
  // 受け取った記事データをCardコンポーネントに渡す
  return (
    <div className="grid lg:grid-cols-3 px-4 py-4 gap-4">
      {PostAllData.map((Post: Post) => (
        <PostCard key={Post.id} PostData={Post} /> // map関数ではkeyを指定恣意ないとエラーになる
      ))}
    </div>
  );
};

export default PostList;
