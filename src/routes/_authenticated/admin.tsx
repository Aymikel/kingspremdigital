import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { uploadMedia, isVideoUrl } from "@/lib/media";
import { claimAdminIfUnclaimed } from "@/lib/admin.functions";
import type { Database } from "@/integrations/supabase/types";

type Service = Database["public"]["Tables"]["services"]["Row"];
type Project = Database["public"]["Tables"]["projects"]["Row"];
type Media = Database["public"]["Tables"]["project_media"]["Row"];

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Content Dashboard — Kingsprem Digital" },
      { name: "description", content: "Manage services, portfolio projects, images and videos." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Content Dashboard — Kingsprem Digital" },
      { property: "og:description", content: "Manage services, portfolio projects, images and videos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id;
      if (!uid) return;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid)
        .eq("role", "admin")
        .maybeSingle();
      if (data) {
        setIsAdmin(true);
        return;
      }
      try {
        const res = await claimAdminIfUnclaimed();
        setIsAdmin(res.granted);
      } catch {
        setIsAdmin(false);
      }
    })();
  }, []);

  const services = useQuery({
    queryKey: ["admin", "services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data as Service[];
    },
  });

  const projects = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*, media:project_media(*)")
        .order("sort_order");
      if (error) throw error;
      return data as (Project & { media: Media[] })[];
    },
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin"] });
  };

  const [editing, setEditing] = useState<(Project & { media: Media[] }) | null>(null);
  const [creating, setCreating] = useState(false);

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Project deleted");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const reorder = useMutation({
    mutationFn: async ({ id, sort_order }: { id: string; sort_order: number }) => {
      const { error } = await supabase.from("projects").update({ sort_order }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
    onError: (e: Error) => toast.error(e.message),
  });

  const toggleFeatured = useMutation({
    mutationFn: async ({ id, featured }: { id: string; featured: boolean }) => {
      const { error } = await supabase.from("projects").update({ featured }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: invalidate,
    onError: (e: Error) => toast.error(e.message),
  });

  if (isAdmin === null) {
    return <div className="mx-auto max-w-7xl px-6 py-24 text-muted-foreground">Loading…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24">
        <h1 className="mb-4 font-display text-4xl uppercase">No admin access</h1>
        <p className="text-muted-foreground">
          This account is signed in but does not have content admin rights. Ask an existing
          admin to grant access.
        </p>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
          className="mt-8 border border-foreground/20 px-6 py-3 font-medium uppercase"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-accent">
            Content Dashboard
          </span>
          <h1 className="font-display text-5xl uppercase leading-none">Media & Portfolio</h1>
        </div>
        <div className="flex gap-3">
          <Link to="/portfolio" className="border border-foreground/20 px-5 py-3 font-medium uppercase text-sm">
            View site
          </Link>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
            className="border border-foreground/20 px-5 py-3 text-sm font-medium uppercase"
          >
            Sign out
          </button>
        </div>
      </div>

      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-3xl uppercase">Projects</h2>
          <button
            onClick={() => {
              setEditing(null);
              setCreating(true);
            }}
            className="bg-accent px-5 py-3 text-sm font-bold uppercase tracking-tighter text-accent-foreground"
          >
            + New project
          </button>
        </div>

        {projects.isLoading && <p className="text-muted-foreground">Loading projects…</p>}
        {projects.data?.length === 0 && (
          <p className="border border-dashed border-foreground/20 p-12 text-center text-muted-foreground">
            No projects yet. Create your first one.
          </p>
        )}

        <div className="space-y-px bg-foreground/10">
          {projects.data?.map((p, i) => (
            <div key={p.id} className="flex flex-wrap items-center gap-4 bg-background p-4">
              <div className="size-16 shrink-0 overflow-hidden bg-secondary">
                {p.cover_url ? (
                  isVideoUrl(p.cover_url) ? (
                    <video src={p.cover_url} className="h-full w-full object-cover" />
                  ) : (
                    <img src={p.cover_url} alt="" className="h-full w-full object-cover" />
                  )
                ) : null}
              </div>
              <div className="min-w-48 flex-1">
                <p className="font-display text-xl uppercase leading-tight">{p.title}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {services.data?.find((s) => s.id === p.service_id)?.name ?? "Unassigned"} ·{" "}
                  {p.media?.length ?? 0} media
                </p>
              </div>
              <label className="flex items-center gap-2 font-mono text-[10px] uppercase">
                <input
                  type="checkbox"
                  checked={p.featured}
                  onChange={(e) =>
                    toggleFeatured.mutate({ id: p.id, featured: e.target.checked })
                  }
                />
                Featured
              </label>
              <div className="flex gap-1">
                <button
                  className="border border-foreground/20 px-2 py-1 text-xs"
                  onClick={() => reorder.mutate({ id: p.id, sort_order: (p.sort_order ?? 0) - 1 })}
                  aria-label={`Move ${p.title} up`}
                >
                  ↑
                </button>
                <button
                  className="border border-foreground/20 px-2 py-1 text-xs"
                  onClick={() => reorder.mutate({ id: p.id, sort_order: (p.sort_order ?? 0) + 1 })}
                  aria-label={`Move ${p.title} down`}
                >
                  ↓
                </button>
              </div>
              <button
                className="border border-foreground/20 px-4 py-2 text-xs font-medium uppercase"
                onClick={() => {
                  setCreating(false);
                  setEditing(p);
                }}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 text-xs font-medium uppercase text-destructive"
                onClick={() => {
                  if (confirm(`Delete "${p.title}"?`)) remove.mutate(p.id);
                }}
              >
                Delete
              </button>
              <span className="sr-only">{i}</span>
            </div>
          ))}
        </div>
      </section>

      {(creating || editing) && (
        <ProjectEditor
          project={editing}
          services={services.data ?? []}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSaved={() => {
            invalidate();
            setCreating(false);
            setEditing(null);
          }}
        />
      )}

      <section>
        <h2 className="mb-6 font-display text-3xl uppercase">Services</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.data?.map((s) => (
            <ServiceEditor key={s.id} service={s} onSaved={invalidate} />
          ))}
        </div>
      </section>
    </div>
  );
}

function MediaPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <div>
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-3">
        <div className="size-20 shrink-0 overflow-hidden bg-secondary">
          {value ? (
            isVideoUrl(value) ? (
              <video src={value} className="h-full w-full object-cover" />
            ) : (
              <img src={value} alt="" className="h-full w-full object-cover" />
            )
          ) : null}
        </div>
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*,video/*"
            className="block text-xs"
            disabled={busy}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setBusy(true);
              try {
                onChange(await uploadMedia(file));
                toast.success("Uploaded");
              } catch (err) {
                toast.error(err instanceof Error ? err.message : "Upload failed");
              } finally {
                setBusy(false);
              }
            }}
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="font-mono text-[10px] uppercase text-destructive"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectEditor({
  project,
  services,
  onClose,
  onSaved,
}: {
  project: (Project & { media: Media[] }) | null;
  services: Service[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [serviceId, setServiceId] = useState(project?.service_id ?? services[0]?.id ?? "");
  const [client, setClient] = useState(project?.client_name ?? "");
  const [date, setDate] = useState(project?.project_date ?? "");
  const [cover, setCover] = useState<string | null>(project?.cover_url ?? null);
  const [video, setVideo] = useState<string | null>(project?.video_url ?? null);
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [published, setPublished] = useState(project?.published ?? true);
  const [media, setMedia] = useState<{ url: string; media_type: string; caption: string }[]>(
    (project?.media ?? []).map((m) => ({
      url: m.url,
      media_type: m.media_type,
      caption: m.caption ?? "",
    })),
  );
  const [busy, setBusy] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = {
        title,
        slug: project?.slug ?? (slugify(title) || `project-${Date.now()}`),
        description,
        service_id: serviceId || null,
        client_name: client || null,
        project_date: date || null,
        cover_url: cover,
        video_url: video,
        featured,
        published,
      };

      let projectId = project?.id;
      if (projectId) {
        const { error } = await supabase.from("projects").update(payload).eq("id", projectId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("projects")
          .insert(payload)
          .select("id")
          .single();
        if (error) throw error;
        projectId = data.id;
      }

      await supabase.from("project_media").delete().eq("project_id", projectId);
      if (media.length) {
        const { error } = await supabase.from("project_media").insert(
          media.map((m, i) => ({
            project_id: projectId!,
            url: m.url,
            media_type: m.media_type,
            caption: m.caption || null,
            sort_order: i + 1,
          })),
        );
        if (error) throw error;
      }

      toast.success("Project saved");
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-foreground/60 p-4 md:p-10">
      <form
        onSubmit={save}
        className="mx-auto max-w-3xl space-y-6 bg-background p-8"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-3xl uppercase">
            {project ? "Edit project" : "New project"}
          </h3>
          <button type="button" onClick={onClose} className="font-mono text-xs uppercase">
            Close
          </button>
        </div>

        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title"
          className="w-full border border-foreground/20 px-4 py-3"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project description"
          rows={3}
          className="w-full border border-foreground/20 px-4 py-3"
        />
        <div className="grid gap-4 md:grid-cols-3">
          <select
            value={serviceId ?? ""}
            onChange={(e) => setServiceId(e.target.value)}
            className="border border-foreground/20 px-4 py-3"
          >
            <option value="">No service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <input
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="Client"
            className="border border-foreground/20 px-4 py-3"
          />
          <input
            type="date"
            value={date ?? ""}
            onChange={(e) => setDate(e.target.value)}
            className="border border-foreground/20 px-4 py-3"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <MediaPicker label="Cover image" value={cover} onChange={setCover} />
          <MediaPicker label="Video (optional)" value={video} onChange={setVideo} />
        </div>

        <div className="flex gap-6 font-mono text-[11px] uppercase">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            Featured
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
            Published
          </label>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-display text-2xl uppercase">Gallery</h4>
            <label className="cursor-pointer border border-foreground/20 px-4 py-2 text-xs font-medium uppercase">
              + Add media
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={async (e) => {
                  const files = Array.from(e.target.files ?? []);
                  for (const file of files) {
                    try {
                      const url = await uploadMedia(file);
                      setMedia((m) => [
                        ...m,
                        {
                          url,
                          media_type: file.type.startsWith("video") ? "video" : "image",
                          caption: "",
                        },
                      ]);
                    } catch (err) {
                      toast.error(err instanceof Error ? err.message : "Upload failed");
                    }
                  }
                }}
              />
            </label>
          </div>
          <div className="space-y-3">
            {media.map((m, i) => (
              <div key={m.url} className="flex items-center gap-3">
                <div className="size-14 shrink-0 overflow-hidden bg-secondary">
                  {m.media_type === "video" ? (
                    <video src={m.url} className="h-full w-full object-cover" />
                  ) : (
                    <img src={m.url} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <input
                  value={m.caption}
                  onChange={(e) =>
                    setMedia((arr) =>
                      arr.map((x, j) => (j === i ? { ...x, caption: e.target.value } : x)),
                    )
                  }
                  placeholder="Caption"
                  className="flex-1 border border-foreground/20 px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setMedia((arr) => arr.filter((_, j) => j !== i))}
                  className="font-mono text-[10px] uppercase text-destructive"
                >
                  Remove
                </button>
              </div>
            ))}
            {media.length === 0 && (
              <p className="text-sm text-muted-foreground">No gallery media yet.</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={busy}
          className="w-full bg-foreground px-6 py-4 font-bold uppercase tracking-tighter text-background disabled:opacity-50"
        >
          {busy ? "Saving…" : "Save project"}
        </button>
      </form>
    </div>
  );
}

function ServiceEditor({ service, onSaved }: { service: Service; onSaved: () => void }) {
  const [description, setDescription] = useState(service.description);
  const [hero, setHero] = useState<string | null>(service.hero_image_url);
  const [heroVideo, setHeroVideo] = useState<string | null>(service.hero_video_url);
  const [busy, setBusy] = useState(false);

  return (
    <div className="space-y-4 border border-foreground/10 p-6">
      <h3 className="font-display text-2xl uppercase leading-tight">{service.name}</h3>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className="w-full border border-foreground/20 px-3 py-2 text-sm"
      />
      <MediaPicker label="Hero image" value={hero} onChange={setHero} />
      <MediaPicker label="Hero video" value={heroVideo} onChange={setHeroVideo} />
      <button
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          const { error } = await supabase
            .from("services")
            .update({ description, hero_image_url: hero, hero_video_url: heroVideo })
            .eq("id", service.id);
          setBusy(false);
          if (error) toast.error(error.message);
          else {
            toast.success("Service updated");
            onSaved();
          }
        }}
        className="w-full bg-foreground px-4 py-3 text-sm font-bold uppercase text-background disabled:opacity-50"
      >
        Save service
      </button>
    </div>
  );
}
