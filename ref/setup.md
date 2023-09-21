## Getting Started

First, configure your environment variables.

### Auth
Codes
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
```
Setup up [clerk](https://clerk.com/) auth.

This app is configured with the following auth settings:

* Email & password required
* Registration requires email verification code

### Db
Codes
```bash
# DATABASE_URL Follows the mysql connection url syntax
# mysql://user:password@host:port/dbname
DATABASE_URL
```
To initialize the job tables run
```bash
npm run db:migrate
npm run db:push
```

## Running
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.