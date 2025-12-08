import { CoursesGet } from "@/data/courses";
import { LocationsGet } from "@/data/locations";
import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => new URL(path, baseUrl).toString();
  const locations = await LocationsGet();
  const courses = await CoursesGet();

  return [
    // トップページ
    {
      url: url("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // (public)/course
    {
      url: url("/course"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...locations.map((loc): MetadataRoute.Sitemap[number] => ({
      url: url(`/location/${loc.id}`),
      lastModified: new Date(loc.date),
      changeFrequency: "weekly",
      priority: 0.6,
    })),
    ...courses.map((cou): MetadataRoute.Sitemap[number] => ({
      url: url(`/map/${cou.id}`),
      lastModified: new Date(cou.date),
      changeFrequency: "weekly",
      priority: 0.6,
    })),
  ];
}
