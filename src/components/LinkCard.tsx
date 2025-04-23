// components/LinkCard.tsx
"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
// import Image from "next/image";

type OGPData = {
  title: string;
  description: string;
  image: string;
  url: string;
};

export default function LinkCard({ url }: { url: string }) {
  const [data, setData] = useState<OGPData | null>(null);

  useEffect(() => {
    fetch(`/api/ogp?url=${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  if (!data) return null;

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()} // 親要素へのイベント伝播を防げる
    >
      <Card className="flex flex-col p-0 sm:flex-row overflow-hidden hover:shadow-md transition-shadow">
        {data.image ? (
          <div className=" w-full sm:w-1/3 h-48 sm:h-auto ">
            <img
              src={data.image}
              alt={data.title}
              className="w-full hover:opacity-90 transition "
            />
          </div>
        ) : (
          <div className="w-full sm:w-1/3 h-48 sm:h-auto w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No preview available
          </div>
        )}
        <CardContent className="p-4 flex flex-col justify-between gap-2 sm:w-2/3">
          <div>
            <h3 className="text-base font-semibold line-clamp-2">
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
