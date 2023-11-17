import { addParticipant, removeParticipant } from "@/controllers/eventController";

export async function POST(req: Request, { params }: { params: { pid: string } }) {
    const body = await req.json();
    return new Response(JSON.stringify(await addParticipant(params.pid, body)));
}

export async function DELETE(req: Request, { params }: { params: { pid: string } }) {
    return new Response(JSON.stringify(await removeParticipant(params.pid)));
}