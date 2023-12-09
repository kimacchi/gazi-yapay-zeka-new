import { AuthModel, RecordModel } from "pocketbase";
// import pb from "./pocketbase";
import PocketBase from "pocketbase";
import { User, UserContextType, UserContext_ } from "@/types/user";
import { cookies } from "next/headers";

export const createEvent = async (data: any, pb: PocketBase) => {
  try {
    const record = await pb.collection("events").create(data);
    return record;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export const deleteEvent = async (id: string, pb: PocketBase) => {
  try {
    const record = await pb.collection("events").delete(id);
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const getEvent = async (id: string, pb: PocketBase) => {
  try {
    const record = await pb.collection("events").getOne(id, {expand: 'participants'});
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const getAllEvents = async (pb: PocketBase) => {
  try {
    const record = await pb.collection("events").getFullList();
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const updateEvent = async (id: string, data: any, pb: PocketBase) => {
  try {
    const record = await pb.collection("events").update(id, data);
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const deleteEvents = async (pb: PocketBase) => {
  try {
    const record = await getAllEvents(pb);
    if (Array.isArray(record)) {
      record.forEach(async (event) => {
        await deleteEvent(event.id, pb);
      });
    }
    return await getAllEvents(pb);
  } catch (error) {
    return { error: error };
  }
};

export const addParticipant = async (id: string, data: {
  phoneNo?: string,
  schoolNo?: string,
  faculty?: string,
  grade?: string,
  majoring?: string,
}, pb: PocketBase) => {
  try {
    if(pb.authStore.model){
      const updatedUser = await pb.collection("users").update(pb.authStore.model.id, data);
      const event = await pb.collection("events").update(id, {
        "participants+": updatedUser.id,
      });
      return event;
    }
    else{
      return {error: "Not logged in"}
    }
  } catch (error) {
    return { error: error };
  }
}

export const removeParticipant = async (id: string, pb: PocketBase) => {
  try {
    if(pb.authStore.model){
      // TODO: check if this works.
      
      // const selectedEvent = await pb.collection("events").getOne(id, {
      //   expand: 'participants',
      // });
      // const participant = selectedEvent.expand?.participants.find((user: any) => user.user  === pb.authStore.model?.id)
      // // console.log(selectedEvent.participants)
      const event = await pb.collection("events").update(id, {
        "participants-": pb.authStore.model.id,
      });
      return event;
    }
    else{
      return {error: "Not logged in"}
    }
  } catch (error) {
    return { error: error };
  }
}

export const removeAnyParticipant = async (id: string, userId: string, pb: PocketBase) => {
  try {
    if(pb.authStore.model){
      const event = await pb.collection("events").update(id, {
        "participants-": userId,
      });
      return event;
    }
    else{
      return {error: "Not logged in"}
    }
  } catch (error) {
    return { error: error };
  }
}

export const getAdminList = async (pb: PocketBase) => {
  try {
    const resultList = await pb.collection("events").getFullList({
      sort: "-created",
    });
    return resultList;
  } catch (error) {
    return { error: error };
  }
};

export const getList = async (page: number = 1, perPage: number = 20, pb: PocketBase) => {
  console.log(pb.authStore.isValid, "is it valid ?")
  try {
    if(pb.authStore.model){
      type userModel = AuthModel & { activeMember: boolean, admin: boolean };
      let user = pb.authStore.model as userModel;
      // console.log("outside of if statement", user);
      const now = new Date(Date.now());
      const stringNow = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${now.getSeconds()}`;
      // console.log(user, "this is user")
      if(user.admin){
        return await pb.collection("events").getList(page, perPage, {
          filter: `(closeTime >= "${stringNow}")`,
          sort: "+eventTime"
        });
      }
      if (user.activeMember) {
        // console.log("inside of if statement", user);
        return await pb.collection("events").getList(page, perPage, {
          filter: `((releaseTime <= "${stringNow}") && (closeTime >= "${stringNow}") && (activeMembersGetFirst = false) && (exclusiveForBoard = false)) || ((activeMemberReleaseTime <= "${stringNow}") && (closeTime >= "${stringNow}") && (activeMembersGetFirst = true) && exclusiveForBoard = false)`,
          sort: "+eventTime"
        });
      }else{
        const events = await pb.collection("events").getList(page, perPage, {
          filter: `(releaseTime <= "${stringNow}") && (closeTime >= "${stringNow}") && (exclusiveForActiveMembers = false) && (exclusiveForBoard = false)`,
          sort: "+eventTime"
        });
        // console.log(events);
        return events;

        /**
         * page
         * perPage
         * totalItems
         * totalPages
         * items
         */
      }
    }else{
      console.log("not logged in");
      return {error: "Not logged in"}
    }
  } catch (error) {
    console.log(error)
    return { error: error };
  }
  // try {
  //   if(pb.authStore.model){
  //       type userModel = AuthModel & { activeMember: boolean };
  //       let user = pb.authStore.model as userModel;
  //       if (user.activeMember) {
  //         return await pb.collection("events").getList(page, perPage, {
  //           filter: `(releaseTime <= ${Date.now()}) & (closeTime >= ${Date.now()})`,
  //         });
  //       }
  //       return await pb.collection("events").getList(page, perPage, {
  //         filter: `(releaseTime <= ${Date.now()}) & (closeTime >= ${Date.now()}) & (exclusiveForActiveMembers = false)`,
  //       });
  //   }
  //   return {error: "Not logged in"}
  // } catch (error) {
  //   return { error: error };
  // }
};
