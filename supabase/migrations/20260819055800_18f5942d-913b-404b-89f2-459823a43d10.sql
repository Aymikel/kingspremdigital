
CREATE TYPE public.app_role AS ENUM ('admin','editor','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can read their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  tagline text,
  description text NOT NULL DEFAULT '',
  includes text[] NOT NULL DEFAULT '{}',
  hero_image_url text,
  hero_video_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Services are public" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins manage services" ON public.services FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER services_updated_at BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  service_id uuid REFERENCES public.services(id) ON DELETE SET NULL,
  client_name text,
  project_date date,
  cover_url text,
  cover_ratio text,
  video_url text,
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published projects are public" ON public.projects FOR SELECT USING (published = true);
CREATE POLICY "Admins manage projects" ON public.projects FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX projects_service_idx ON public.projects(service_id);

CREATE TABLE public.project_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  url text NOT NULL,
  media_type text NOT NULL DEFAULT 'image',
  caption text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.project_media TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_media TO authenticated;
GRANT ALL ON public.project_media TO service_role;
ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Project media is public" ON public.project_media FOR SELECT USING (true);
CREATE POLICY "Admins manage project media" ON public.project_media FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX project_media_project_idx ON public.project_media(project_id);

INSERT INTO public.services (slug, name, tagline, description, includes, hero_image_url, sort_order) VALUES
('website-design','Website Design','Modern, responsive websites','Modern, responsive websites — from landing pages to full e-commerce platforms — built to convert and easy to maintain.', ARRAY['UI/UX design','Responsive development','SEO foundations','Analytics setup'], NULL, 1),
('graphic-design','Graphic Design','Identity systems & collateral','Full visual identity systems and marketing collateral that make your brand impossible to ignore.', ARRAY['Logo & identity','Flyers & banners','Social media kits','Print collateral'], '/__l5e/assets-v1/765b044a-7a9a-466a-bc13-3c874bf7c659/church-flyer-art.jpg', 2),
('live-streaming','Live Streaming','Multi-cam broadcast production','Multi-cam professional streaming for churches, conferences, weddings, seminars, concerts, and corporate events.', ARRAY['Multi-camera capture','Broadcast switching','Multi-platform output','On-site engineers'], '/__l5e/assets-v1/c48e0bbc-eb05-49c9-86a8-181574e0c995/flame-art.jpg', 3),
('equipment-rental','Equipment Rental','Cinema-grade gear for hire','Cinema-grade cameras, projectors, LED screens, microphones, sound systems, lighting, laptops, and streaming rigs for hire.', ARRAY['Camera & lens kits','Sound systems','LED walls & projectors','Lighting packages'], '/__l5e/assets-v1/e57b8fd5-f9b1-4590-9dca-9ca1a8a33168/camera-rig.jpg', 4),
('photography','Photography','Editorial and event photography','Weddings, birthdays, graduations, corporate branding, products, and events — with an editorial eye.', ARRAY['Weddings & events','Corporate portraits','Product photography','Editorial shoots'], '/__l5e/assets-v1/2cf294d8-f389-46ad-bc61-fd3fe912f9c2/client-portrait.jpg', 5),
('videography','Videography','Films, reels and event coverage','Commercial videos, documentaries, event coverage, promotional videos, interviews, music videos, and social content.', ARRAY['Commercial films','Event coverage','Music videos','Social content'], '/__l5e/assets-v1/e57b8fd5-f9b1-4590-9dca-9ca1a8a33168/camera-rig.jpg', 6);

INSERT INTO public.projects (slug, title, description, service_id, client_name, project_date, cover_url, cover_ratio, video_url, featured, sort_order) VALUES
('excellent-greatness-farm-logo','Excellent Greatness Farm Venture','Primary circular logo mark for an agro venture, plus a simplified secondary lockup.',(SELECT id FROM public.services WHERE slug='graphic-design'),'Excellent Greatness Farm Venture','2024-05-01','/__l5e/assets-v1/cc28a25a-cd25-460b-835e-ddeb7ef4ada8/farm-logo-full.jpg','aspect-square',NULL,true,1),
('mistell-treats-convocation-flyer','Mistell Treats Convocation Flyer','Celebration menu campaign flyer for an Akungba food brand.',(SELECT id FROM public.services WHERE slug='graphic-design'),'Mistell Treats','2024-08-10','/__l5e/assets-v1/86035fdf-abd1-4f2d-9c7c-aeee775ec30e/mistell-convocation.png','aspect-square',NULL,true,2),
('busayo-ige-convocation-invite','Dr. Busayo Sarah Ige — Convocation','PhD convocation invitation design for ABUAD.',(SELECT id FROM public.services WHERE slug='graphic-design'),'Dr. Busayo Sarah Ige','2024-11-02','/__l5e/assets-v1/6f157f21-061e-4cc1-80d2-a322b09c7341/convocation-invite.png','aspect-square',NULL,true,3),
('maesta-letterhead','Maesta Graphics Studio Letterhead','Corporate letterhead and stationery layout.',(SELECT id FROM public.services WHERE slug='graphic-design'),'Maesta Graphics Studio','2024-03-15','/__l5e/assets-v1/7a7e0aa6-0bb5-4d49-9aad-da50f3459516/maesta-letterhead.jpg','aspect-[3/4]',NULL,false,4),
('pastries-jungle-business-card','Pastries Jungle Business Card','Double-sided business card design with 3D presentation mockup.',(SELECT id FROM public.services WHERE slug='graphic-design'),'Pastries Jungle','2024-02-21','/__l5e/assets-v1/81e18f15-f7c7-478f-b185-20ac406e33f0/pastries-card.jpg','aspect-[16/10]',NULL,true,5),
('mistell-treats-promo-reel','Mistell Treats Promo Reel','Short-form food promo video for social media.',(SELECT id FROM public.services WHERE slug='videography'),'Mistell Treats','2024-09-05','/__l5e/assets-v1/a254f92d-9b20-4967-a4ac-92bf6b24b64a/mistell-logo.jpg','aspect-[9/16]','/__l5e/assets-v1/ccd46bce-81b1-448e-b488-2e054bf30aaa/mistell-reel.mp4',true,6),
('mistell-treats-brand-identity','Mistell Treats Brand Identity','Chef hat and cutlery monogram with reversed navy lockup.',(SELECT id FROM public.services WHERE slug='graphic-design'),'Mistell Treats','2023-07-19','/__l5e/assets-v1/a254f92d-9b20-4967-a4ac-92bf6b24b64a/mistell-logo.jpg','aspect-square',NULL,false,7),
('divine-life-communication-flyer','Divine Life Communication Flyer','Mobile repair service promotional flyer.',(SELECT id FROM public.services WHERE slug='graphic-design'),'Divine Life Communication','2024-06-01','/__l5e/assets-v1/f70108c9-53ea-4977-a1f6-a28340b3e1f4/divine-life-flyer.jpg','aspect-[3/4]',NULL,false,8),
('fbc-akure-jamb-program','First Baptist Church Akure — JAMB Program','Call for support and volunteers campaign flyer.',(SELECT id FROM public.services WHERE slug='graphic-design'),'First Baptist Church Akure','2025-01-20','/__l5e/assets-v1/d67a8d4c-5046-466d-8633-600e21471df7/jamb-support-flyer.png','aspect-[3/4]',NULL,false,9),
('farm-letterhead','Excellent Greatness Farm Letterhead','Branded letterhead for the farm venture.',(SELECT id FROM public.services WHERE slug='graphic-design'),'Excellent Greatness Farm Venture','2024-05-20','/__l5e/assets-v1/9b526469-9130-4443-ba5e-7f411b26bb5d/farm-letterhead.jpg','aspect-[3/4]',NULL,false,10),
('holy-spirit-book-cover','Manifesting the Fruit and Gifts of the Holy Spirit','Full wrap book cover for Joseph Adeyemi Akintunde.',(SELECT id FROM public.services WHERE slug='graphic-design'),'Joseph Adeyemi Akintunde','2024-10-01','/__l5e/assets-v1/0ad19d6d-949c-4453-ac4e-858e27b1f313/holy-spirit-book-cover.png','aspect-[4/3]',NULL,true,11);

INSERT INTO public.project_media (project_id, url, media_type, caption, sort_order) VALUES
((SELECT id FROM public.projects WHERE slug='excellent-greatness-farm-logo'),'/__l5e/assets-v1/cc28a25a-cd25-460b-835e-ddeb7ef4ada8/farm-logo-full.jpg','image','Primary circular logo mark',1),
((SELECT id FROM public.projects WHERE slug='excellent-greatness-farm-logo'),'/__l5e/assets-v1/97f7874e-a627-4cef-8db4-491d20af4311/farm-logo-alt.png','image','Simplified secondary lockup',2),
((SELECT id FROM public.projects WHERE slug='excellent-greatness-farm-logo'),'/__l5e/assets-v1/9b526469-9130-4443-ba5e-7f411b26bb5d/farm-letterhead.jpg','image','Branded letterhead',3),
((SELECT id FROM public.projects WHERE slug='mistell-treats-convocation-flyer'),'/__l5e/assets-v1/86035fdf-abd1-4f2d-9c7c-aeee775ec30e/mistell-convocation.png','image','Campaign flyer',1),
((SELECT id FROM public.projects WHERE slug='busayo-ige-convocation-invite'),'/__l5e/assets-v1/6f157f21-061e-4cc1-80d2-a322b09c7341/convocation-invite.png','image','Convocation invitation',1),
((SELECT id FROM public.projects WHERE slug='maesta-letterhead'),'/__l5e/assets-v1/7a7e0aa6-0bb5-4d49-9aad-da50f3459516/maesta-letterhead.jpg','image','Letterhead layout',1),
((SELECT id FROM public.projects WHERE slug='pastries-jungle-business-card'),'/__l5e/assets-v1/81e18f15-f7c7-478f-b185-20ac406e33f0/pastries-card.jpg','image','Card artwork',1),
((SELECT id FROM public.projects WHERE slug='pastries-jungle-business-card'),'/__l5e/assets-v1/4c55edee-f6da-4805-995c-63b55af8d0d9/pastries-card-mockup.png','image','3D presentation mockup',2),
((SELECT id FROM public.projects WHERE slug='mistell-treats-promo-reel'),'/__l5e/assets-v1/ccd46bce-81b1-448e-b488-2e054bf30aaa/mistell-reel.mp4','video','Promo reel',1),
((SELECT id FROM public.projects WHERE slug='mistell-treats-brand-identity'),'/__l5e/assets-v1/a254f92d-9b20-4967-a4ac-92bf6b24b64a/mistell-logo.jpg','image','Primary logo',1),
((SELECT id FROM public.projects WHERE slug='mistell-treats-brand-identity'),'/__l5e/assets-v1/2793f4db-a2dc-44ac-8414-869c43f84048/mistell-logo-navy.jpg','image','Reversed navy lockup',2),
((SELECT id FROM public.projects WHERE slug='divine-life-communication-flyer'),'/__l5e/assets-v1/f70108c9-53ea-4977-a1f6-a28340b3e1f4/divine-life-flyer.jpg','image','Service flyer',1),
((SELECT id FROM public.projects WHERE slug='fbc-akure-jamb-program'),'/__l5e/assets-v1/d67a8d4c-5046-466d-8633-600e21471df7/jamb-support-flyer.png','image','Campaign flyer',1),
((SELECT id FROM public.projects WHERE slug='farm-letterhead'),'/__l5e/assets-v1/9b526469-9130-4443-ba5e-7f411b26bb5d/farm-letterhead.jpg','image','Letterhead',1),
((SELECT id FROM public.projects WHERE slug='holy-spirit-book-cover'),'/__l5e/assets-v1/0ad19d6d-949c-4453-ac4e-858e27b1f313/holy-spirit-book-cover.png','image','Full wrap cover',1);
