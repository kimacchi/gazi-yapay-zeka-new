import { addParticipant } from "@/controllers/eventController";

export async function POST(req: Request, { params }: { params: { pid: string } }) {
    // TODO: update one event
    const body = await req.json();
    return new Response(JSON.stringify(await addParticipant(params.pid, body)));
}