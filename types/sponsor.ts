export interface Sponsor {
    category: "bronze" | "silver" | "gold" | "platinum" | "diamond" | "emerald",
    collectionId: string,
    created: string,
    id: string,
    collectionName: string,
    name: string,
    picture: string,
    updated: string,
}