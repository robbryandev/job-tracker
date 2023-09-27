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
    |               client.tsx
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