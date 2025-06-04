"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Skeleton from "react-loading-skeleton"; // 追加（必要ならインストール）
import "react-loading-skeleton/dist/skeleton.css"; // スタイル読み込み

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
      <Card className="rounded-md flex gap-0 sm:gap-1 p-0 flex-row overflow-hidden">
        <div className="w-1/3 h-24">
          <Skeleton height="100%" />
        </div>
        <CardContent className="p-2 sm:p-4 flex flex-col justify-between gap-2 w-2/3">
          <Skeleton height={20} width="80%" />
          <Skeleton height={16} width="100%" />
          <Skeleton height={14} width="60%" />
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
