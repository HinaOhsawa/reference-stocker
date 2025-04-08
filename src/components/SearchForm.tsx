"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border rounded px-2 py-1"
        placeholder="記事を検索"
      />
      <button
        type="submit"
        className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
      >
        検索
      </button>
    </form>
  );
}
