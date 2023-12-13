import { RecordModel } from "pocketbase";
import PocketBase from "pocketbase";

export const createMember = async (data: FormData, pb: PocketBase) => {
  try {
    const assignedCommittee = data.get("committee");
    console.log(data);
    const record = await pb.collection("members").create(data);
    console.log(record);
    if (assignedCommittee) {
      const committee = await pb
        .collection("committees")
        .update(assignedCommittee.toString(), {
          "members+": record.id,
        });
    }
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const deleteMember = async (id: string, pb: PocketBase) => {
  try {
    const record = await pb.collection("members").delete(id);
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const getMember = async (id: string, pb: PocketBase) => {
  try {
    const record = await pb.collection("members").getOne(id);
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const getMembers = async (pb: PocketBase) => {
  try {
    const record = await pb.collection("members").getFullList();
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const updateMember = async (
  id: string,
  data: FormData,
  pb: PocketBase
) => {
  try {
    const record = await pb.collection("members").update(id, data);
    const assignedCommittee = data.get("committee");
    if (assignedCommittee) {
      const committee = await pb
        .collection("committees")
        .update(assignedCommittee.toString(), {
          "members+": record.id,
        });
    }
    return record;
  } catch (error) {
    return { error: error };
  }
};

export const deleteMembers = async (pb: PocketBase) => {
  try {
    const record = await getMembers(pb);
    if (Array.isArray(record)) {
      record.forEach(async (member: RecordModel) => {
        await deleteMember(member.id, pb);
      });
    }
    return await getMembers(pb);
  } catch (error) {
    return { error: error };
  }
};
