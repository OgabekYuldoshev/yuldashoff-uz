import { MdxComponent } from "@/components/mdx-component";
import { Magnetic } from "@/components/ui/magnetic";
import type { Post, Project } from "@/lib/types";
import { Link } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { load } from "outstatic/server";
import React from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const db = await load();

  const project = await db
    .find<Project>({
      collection: "projects",
      slug,
    })
    .project([
      "title",
      "publishedAt",
      "slug",
      "content",
      "image",
      "href"
    ])
    .first();

  if (!project) {
    return notFound();
  }

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-xl font-bold">{project.title}</h1>
      <div className="relative w-full h-[360px] mb-2 overflow-hidden">
        <Image
          fill
          alt="Image"
          src={project.image || ''}
          className="aspect-video w-full rounded-xl object-contain"
        />
      </div>
      <a href={project.href} target="_blank" className="text-sm flex items-center gap-2 cursor-pointer w-fit">{project.href}</a>
      <MdxComponent content={project.content} />
    </div>
  );
}
