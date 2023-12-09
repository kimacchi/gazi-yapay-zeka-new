import PocketBase from "pocketbase";
import { User , UserPatch} from "@/types/user";
import pb from "./pocketbase";

// TODO: Change models to use FormData in order to add pictures

export const createUser = async (
  data: User,
  pb: PocketBase
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
  password: string,
  pb: PocketBase
) => {
  try {
    const authData = await pb.collection("users").authWithPassword(verifier, password);
    console.log(authData)
    console.log(pb.authStore.model)
    return authData
  } catch (error) {
    const err = error as any
    if(err.response.message === "Failed to authenticate." || err.status === 400){
      return {"error": error, "status": 400}
    }
    return {"error": error}
  }
}

export const logoff = (pb: PocketBase) => {
  pb.authStore.clear()
}

export const getAllUsers = async (pb: PocketBase) => {
  try {
    const record = await pb.collection("users").getFullList();
    return record
  } catch (error) {
    return {"error": error}
  }
}

export const getList = async (page: number = 1, perPage: number = 20,pb: PocketBase) => {
  try {
    const resultList = await pb.collection("users").getList(page, perPage)
    return resultList
  } catch (error) {
    return {"error": error}
  }
}

export const getUser = async (id: string,pb: PocketBase) => {
  try {
    const result = await pb.collection("users").getOne(id)
    return result
  } catch (error) {
    return {"error": error}
  }
}

export const deleteUser = async (id: string,pb: PocketBase) => {
  try {
    await pb.collection("users").delete(id)
    return {"status": 200}
  } catch (error) {
    return {"status": 204}
  }
}

export const patchUser = async (id: string, changes: UserPatch,pb: PocketBase) => {
  try {
    const record = await pb.collection('users').update(id, changes);
    return record
  } catch (error) {
    return {"error": error}
  }
}

export const sendPasswordReset = async (email: string,pb: PocketBase) => {
  try {
    await pb.collection("users").requestPasswordReset(email)
    return {"status": 200}
  } catch (error) {
    return {"error": error, "status": 400}
  }
}

export const resetPassword = async (token: string, password: string, passwordConfirm: string,pb: PocketBase) => {
  try {
    await pb.collection("users").confirmPasswordReset(token, password, passwordConfirm)
    return {"status": 200}
  } catch (error) {
    return {"error": error, "status": 400}
  }
}

export const deleteAllUsers = async (pb: PocketBase) => {
  try {
    const record = await getAllUsers(pb);
    if (Array.isArray(record)) {
      console.log("this run")
      record.forEach(async (event) => {
        await deleteUser(event.id, pb);
      });
    }
    return await getAllUsers(pb);
  } catch (error) {
    return {"error": error, "status": 400}
  }
}