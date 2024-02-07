## Puppeteer Scrapping

First, run the development server :rocket: :

```bash
npm install
npm run dev
```

```bash
# Database
npx prisma migrate reset
npx prisma migrate --name firstMigration


npx prisma studio
npx prisma generate
npx prisma db seed


# generate secret key (unix)
openssl rand -base64 32


# delete cache env
git rm --cached -r .env*

```

### deployed

Visit to the [website](https://puppeteer-nextjs-blond.vercel.app/) to get more information

## Stack

- [Recharts](https://recharts.org/en-US/api/RadarChart) - Charts.
- [Shadcn UI](https://ui.shadcn.com/docs) - **UI** Docs.
- [Lucia Auth](https://lucia-auth.com/) - **Authentication**.
- [Zustand](https://docs.pmnd.rs/zustand/guides/updating-state) - **State** Management.
- [NEXTJS](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes) - **Framework** (Parallel Routes).
