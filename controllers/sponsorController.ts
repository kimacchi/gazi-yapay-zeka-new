import pb from "./pocketbase";

export const createSponsor = async (data: FormData) => {
    try {
        const record = await pb.collection("sponsors").create(data);
        return record;      
    } catch (error) {
        return {"error": error}
    }
};

export const deleteSponsor = async (id: string) => {
    try {
        const record = await pb.collection("sponsors").delete(id);
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const getSponsor = async (id: string) => {
    try {
        const record = await pb.collection("sponsors").getOne(id);
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const getSponsors = async () => {
    try {
        const record = await pb.collection("sponsors").getFullList();
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const updateSponsor = async (id: string, data: FormData) => {
    try {
        const record = await pb.collection("sponsors").update(id, data);
        return record;      
    } catch (error) {
        return {"error": error}
    }
}

export const deleteSponsors = async () => {
    try {
        const record = await getSponsors();
        if(Array.isArray(record)) {
            record.forEach(async (sponsor) => {
                await deleteSponsor(sponsor.id);
            })
        }
        return await getSponsors();      
    } catch (error) {
        return {"error": error}
    }
}

