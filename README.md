# LUMEA — Dashly Studio test

Home Page fragment (Hero + How it works) — **Next.js 15**, **Strapi 5**, **PostgreSQL**.

## Submission package

После деплоя отправь проверяющим:

| Item | Value |
|------|--------|
| Frontend URL | _(Vercel URL)_ |
| GitHub repo | _(repo URL)_ |
| Strapi Admin | `https://<your-strapi>/admin` |
| Admin email | `test@example.com` |
| Admin password | `LumeaTest123!` |
| This README | локальный запуск ниже |

> Если на проде админ создавался вручную — пришли те credentials. Локальный seed создаёт тестового админа только когда admin-users ещё нет.

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS 4, Framer Motion |
| CMS | Strapi 5 |
| DB | PostgreSQL 16 (Docker locally / Render managed in prod) |

## Quick start (local)

### Prerequisites

- Node.js 20+
- Docker
- npm

### 1. Database

```bash
docker compose up -d
```

Postgres on host port **5433** → container `5432`.

### 2. CMS

```bash
cd cms
cp .env.example .env   # if missing
npm install
npm run develop
```

Seeds: announcements, categories, 5 products (both pricing modes), Public permissions, test admin.

- Admin: http://localhost:1337/admin  
- Email: `test@example.com`  
- Password: `LumeaTest123!`

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

http://localhost:3000 — `NEXT_PUBLIC_STRAPI_URL=http://127.0.0.1:1337`

### Or from repo root

```bash
npm install
npm run dev          # db + Strapi + Next
```

---

## Deploy

### A. Strapi + Postgres (Render)

1. Push repo to GitHub.
2. Render → **New → Blueprint** → select repo (`render.yaml` in root).
3. Set `FRONTEND_URL` to your Vercel domain (e.g. `https://lumea.vercel.app`).
4. After first deploy, open `/admin`, login with seeded admin **or** create one if DB was empty without bootstrap.
5. Confirm Settings → Users & Permissions → Public has `find` / `findOne` on Announcement / Product / Category.
6. Copy public Strapi URL (e.g. `https://lumea-strapi.onrender.com`).

Free tier sleeps — cold start ~30–60s is OK per brief.

### B. Frontend (Vercel)

1. Import repo → Root Directory: **`frontend`**.
2. Env: `NEXT_PUBLIC_STRAPI_URL=https://<your-strapi-host>` (no trailing slash).
3. Deploy. Optionally `NEXT_PUBLIC_SITE_URL=https://<vercel-domain>` for OG.

### C. Wire CORS

In Strapi `FRONTEND_URL` (and/or Render env) must match the Vercel origin so browser calls succeed.

---

## CMS vs static

**Strapi:** announcement messages, categories, products (image, volume, badges, variations, pricing modes, M2M).

**Static:** Hero copy/images/CTAs, four Step Cards, layout/animations.

## Pricing modes

1. `percent_off` — `price` + `discountPercent` → frontend sale price  
2. `sale_price` — `compareAtPrice` + `salePrice` → frontend % badge  

---

## Project structure

```
├── frontend/           Next.js
├── cms/                Strapi
├── docker-compose.yml
├── render.yaml         Render blueprint
└── README.md
```

## Scripts (root)

```bash
npm run db:up
npm run dev
npm run dev:cms
npm run dev:web
```
