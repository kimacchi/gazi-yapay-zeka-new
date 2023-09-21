import { getAllBlogs, createBlog } from "@/controllers/blogController"

export async function GET(req: Request) {
    const blogs = await getAllBlogs()
    return new Response(JSON.stringify(blogs))
}

export async function POST(req: Request) {
    const body = await req.formData()
    const record = await createBlog(body)
    return new Response(JSON.stringify(record))
}