import pb from "./pocketbase"

export const createCommittee = async (data: FormData) => {
    try {
        const record = await pb.collection("committees").create(data);
        return record;      
    } catch (error) {
        return {"error": error}
    }
};

export const deleteCommittee = async (id: string) => {
    try {
        const record = await pb.collection("committees").delete(id);
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const getCommittee = async (id: string) => {
    try {
        const record = await pb.collection("committees").getOne(id);
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const getCommittees = async () => {
    try {
        const record = await pb.collection("committees").getFullList();
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const updateCommittee = async (id: string, data: FormData) => {
    try {
        const record = await pb.collection("committees").update(id, data);
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const deleteCommittees = async () => {
    try {
        const record = await getCommittees();
        if(Array.isArray(record)) {
            record.forEach(async (committee) => {
                await deleteCommittee(committee.id);
            })
        }
        return await getCommittees();      
    } catch (error) {
        return {"error": error}
    }
}
