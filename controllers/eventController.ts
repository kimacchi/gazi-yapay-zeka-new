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
    const record = await pb
      .collection("events")
      .getOne(id, { expand: "participants,reserved,left" });
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
    const prev = await pb.collection("events").getOne(id);
    let partDiff = prev.maxParticipant - data.maxParticipant;
    while (partDiff > 0) {
      if (prev.participants.length > 0) {
        const reservedUser = prev.participants[0];
        data = {
          ...data,
          "participants+": reservedUser,
          "reserved-": reservedUser,
        };
      }
      partDiff--;
    }
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

export const addParticipant = async (
  id: string,
  data: {
    phoneNo?: string;
    schoolNo?: string;
    faculty?: string;
    grade?: string;
    majoring?: string;
  },
  pb: PocketBase
) => {
  try {
    if (pb.authStore.model) {
      const updatedUser = await pb
        .collection("users")
        .update(pb.authStore.model.id, data);
      const event_ = await pb.collection("events").getOne(id);
      if (event_.participants.length < event_.maxParticipant) {
        const event = await pb.collection("events").update(id, {
          "participants+": updatedUser.id,
          "left-": updatedUser.id,
        });
        return event;
      }
      if (event_.reserved.length < event_.maxReserved) {
        const event = await pb.collection("events").update(id, {
          "reserved+": updatedUser.id,
          "left-": updatedUser.id,
        });
        return event;
      }
      return { error: "Event is full" };
    } else {
      return { error: "Not logged in" };
    }
  } catch (error) {
    return { error: error };
  }
};

export const removeParticipant = async (id: string, pb: PocketBase) => {
  try {
    if (pb.authStore.model) {
      // TODO: check if this works.
      const event_ = await pb.collection("events").getOne(id);
      if(event_.reserved.includes(pb.authStore.model.id)){
        const event = await pb.collection("events").update(id, {
          "reserved-": pb.authStore.model.id,
          "left+": pb.authStore.model.id,
        });
        return event;
      }

      let event = await pb.collection("events").update(id, {
        "participants-": pb.authStore.model.id,
        "left+": pb.authStore.model.id,
      });
      event = await pb.collection("events").getOne(id);
      if (event.reserved.length > 0) {
        const reservedUser = event.reserved[0];
        event = await pb.collection("events").update(id, {
          "participants+": reservedUser,
          "reserved-": reservedUser,
        });
      }
      return event;
    } else {
      return { error: "Not logged in" };
    }
  } catch (error) {
    return { error: error };
  }
};

export const removeAnyParticipant = async (
  id: string,
  userId: string,
  pb: PocketBase
) => {
  try {
    if (pb.authStore.model) {
      let event = await pb.collection("events").update(id, {
        "participants-": userId,
        "left+": userId,
      });
      event = await pb.collection("events").getOne(id);
      if (event.reserved.length > 0) {
        const reservedUser = event.reserved[0];
        event = await pb.collection("events").update(id, {
          "participants+": reservedUser,
          "reserved-": reservedUser,
        });
      }
      console.log(event);
      return event;
    } else {
      return { error: "Not logged in" };
    }
  } catch (error) {
    return { error: error };
  }
};

export const deleteReserved = async (
  id: string,
  userId: string,
  pb: PocketBase
) => {
  try {
    if (pb.authStore.model) {
      const event = await pb.collection("events").update(id, {
        "reserved-": userId,
        "left+": userId,
      });

      return event;
    } else {
      return { error: "Not logged in" };
    }
  } catch (error) {
    return { error: error };
  }
};

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

export const getList = async (
  page: number = 1,
  perPage: number = 20,
  pb: PocketBase
) => {
  console.log(pb.authStore.isValid, "is it valid ?");
  try {
    if (pb.authStore.model) {
      type userModel = AuthModel & { activeMember: boolean; admin: boolean };
      let user = pb.authStore.model as userModel;
      // console.log("outside of if statement", user);
      // const temp = new Date().toLocaleString("en-US", {timeZone: 'Asia/Almaty'});
      // const now = new Date(temp);
      // const stringNow = `${now.getFullYear()}-${
      //   now.getMonth() + 1
      // }-${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(
      //   2,
      //   "0"
      // )}:${now.getSeconds()}`;


      const currentDate = new Date();
  
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  const seconds = currentDate.getSeconds().toString().padStart(2, '0');

  const stringNow = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


      // console.log(user, "this is user")
      if (user.admin) {
        const events = await pb.collection("events").getList(page, perPage, {
          filter: `(closeTime >= "${stringNow}")`,
          sort: "+eventTime",
        });
        console.log(events);
        console.log(await pb.collection("events").getFullList())
        return events
      }
      if (user.activeMember) {
        // console.log("inside of if statement", user);
        const events= await pb.collection("events").getList(page, perPage, {
          filter: `((releaseTime <= "${stringNow}") && (closeTime >= "${stringNow}") && (activeMembersGetFirst = false) && (exclusiveForBoard = false)) || ((activeMemberReleaseTime <= "${stringNow}") && (closeTime >= "${stringNow}") && (activeMembersGetFirst = true) && exclusiveForBoard = false)`,
          sort: "+eventTime",
        });
        console.log(events);
        return events;
      } else {
        const events = await pb.collection("events").getList(page, perPage, {
          filter: `(releaseTime <= "${stringNow}") && (closeTime >= "${stringNow}") && (exclusiveForActiveMembers = false) && (exclusiveForBoard = false)`,
          sort: "+eventTime",
        });
        console.log(stringNow, "stringNow")

        console.log(events, "user");
        console.log(await pb.collection("events").getFullList())
        return events;
      }
    } else {
      console.log("not logged in");
      return { error: "Not logged in" };
    }
  } catch (error) {
    console.log(error);
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
