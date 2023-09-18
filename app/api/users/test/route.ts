import pb from "@/controllers/pocketbase"
import { NextApiRequest } from "next"


export async function POST(request: Request) {
    const body = await request.formData()
    const record = await pb.collection("test").create(body)
    return new Response(JSON.stringify(record))
}