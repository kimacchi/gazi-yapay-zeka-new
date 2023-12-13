import { Member } from "./member";

export interface Commitee{
    id: string;
    committeeName: string;
    collectionId: string;
    collectionName: string;
    created: Date;
    updated: Date;
    members: string[];
    expand?: {
        members: Member[];
    }
    onFrontPage: boolean;
}