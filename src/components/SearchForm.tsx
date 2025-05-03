"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center sm:justify-end gap-1 mb-4"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded-full px-3 py-1"
        placeholder="記事を検索"
      />
      <button
        type="submit"
        className="cursor-pointer px-2 py-2 bg-black text-white rounded-full hover:opacity-80 transition"
      >
        <Search width={16} height={16} />
      </button>
    </form>
  );
}
