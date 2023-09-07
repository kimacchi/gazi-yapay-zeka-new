import PocketBase from "pocketbase";
import pb from "./pocketbase";

export const test = async () => {
  console.log(pb.authStore.token, "this is from the test controller")
}