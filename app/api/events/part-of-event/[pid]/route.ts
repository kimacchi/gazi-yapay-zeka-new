import { Event } from "@/types/event";
import { cookies } from "next/headers";
import PocketBase from "pocketbase";
// import pb from "@/controllers/pocketbase"

const pb = new PocketBase("https://gazi-yapay-zeka.pockethost.io");

export async function GET(
  req: Request,
  { params }: { params: { pid: string } }
) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");
  const token = cookies().get("pb_auth")?.value;
  pb.authStore.loadFromCookie(token || "");
  const event = (await pb.collection("events").getOne(params.pid)) as Event;
  return new Response(
    JSON.stringify({
      partOfEvent:
        event.participants.includes(pb.authStore.model?.id || "") ||
        event.reserved.includes(pb.authStore.model?.id || ""),
    })
  );
}
