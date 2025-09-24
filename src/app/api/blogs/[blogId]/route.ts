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