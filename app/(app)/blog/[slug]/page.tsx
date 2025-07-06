import { MdxComponent } from "@/components/mdx-component";
import type { Post } from "@/lib/types";
import { notFound } from "next/navigation";
import { load } from "outstatic/server";
import React from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const db = await load();

  const post = await db
    .find<Post>({
      collection: "posts",
      slug,
    })
    .project([
      "title",
      "description",
      "publishedAt",
      "slug",
      "content",
      "coverImage",
    ])
    .first();

  if (!post) {
    return notFound();
  }

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-bold">{post.title}</h1>
      <i className="mb-6">{post.description}</i>
      <MdxComponent content={post.content} />
    </div>
  );
}
