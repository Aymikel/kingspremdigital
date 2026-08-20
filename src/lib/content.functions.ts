import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
export type MediaRow = Database["public"]["Tables"]["project_media"]["Row"];

export type ProjectWithMedia = ProjectRow & {
  media: MediaRow[];
  service: { slug: string; name: string } | null;
};

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

const PROJECT_SELECT =
  "*, media:project_media(*), service:services(slug, name)";

function sortMedia(rows: ProjectWithMedia[]): ProjectWithMedia[] {
  return rows.map((p) => ({
    ...p,
    media: [...(p.media ?? [])].sort((a, b) => a.sort_order - b.sort_order),
  }));
}

export const listServices = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as ServiceRow[];
});

export const listProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("projects")
    .select(PROJECT_SELECT)
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return sortMedia((data ?? []) as unknown as ProjectWithMedia[]);
});

export const getHomeContent = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const [services, projects] = await Promise.all([
    supabase.from("services").select("*").order("sort_order", { ascending: true }),
    supabase
      .from("projects")
      .select(PROJECT_SELECT)
      .eq("published", true)
      .order("sort_order", { ascending: true }),
  ]);
  if (services.error) throw new Error(services.error.message);
  if (projects.error) throw new Error(projects.error.message);
  const all = sortMedia((projects.data ?? []) as unknown as ProjectWithMedia[]);
  return {
    services: (services.data ?? []) as ServiceRow[],
    featured: all.filter((p) => p.featured).slice(0, 7),
    latest: [...all]
      .sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""))
      .slice(0, 4),
    videos: all.filter((p) => !!p.video_url).slice(0, 3),
  };
});

export const getServiceDetail = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const supabase = publicClient();
    const { data: service, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!service) return null;
    const { data: projects, error: pErr } = await supabase
      .from("projects")
      .select(PROJECT_SELECT)
      .eq("published", true)
      .eq("service_id", service.id)
      .order("sort_order", { ascending: true });
    if (pErr) throw new Error(pErr.message);
    return {
      service: service as ServiceRow,
      projects: sortMedia((projects ?? []) as unknown as ProjectWithMedia[]),
    };
  });

export const getProjectDetail = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const { data: project, error } = await publicClient()
      .from("projects")
      .select(PROJECT_SELECT)
      .eq("published", true)
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!project) return null;
    return sortMedia([project as unknown as ProjectWithMedia])[0]!;
  });
