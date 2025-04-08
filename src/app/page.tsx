import PostList from "@/components/PostList";
import SearchForm from "@/components/SearchForm";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const PostAllData = await getAllPosts();
  return (
    <>
      <SearchForm />
      <PostList PostAllData={PostAllData} />
    </>
  );
}
