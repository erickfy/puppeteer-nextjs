## Puppeteer Scrapping

First, run the development server :rocket: :

```bash
npm install
npm run dev
```

```bash
# Database
npx prisma migrate --name firstMigration
npx prisma migrate reset

npx prisma generate
npx prisma db seed
```
