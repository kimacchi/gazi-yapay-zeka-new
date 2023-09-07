import { getUser } from "@/controllers/userController";
import { NextApiRequest } from "next";

export async function GET(req: Request, { params }: { params: { pid: string } }){
    console.log(params)
    return new Response(JSON.stringify(getUser(params.pid)))
    // return new Response(JSON.stringify(getUser("dsfgdsfs")))
}