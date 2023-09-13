# Job Tracker

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## To-do

Implement notes
Implement status changing
Customize signup / signin pages

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

    jobs: (/api/trpc/jobs/add) {job}
    jobs: (/api/trpc/jobs/get) {string userId, number jobId}
    jobs: (/api/trpc/jobs/update) {job}
    jobs: (/api/trpc/jobs/getForUser) {string userId}
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

### Folder structure
```
src
├───components
│   ├───loading
│   └───ui
├───lib
├───pages
│   ├───api
│   │   └───trpc
│   ├───dashboard
│   │   └───[user]
│   ├───error
│   ├───sign-in
│   └───sign-up
├───server
│   ├───api
│   │   └───routers
│   └───db
│       └───schema
├───styles
└───utils
```