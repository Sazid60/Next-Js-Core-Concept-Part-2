## Next Js Core Concept Part-2 
Server GitHub Repo Link:

https://github.com/Apollo-Level2-Web-Dev/next-blog-server



Frontend GitHub Repo Link:

https://github.com/Apollo-Level2-Web-Dev/next-blog-ui

## 53-1 Initial project setup and configure external server
- install Shadcn 

```
bunx --bun shadcn@latest init

```

```
bunx --bun shadcn@latest add button
```

## 53-2 Caching and revalidating the latest blogs on the homepage
- set the env.local 
- for this we must have to follow the conversion `NEXT_PUBLIC_BASE_API=`
- Remember for fetching the component must be a server component and async must be used. 

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCard from "@/components/modules/Blogs/BlogCard";
import Hero from "@/components/modules/Home/Hero";

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`)
  const { data: blogs } = await res.json()

  return (
    <div>
      <Hero />
      <h2 className="text-center my-5 text-4xl">Featured Posts</h2>
      <div className=" grid grid-cols-3 gap-4 ">
        {blogs.map((blog: any) => (
          <BlogCard key={blog.id} post={blog} />
        ))}

      </div>
    </div>
  );
}

```