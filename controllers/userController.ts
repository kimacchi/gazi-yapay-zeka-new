import PocketBase from "pocketbase";
import { User , UserPatch} from "@/types/user";
import pb from "./pocketbase";

export const createUser = async (
  data: User
) => {
  try {
    const record = await pb.collection("users").create(data);
    return record;      
  } catch (error) {
    return {"error": error}
  }
};

export const login = async (
  verifier: string,
  password: string
) => {
  try {
    const authData = await pb.collection("users").authWithPassword(verifier, password);
    console.log(pb.authStore.model)
    return authData
  } catch (error) {
    return {"error": error}
  }
}

export const logoff = () => {
  pb.authStore.clear()
}

export const getList = async (page: number = 1, perPage: number = 20) => {
  try {
    const resultList = await pb.collection("users").getList(page, perPage)
    return resultList
  } catch (error) {
    return {"error": error}
  }
}

export const getUser = async (id: string) => {
  try {
    const result = await pb.collection("users").getOne(id)
    return result
  } catch (error) {
    return {"error": error}
  }
}

export const deleteUser = async (id: string) => {
  try {
    await pb.collection("users").delete(id)
    return {"status": 200}
  } catch (error) {
    return {"status": 204}
  }
}

export const patchUser = async (id: string, changes: UserPatch) => {
  try {
    const record = await pb.collection('users').update(id, changes);
    return record
  } catch (error) {
    return {"error": error}
  }
}
