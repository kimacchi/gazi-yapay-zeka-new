import { RecordModel } from "pocketbase";
import pb from "./pocketbase";

export const createMember = async (data: FormData) => {
    try {
        const record = await pb.collection("members").create(data);
        return record;      
    } catch (error) {
        return {"error": error}
    }
};

export const deleteMember = async (id: string) => {
    try {
        const record = await pb.collection("members").delete(id);
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const getMember = async (id: string) => {
    try {
        const record = await pb.collection("members").getOne(id);
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const getMembers = async () => {
    try {
        const record = await pb.collection("members").getFullList();
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const updateMember = async (id: string, data: FormData) => {
    try {
        const record = await pb.collection("members").update(id, data);
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const deleteMembers = async () => {
    try {
        const record = await getMembers();
        if(Array.isArray(record)) {
            record.forEach(async (member: RecordModel) => {
                await deleteMember(member.id);
            })
        }
        return await getMembers();      
    } catch (error) {
        return {"error": error}
    }
}
