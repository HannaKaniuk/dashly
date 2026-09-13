# Submission checklist (Dashly Studio)

## 1. GitHub (repo already committed locally)

```bash
cd ~/Desktop/Dashly
gh auth login
gh repo create lumea-dashly --private --source=. --remote=origin --push
```

Or manually: create empty repo on GitHub, then:

```bash
git remote add origin git@github.com:<YOU>/lumea-dashly.git
git push -u origin main
```

## 2. Deploy Strapi (Render)

1. https://dashboard.render.com → New → Blueprint → connect the GitHub repo  
2. Uses root [`render.yaml`](render.yaml)  
3. Set env `FRONTEND_URL` = your Vercel URL (after step 3)  
4. Wait for first deploy (free tier cold starts are OK)

Admin (seeded on first empty DB bootstrap):

- URL: `https://<strapi-service>.onrender.com/admin`
- Email: `test@lumea.dev`
- Password: `LumeaTest123!`

If login fails (admin was created differently), reset via Render shell or create a new admin on first `/admin` visit.

## 3. Deploy frontend (Vercel)

1. https://vercel.com/new → import repo  
2. **Root Directory:** `frontend`  
3. Env:
   - `NEXT_PUBLIC_STRAPI_URL` = `https://<strapi-service>.onrender.com`
   - `NEXT_PUBLIC_SITE_URL` = `https://<your-app>.vercel.app`
4. Deploy

## 4. Send to Dashly

1. Frontend URL  
2. GitHub URL  
3. Strapi Admin URL + `test@lumea.dev` / `LumeaTest123!`  
4. Point to README for local run  

## Local verify before push

```bash
npm run db:up
npm run dev
# http://localhost:3000 + http://localhost:1337/admin
```
