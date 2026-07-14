import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-9xl tracking-tighter text-foreground">
            404
          </h1>
          <h2 className="mt-2 font-display text-2xl uppercase tracking-tight">
            Page not found
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-block bg-foreground px-8 py-3 text-sm font-bold uppercase tracking-widest text-background hover:bg-accent"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl uppercase tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end. Try refreshing or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-foreground px-6 py-3 text-sm font-bold uppercase tracking-widest text-background hover:bg-accent"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-foreground/20 px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-foreground hover:text-background"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          title:
            "Pro-Visual Media — Creative Media Agency in Akure, Nigeria",
        },
        {
          name: "description",
          content:
            "Creative media solutions in Akure, Ondo State: web design, branding, live streaming, photography, videography, and equipment rental for businesses, churches, and organizations.",
        },
        { name: "author", content: "Pro-Visual Media" },
        {
          property: "og:title",
          content:
            "Pro-Visual Media — Creative Media Agency in Akure, Nigeria",
        },
        {
          property: "og:description",
          content:
            "Creative media solutions in Akure, Ondo State: web design, branding, live streaming, photography, videography, and equipment rental for businesses, churches, and organizations.",
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Pro-Visual Media" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Pro-Visual Media — Creative Media Agency in Akure, Nigeria" },
        { name: "twitter:description", content: "Creative media solutions in Akure, Ondo State: web design, branding, live streaming, photography, videography, and equipment rental for businesses, churches, and organizations." },
        { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/dd305cb4-0cc5-41f6-9d5c-1c7948ccb09a/id-preview-738f3ef7--52c3a8f1-f5e6-4b0b-b539-fe89b9936a96.lovable.app-1784038883581.png" },
        { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/dd305cb4-0cc5-41f6-9d5c-1c7948ccb09a/id-preview-738f3ef7--52c3a8f1-f5e6-4b0b-b539-fe89b9936a96.lovable.app-1784038883581.png" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <SiteNav />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
