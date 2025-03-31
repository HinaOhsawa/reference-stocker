"use client";

import type React from "react";

import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({
  tags,
  setTags,
  placeholder = "タグを追加",
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
    setInputValue("");
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">タグを削除</span>
            </button>
          </Badge>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1"
        />
        <button
          type="button"
          onClick={() => addTag(inputValue)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
          disabled={!inputValue.trim()}
        >
          追加
        </button>
      </div>
    </div>
  );
}
