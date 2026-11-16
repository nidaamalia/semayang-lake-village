![Desa Semayang — A tourism portal and content-management interface](docs/banner.svg)

# Desa Semayang

A tourism website for Desa Semayang, Kutai Kartanegara, East Kalimantan, with public discovery pages and an administrative content-management interface. Built with React, TypeScript, Vite, Tailwind CSS, shadcn/ui, and Supabase integrations.

## What to explore

- Tourism, culinary, accommodation, news, gallery, village-information, and contact pages.
- Shared public navigation and reusable section layouts.
- Administrative workflows for managing content.
- Authentication-aware route composition and image-upload integrations.

## Run locally

Use Node.js 22 LTS and npm. Configure a local `.env` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for your own Supabase project.

```bash
git clone https://github.com/nidaamalia/semayang-lake-village.git
cd semayang-lake-village
npm ci
npm run dev
```

Use a public anon/publishable key in the browser, never a service-role key. Live content workflows require matching database tables, storage buckets, and row-level policies; client-side route protection alone does not secure the database.

```bash
npm run build
npm test
```

## Code tour

- [App.tsx](src/App.tsx): public and protected administrative route composition.
- [PublicLayout.tsx](src/components/PublicLayout.tsx): shared public shell.
- [admin pages](src/pages/admin): content-editing workflows.
- [supabase.ts](src/lib/supabase.ts): browser data-client configuration.
- [auth.tsx](src/lib/auth.tsx): authentication state.

## Deployment notes

The frontend builds to `dist/`. Configure SPA fallback to `index.html` so direct links to nested pages work. Configure the deployed site's Supabase redirect URLs and verify database/storage policies before enabling administrative uploads.

No claim is made that bundled example tests cover all CMS or authorisation flows. Use sample content when demonstrating an unconfigured instance.

## Credit

Created by **webmedia.id**. Preserve the original attribution when reusing this work.
