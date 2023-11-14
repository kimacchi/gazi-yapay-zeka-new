import { createEvent, getList } from "@/controllers/eventController"

export async function GET(req: Request) {
    // TODO: get all events
    const {searchParams} = new URL(req.url);
    const page = searchParams.get("page");
    const perPage = searchParams.get("per_page");
    return new Response(JSON.stringify(await getList(parseInt(page || "1"), parseInt(perPage || "20"))))
}

export async function POST(req: Request) {
    // TODO: create an event
    const body = await req.json();
    // console.log(body, "this is inside post request event")
    const createdEvent = await createEvent(body)
    return new Response(JSON.stringify(createdEvent))
}