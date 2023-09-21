# Job Tracker

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

## To-do

### Main
* Flesh out home page
* Restyle app

### Stretch
* Implement Job aggregator
  - with button to directly add jobs to applied section

## Folder Structure 

```
src
|   middleware.ts
|   
\---app
    |   favicon.ico
    |   globals.css
    |   layout.tsx
    |   page.tsx
    |   
    +---components
    |   |   DisplayJobs.tsx
    |   |   JobStats.tsx
    |   |   NavBar.tsx
    |   |   
    |   +---DeleteJob
    |   |       client.tsx
    |   |       jobAction.ts
    |   |       
    |   +---NewJobForm
    |   |       client.tsx
    |   |       jobAction.ts
    |   |       
    |   +---NotesForm
    |   |       client.tsx
    |   |       NoteAction.ts
    |   |       
    |   \---UpdateJobForm
    |           client.tsx
    |           jobAction.ts
    |           
    +---dashboard
    |   |   page.tsx
    |   |   
    |   \---[user]
    |       \---[job]
    |               page.tsx
    |               
    +---hooks
    |       useLocal.ts
    |       
    +---login
    |   \---[[...login]]
    |           page.tsx
    |           
    +---register
    |   \---[[...register]]
    |           page.tsx
    |           
    \---utils
        |   color.ts
        |   date.ts
        |   
        \---db
            |   drizzle.ts
            |   jobs.ts
            |   
            \---schema
                    job.ts
                    schema.ts
                    
```

## Architecture

### DB
```mermaid
classDiagram
    class jobs
    jobs: int id
    jobs: string company
    jobs: date applyDate
    jobs: ["applied" | "rejected" | "interview" | "accepted"] status
    jobs: date statusDate
    jobs: string userId
    jobs: string content

    jobs: (jobDb.add) {job}
    jobs: (jobDb.getById) {string userId, number jobId}
    jobs: (jobDb.update) {job}
    jobs: (jobDb.getAll) {string userId}
```

### Routes
```mermaid
flowchart TB
    root<==>signup
    root<==>signin
    root<==>dashboard

    signup<==>signin

    dashboard<==>jobDetails
```