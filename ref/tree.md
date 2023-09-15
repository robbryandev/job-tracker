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
    |   |   NavBar.tsx
    |   |   
    |   +---NewJobForm
    |   |       client.tsx
    |   |       jobAction.ts
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
    +---login
    |   \---[[...login]]
    |           page.tsx
    |           
    +---register
    |   \---[[...register]]
    |           page.tsx
    |           
    \---utils
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