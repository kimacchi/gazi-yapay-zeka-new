import { createEvent } from "@/controllers/eventController"

export async function GET(req: Request) {
    // TODO: get all events
    return new Response(JSON.stringify({}))
}

export async function POST(req: Request) {
    // TODO: create an event
    const body = await req.json();
    // console.log(body, "this is inside post request event")
    const createdEvent = await createEvent(body)
    return new Response(JSON.stringify(createdEvent))
}