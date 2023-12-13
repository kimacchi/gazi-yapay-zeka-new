import PocketBase from "pocketbase";

export const createCommittee = async (data: FormData, pb: PocketBase) => {
    try {
        const record = await pb.collection("committees").create(data);
        return record;      
    } catch (error) {
        return {"error": error}
    }
};

export const deleteCommittee = async (id: string, pb: PocketBase) => {
    try {
        const record = await pb.collection("committees").delete(id);
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const getCommittee = async (id: string, pb: PocketBase) => {
    try {
        const record = await pb.collection("committees").getOne(id);
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const getCommittees = async (pb: PocketBase) => {
    try {
        const record = await pb.collection("committees").getFullList();
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const updateCommittee = async (id: string, data: FormData, pb: PocketBase) => {
    try {
        const record = await pb.collection("committees").update(id, data);
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const deleteCommittees = async (pb: PocketBase) => {
    try {
        const record = await getCommittees(pb);
        if(Array.isArray(record)) {
            record.forEach(async (committee) => {
                await deleteCommittee(committee.id, pb);
            })
        }
        return await getCommittees(pb);      
    } catch (error) {
        return {"error": error}
    }
}
