# CARER Platform

Frontend for the Nasir Uddin Centre for Applied Research & Educational Resources website.

This project is now frontend-only. The backend has been extracted to the sibling project:

```text
../carer-backend
```

## Stack

- Astro
- React islands
- TypeScript
- Tailwind CSS
- Vercel adapter

## Local Development

Start the backend first:

```bash
cd ../carer-backend
pnpm install
cp .env.example .env.local
pnpm dev
```

Then start this frontend:

```bash
cd ../carer-platform
pnpm install
cp .env.example .env.local
pnpm dev
```

Set the frontend API URL in `.env.local`:

```env
PUBLIC_BACKEND_API_URL=http://localhost:8787
```

If server-side rendering needs a private backend URL, set `BACKEND_API_URL` as well.

## Project Structure

```text
carer-platform/
├── public/                  # Static assets
├── src/
│   ├── components/          # UI and page components
│   ├── layouts/             # Astro layouts
│   ├── lib/
│   │   ├── content-api.ts   # HTTP client for the separate backend
│   │   ├── images.ts        # Asset URL helpers
│   │   └── utils.ts         # UI utilities
│   ├── pages/               # Astro pages
│   ├── styles/              # Global styles
│   └── types/               # Shared frontend types
└── tests/                   # Frontend resiliency and schema tests
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm test
pnpm lint
pnpm format:check
```

## Backend Contract

The frontend expects these backend endpoints:

- `POST /api/contact`
- `GET /api/settings/:key`
- `GET /api/research-areas`
- `GET /api/certifications`

Backend secrets such as `DATABASE_URL` and `RESEND_API_KEY` belong only in the `carer-backend` environment.
