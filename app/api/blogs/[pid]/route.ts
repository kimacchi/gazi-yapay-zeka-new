import { deleteBlog, getBlog, updateBlog } from "@/controllers/blogController";
import { cookies } from "next/headers";

import PocketBase from "pocketbase";
const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");
export async function GET(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");

    const blog = await getBlog(params.pid, pb);
    // TODO: get one blog
    return new Response(JSON.stringify(blog));
}
export async function PATCH(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    const blog = await updateBlog(params.pid, await req.formData(), pb);
    // TODO: update one blog
    return new Response(JSON.stringify(blog));
}
export async function DELETE(req: Request, { params }: { params: { pid: string } }) {
    const token = cookies().get("pb_auth")?.value
    pb.authStore.loadFromCookie(token || "");
    const blog = await deleteBlog(params.pid, pb);
    // TODO: delete one blog
    return new Response(JSON.stringify(blog));
}