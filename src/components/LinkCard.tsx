"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type OGPData = {
  title: string;
  description: string;
  image: string;
  url: string;
};

export default function LinkCard({ url }: { url: string }) {
  const [data, setData] = useState<OGPData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/ogp?url=${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [url]);

  if (loading) {
    return (
      <Card className="rounded-md flex gap-0 sm:gap-1 p-0 flex-row overflow-hidden animate-pulse border border-gray-200">
        <div className="w-1/3 bg-gray-200 h-24 sm:h-32" />
        <CardContent className="p-2 sm:p-4 flex flex-col gap-2 w-2/3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-1/2 mt-auto" />
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      <Card className="rounded-md flex gap-0 sm:gap-1 p-0 flex-row overflow-hidden hover:shadow-md transition-shadow">
        {data.image ? (
          <div className="w-1/3 h-auto flex items-center">
            <img
              src={data.image}
              alt={data.title}
              className="w-full hover:opacity-90 transition"
            />
          </div>
        ) : (
          <div className="w-1/3 h-auto bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No preview available
          </div>
        )}
        <CardContent className="p-2 sm:p-4 flex flex-col justify-between gap-2 w-2/3">
          <div>
            <h3 className="sm:text-base text-sm font-semibold line-clamp-2">
              {data.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {data.description}
            </p>
          </div>
          <p className="text-xs text-blue-600 line-clamp-1">{data.url}</p>
        </CardContent>
      </Card>
    </a>
  );
}
