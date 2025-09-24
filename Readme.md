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
- Using ISR for home page blogs

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCard from "@/components/modules/Blogs/BlogCard";
import Hero from "@/components/modules/Home/Hero";

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`);
  const { data: blogs } = await res.json();

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

## 53-3 Show off all the fantastic blogs using SSR

- using SSR for blogs page

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCard from "@/components/modules/Blogs/BlogCard";

const AllBlogsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
    cache: "no-store",
  });
  const { data: blogs } = await res.json();
  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl">All Blogs</h2>
      <div className=" grid grid-cols-3 gap-4 max-w-6xl mx-auto my-6">
        {blogs.map((blog: any) => (
          <BlogCard key={blog.id} post={blog} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogsPage;
```

## 53-4 Retrieve dynamic data with an ID for the detail page using SSR

```tsx
import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";

const BlogDetailsPage = async ({ params }: { params: Promise<{ blogId: string }> }) => {
    const { blogId } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId})

    const blog  = await res.json()
    return (
        <div className="py-30 px-4 max-w-7xl mx-auto">
            <h1>Blog Details Page</h1>
            <BlogDetailsCard blog={blog} />
        </div>
    );
};

export default BlogDetailsPage;
```

- by default a component is doing server site rendering. so loading state will appear here even if its not mentioned
- This is because of reducing load on server.
- Instead of doing this we can do something like top most visited 10/20 posts contents will be generated statically in build time instead of on-demand request this will smoothen the user experience. we will use `generateStaticParams()`.

## 53-5 Fetch dynamic data using generateStaticParams() for SSG

- The generateStaticParams function can be used in combination with dynamic route segments to statically generate routes at build time instead of on-demand at request time.

```tsx
import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";

export const generateStaticParams = async () => {
  return [
    {
      blogId: "1",
    },
  ];
};

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`);

  const blog = await res.json();
  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <h1>Blog Details Page</h1>
      <BlogDetailsCard blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;
```

![alt text](image.png)

- now grab the most visited post id dynamically.

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`);

  const { data: blogs } = await res.json();

  return blogs.slice(0, 2).map((blog: any) => ({
    blogId: String(blog.id),
  }));
};

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`);

  const blog = await res.json();
  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <h1>Blog Details Page</h1>
      <BlogDetailsCard blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;
```

## 53-6 Generating Dynamic Metadata with generateMetadata()

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCard from "@/components/modules/Blogs/BlogCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs | Next Blog",
  description: "This is a page which is seo Friendly",
};
const AllBlogsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
    cache: "no-store",
  });
  const { data: blogs } = await res.json();
  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl">All Blogs</h2>
      <div className=" grid grid-cols-3 gap-4 max-w-6xl mx-auto my-6">
        {blogs.map((blog: any) => (
          <BlogCard key={blog.id} post={blog} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogsPage;
```

- This is a basic seo works. we can add keyword, og image.

- Now lets see how we can add dynamic page dynamic meta data. we have to use it `generateMetadata`

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`);

  const { data: blogs } = await res.json();

  return blogs.slice(0, 2).map((blog: any) => ({
    blogId: String(blog.id),
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`);
  const blog = await res.json();

  return {
    title: blog?.title,
    description: blog?.content,
  };
};

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`);

  const blog = await res.json();
  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <h1>Blog Details Page</h1>
      <BlogDetailsCard blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;
```

## 53-7 Creating Blogs Using Next.js Form Component

- React Server Actions are Server Functions that execute on the server. They can be called in Server and Client Components to handle form submissions. This guide will walk you through how to create forms in Next.js with Server Actions.
- basic form

```tsx
"use client";

import { useState } from "react";

export default function CreateBlogForm() {
  const [isFeatured, setIsFeatured] = useState("false");

  return (
    <form className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Create Blog</h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="thumbnail">
          Thumbnail URL
        </label>
        <input
          type="url"
          id="thumbnail"
          name="thumbnail"
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="tags">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          placeholder="Next.js, React, Web Development"
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Featured */}
      <div>
        <p className="block text-sm font-medium mb-1">Featured</p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="isFeatured"
              value="true"
              checked={isFeatured === "true"}
              onChange={(e) => setIsFeatured(e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="isFeatured"
              value="false"
              checked={isFeatured === "false"}
              onChange={(e) => setIsFeatured(e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            No
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
```

- we will use next.js form component that will prevent the on click reload and we can pass a action/function inside.
- lets make the function
- for converting a regular function to server action function we have to use `use server`

```ts
"use server"; // for converting a regular function to server action function
export const create = async (data: FormData) => {};
```

- if we think of directly using the function inside the component we have say `use server`

```tsx
import CreateBlogForm from "@/components/modules/Blogs/CreateBlogForm";
import React from "react";

const CreateBlog = () => {
  "use server";
  const create = async (data: FormData) => {
    console.log(data);
  };
  return (
    <div className="w-full flex justify-between items-center">
      <CreateBlogForm />
    </div>
  );
};

export default CreateBlog;
```

- but we will do it in separate component

```tsx
"use client";

import { create } from "@/actions/create";
import Form from "next/form";

import { useState } from "react";

export default function CreateBlogForm() {
  const [isFeatured, setIsFeatured] = useState("false");

  return (
    <Form
      action={create}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 w-full"
    >
      <h2 className="text-xl font-semibold mb-4">Create Blog</h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="thumbnail">
          Thumbnail URL
        </label>
        <input
          type="url"
          id="thumbnail"
          name="thumbnail"
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="tags">
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          placeholder="Next.js, React, Web Development"
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Featured */}
      <div>
        <p className="block text-sm font-medium mb-1">Featured</p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="isFeatured"
              value="true"
              checked={isFeatured === "true"}
              onChange={(e) => setIsFeatured(e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="isFeatured"
              value="false"
              checked={isFeatured === "false"}
              onChange={(e) => setIsFeatured(e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            No
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </Form>
  );
}
```

- create function

```tsx
"use server"; // for converting a regular function to server action function
export const create = async (data: FormData) => {
  console.log(data); // in react form data is not consolable but in next.js its consolable
};
```

- this will not set the query parameter and stops page reloading

## 53-8 Creating Blogs Using Next.js Server Actions

- we are creating form data but we need to send plain object to backend so we have to convert the form data to plain object.

```tsx
"use server";

import { redirect } from "next/navigation";

export const create = async (data: FormData) => {
  const blogInfo = Object.fromEntries(data.entries());
  const modifiedData = {
    ...blogInfo,
    tags: blogInfo.tags
      .toString()
      .split(",")
      .map((tag) => tag.trim()),
    authorId: 1,
    isFeatured: Boolean(blogInfo.isFeatured),
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedData),
  });

  const result = await res.json();

  if (result?.id) {
    redirect("/blogs"); // we can not use any hooks inside server component so its used.
  }
  return result;
};
```

## 53-9 Create Blog with Server Actions & Revalidate Homepage

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogCard from "@/components/modules/Blogs/BlogCard";
import Hero from "@/components/modules/Home/Hero";

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
    next: {
      tags: ["BLOGS"], //re validate
    },
  });
  const { data: blogs } = await res.json();

  return (
    <div>
      <Hero />
      <h2 className="text-center my-5 text-4xl">Featured Posts</h2>
      <div className=" grid grid-cols-3 gap-4 max-w-6xl mx-auto">
        {blogs.slice(0, 3).map((blog: any) => (
          <BlogCard key={blog.id} post={blog} />
        ))}
      </div>
    </div>
  );
}
```

```tsx
"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const create = async (data: FormData) => {
  const blogInfo = Object.fromEntries(data.entries());
  const modifiedData = {
    ...blogInfo,
    tags: blogInfo.tags
      .toString()
      .split(",")
      .map((tag) => tag.trim()),
    authorId: 1,
    isFeatured: Boolean(blogInfo.isFeatured),
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedData),
  });

  const result = await res.json();

  if (result?.id) {
    revalidateTag("BLOGS");
    revalidatePath("/blogs"); // which paths we want to revalidate
    redirect("/"); // we can not use any hooks inside server component so its used.
  }
  return result;
};
```

## 53-10 Exploring Route Handlers and Building RESTful APIs

- using this we can use monolithic pattern and handle backend and frontend in same place
- we can create restful api in our frontend project. I mean parallel we can work in backend
- route handler will only work in `app directory`

- src -> app -> api -> blogs - > route.ts
```tsx 
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export const blogs : any = [
    {
        "id": 4,
        "title": "Getting Started with Next.js-5",
        "content": "Next.js introduces new features for building fast and scalable web applications. Learn how to set up your first project and explore its App Router.",
        "thumbnail": "https://teamraft.com/wp-content/uploads/nextjs.jpg",
        "isFeatured": true,
        "tags": [
            "Next.js",
            "React",
            "Web Development"
        ],
        "views": 11,
        "authorId": 1,
        "createdAt": "2025-09-23T05:52:17.501Z",
        "updatedAt": "2025-09-24T05:19:06.447Z",
        "author": {
            "id": 1,
            "name": "Tanmoy Parvez",
            "email": "tanmoy@gmail.com"
        }
    },
    {
        "id": 3,
        "title": "Getting Started with Next.js-2",
        "content": "Next.js introduces new features for building fast and scalable web applications. Learn how to set up your first project and explore its App Router.",
        "thumbnail": "https://teamraft.com/wp-content/uploads/nextjs.jpg",
        "isFeatured": true,
        "tags": [
            "Next.js",
            "React",
            "Web Development"
        ],
        "views": 7,
        "authorId": 1,
        "createdAt": "2025-09-23T05:49:43.604Z",
        "updatedAt": "2025-09-24T05:35:53.888Z",
        "author": {
            "id": 1,
            "name": "Tanmoy Parvez",
            "email": "tanmoy@gmail.com"
        }
    },
    {
        "id": 2,
        "title": "Getting Started with Next.js-2",
        "content": "Next.js introduces new features for building fast and scalable web applications. Learn how to set up your first project and explore its App Router.",
        "thumbnail": "https://teamraft.com/wp-content/uploads/nextjs.jpg",
        "isFeatured": true,
        "tags": [
            "Next.js",
            "React",
            "Web Development"
        ],
        "views": 1,
        "authorId": 1,
        "createdAt": "2025-09-23T04:59:07.064Z",
        "updatedAt": "2025-09-23T14:15:28.095Z",
        "author": {
            "id": 1,
            "name": "Tanmoy Parvez",
            "email": "tanmoy@gmail.com"
        }
    },
    {
        "id": 1,
        "title": "Getting Started with Next.js",
        "content": "Next.js introduces new features for building fast and scalable web applications. Learn how to set up your first project and explore its App Router.",
        "thumbnail": "https://teamraft.com/wp-content/uploads/nextjs.jpg",
        "isFeatured": true,
        "tags": [
            "Next.js",
            "React",
            "Web Development"
        ],
        "views": 2,
        "authorId": 1,
        "createdAt": "2025-09-23T03:48:44.594Z",
        "updatedAt": "2025-09-24T03:11:04.898Z",
        "author": {
            "id": 1,
            "name": "Tanmoy Parvez",
            "email": "tanmoy@gmail.com"
        }
    }
]

export const GET = async () => {
    return Response.json(blogs)
}


export const POST = async (request: Request) => {
  const blog = await request.json();

  const newBlog = {
    ...blog,
    id: blogs.length + 1
  };

  blogs.push(newBlog);

  return new NextResponse(JSON.stringify(newBlog), {
    status: 201,
    headers: {
      "content-type": "application/json",
    },
  });
};

```
- for dynamic we have do same as routing 
- src -> app -> api -> blogs - > [blogId] -> route.ts 

```ts 
import { NextResponse } from "next/server"
import { blogs } from "../route"

interface Author {
  id: number
  name: string
  email: string
}

interface IBlog {
  id: number
  title: string
  content: string
  thumbnail: string
  isFeatured: boolean
  tags: string[]
  views: number
  authorId: number
  createdAt: string   
  updatedAt: string   
  author: Author
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ blogId: string }> }
) {
  const { blogId } = await params
  const blog = blogs.find((blog :IBlog) => blog.id === parseInt(blogId))

  return NextResponse.json(blog)
}
```

- If we do monolithic pattern we need to initially deploy the project in vercel and then work 
- This is just for simple short time usage. In practical Monolithic pattern is not used like that separate server i9s maintained. 
