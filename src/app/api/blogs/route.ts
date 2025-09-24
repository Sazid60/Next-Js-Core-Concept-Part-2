/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export const blogs : any = [
    {
        "id": 10,
        "title": "Laborum Provident ",
        "content": "Do qui cupiditate ut",
        "thumbnail": "",
        "isFeatured": true,
        "tags": [
            "Provident incidunt"
        ],
        "views": 0,
        "authorId": 1,
        "createdAt": "2025-09-24T11:26:56.464Z",
        "updatedAt": "2025-09-24T11:26:56.464Z",
        "author": {
            "id": 1,
            "name": "Tanmoy Parvez",
            "email": "tanmoy@gmail.com"
        }
    },
    {
        "id": 9,
        "title": "Omnis dolores dolore",
        "content": "Accusamus autem dolo",
        "thumbnail": "",
        "isFeatured": true,
        "tags": [
            "Aut iure ullamco ips"
        ],
        "views": 0,
        "authorId": 1,
        "createdAt": "2025-09-24T10:14:10.639Z",
        "updatedAt": "2025-09-24T10:14:10.639Z",
        "author": {
            "id": 1,
            "name": "Tanmoy Parvez",
            "email": "tanmoy@gmail.com"
        }
    },
    {
        "id": 8,
        "title": "Enim non fugit non ",
        "content": "Ducimus sit quae e",
        "thumbnail": "https://www.mecup.cc",
        "isFeatured": true,
        "tags": [
            "Nihil voluptate aliq"
        ],
        "views": 1,
        "authorId": 1,
        "createdAt": "2025-09-24T10:13:45.986Z",
        "updatedAt": "2025-09-24T11:26:31.677Z",
        "author": {
            "id": 1,
            "name": "Tanmoy Parvez",
            "email": "tanmoy@gmail.com"
        }
    },
    {
        "id": 7,
        "title": "Molestiae itaque off",
        "content": "Ipsam quo eum esse a",
        "thumbnail": "https://www.jamozivu.me.uk",
        "isFeatured": true,
        "tags": [
            "Placeat ea non et a"
        ],
        "views": 0,
        "authorId": 1,
        "createdAt": "2025-09-24T10:13:16.400Z",
        "updatedAt": "2025-09-24T10:13:16.400Z",
        "author": {
            "id": 1,
            "name": "Tanmoy Parvez",
            "email": "tanmoy@gmail.com"
        }
    },
    {
        "id": 6,
        "title": "Alias non voluptates",
        "content": "Et exercitation a su",
        "thumbnail": "",
        "isFeatured": true,
        "tags": [
            "Amet repellendus I",
            "s",
            "a",
            "z"
        ],
        "views": 0,
        "authorId": 1,
        "createdAt": "2025-09-24T10:13:05.806Z",
        "updatedAt": "2025-09-24T10:13:05.806Z",
        "author": {
            "id": 1,
            "name": "Tanmoy Parvez",
            "email": "tanmoy@gmail.com"
        }
    },
    {
        "id": 5,
        "title": "Quibusdam nesciunt ",
        "content": "Facilis neque error ",
        "thumbnail": "https://www.qogafibexam.co",
        "isFeatured": true,
        "tags": [
            "Libero illum fugit"
        ],
        "views": 1,
        "authorId": 1,
        "createdAt": "2025-09-24T10:07:53.995Z",
        "updatedAt": "2025-09-24T10:08:09.365Z",
        "author": {
            "id": 1,
            "name": "Tanmoy Parvez",
            "email": "tanmoy@gmail.com"
        }
    },
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

