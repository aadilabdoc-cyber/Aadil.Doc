"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/types/project";
import { projectHref } from "@/lib/categories";
import Spinner from "./Spinner";

export default function ProjectCard({
  project,
  priority,
  aspect = "aspect-[3/2]",
}: {
  project: Project;
  priority?: boolean;
  aspect?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link href={projectHref(project)} className="group block">
      <div className={`relative overflow-hidden bg-graphite ${aspect}`}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onLoad={() => setLoaded(true)}
        />
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
      <h3 className="mt-2 text-base text-aged-ivory">{project.title}</h3>
    </Link>
  );
}
