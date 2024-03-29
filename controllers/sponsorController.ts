import PocketBase from "pocketbase";

export const createSponsor = async (data: any, pb: PocketBase) => {
    try {
        const record = await pb.collection("sponsors").create(data);
        return record;      
    } catch (error) {
        return {"error": error}
    }
};

export const deleteSponsor = async (id: string, pb: PocketBase) => {
    try {
        const record = await pb.collection("sponsors").delete(id);
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const getSponsor = async (id: string, pb: PocketBase) => {
    try {
        const record = await pb.collection("sponsors").getOne(id);
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const getSponsors = async (pb: PocketBase) => {
    try {
        const record = await pb.collection("sponsors").getFullList();
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const updateSponsor = async (id: string, data: FormData, pb: PocketBase) => {
    try {
        const record = await pb.collection("sponsors").update(id, data);
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const deleteSponsors = async (pb: PocketBase) => {
    try {
        const record = await getSponsors(pb);
        if(Array.isArray(record)) {
            record.forEach(async (sponsor) => {
                await deleteSponsor(sponsor.id, pb);
            })
        }
        return await getSponsors(pb);      
    } catch (error) {
        return {"error": error}
    }
}

