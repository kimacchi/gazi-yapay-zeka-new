import { AuthModel, RecordModel } from "pocketbase";
import pb from "./pocketbase";

export const createEvent = async (data: any) => {
  try {
    const record = await pb.collection("events").create(data);
    return record;
  } catch (error) {
    console.log(error);
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

export const addParticipant = async (id: string, data: {
  phoneNo?: string,
  schoolNo?: string,
  faculty?: string,
  grade?: number
}) => {
  try {
    if(pb.authStore.model){
      const participant = await pb.collection("participant").create({user: pb.authStore.model.id, ...data});
      console.log(participant);
      const event = await pb.collection("events").update(id, {
        "participants+": participant.id,
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

export const removeParticipant = async (id: string) => {
  try {
    if(pb.authStore.model){
      // TODO: check if this works.

      
      const selectedEvent = await pb.collection("events").getOne(id);
      const participant = await pb.collection("participant").getOne(selectedEvent.participants.find((participant: RecordModel) => participant.user === pb.authStore.model?.id).id);
      const event = await pb.collection("events").update(participant.event, {
        "participants-": participant.id,
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
    if(pb.authStore.model || true){
      type userModel = AuthModel & { activeMember: boolean };
      let user = pb.authStore.model as userModel;
      console.log("outside of if statement", user);
      const now = new Date(Date.now());
      const stringNow = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${now.getSeconds()}`;

      if (false) {
        console.log("inside of if statement", user);
        return await pb.collection("events").getList(page, perPage, {
          filter: `((releaseTime <= "${stringNow}") && (closeTime >= "${stringNow}") && (activeMembersGetFirst = false)) | ((closeTime >= "${stringNow}") && (activeMembersGetFirst = true))`,
        });
      }else{
        const events = await pb.collection("events").getList(page, perPage, {
          filter: `(releaseTime <= "${stringNow}") && (closeTime >= "${stringNow}") && (exclusiveForActiveMembers = false)`,
          sort: "-created"
        });
        console.log(events);
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
