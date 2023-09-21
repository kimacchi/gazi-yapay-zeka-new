import { AuthModel, RecordModel } from "pocketbase";
import pb from "./pocketbase";

export const createEvent = async (data: FormData) => {
  try {
    const record = await pb.collection("events").create(data);
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const record = await pb.collection("events").delete(id);
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const getEvent = async (id: string) => {
  try {
    const record = await pb.collection("events").getOne(id);
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const getAllEvents = async () => {
  try {
    const record = await pb.collection("events").getFullList();
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const updateEvent = async (id: string, data: FormData) => {
  try {
    const record = await pb.collection("events").update(id, data);
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const deleteEvents = async () => {
  try {
    const record = await getAllEvents();
    if (Array.isArray(record)) {
      record.forEach(async (event) => {
        await deleteEvent(event.id);
      });
    }
    return await getAllEvents();
  } catch (error) {
    return { error: error };
  }
};

export const getAdminList = async (page: number = 1, perPage: number = 20) => {
  try {
    const resultList = await pb.collection("events").getList(page, perPage);
    return resultList;
  } catch (error) {
    return { error: error };
  }
};

export const getList = async (page: number = 1, perPage: number = 20) => {
  try {
    if(pb.authStore.model){
        type userModel = AuthModel & { activeMember: boolean };
        let user = pb.authStore.model as userModel;
        if (user.activeMember) {
          return await pb.collection("events").getList(page, perPage, {
            filter: `(releaseTime <= ${Date.now()}) & (closeTime >= ${Date.now()})`,
          });
        }
        return await pb.collection("events").getList(page, perPage, {
          filter: `(releaseTime <= ${Date.now()}) & (closeTime >= ${Date.now()}) & (exclusiveForActiveMembers = false)`,
        });
    }
    return {error: "Not logged in"}
  } catch (error) {
    return { error: error };
  }
};
