import { UserContext_ } from "./user";

export interface Event{
    id: string;
    name: string;
    description: string;
    maxParticipant: number;
    isOnline: boolean;
    location: string;
    eventTime: Date;
    exclusiveForActiveMembers: boolean;
    activeMembersGetFirst: boolean;
    currentMemberCount: number;
    releaseTime: Date;
    closeTime: Date;
    reqPhoneNo: boolean;
    reqSchoolNo: boolean;
    reqFaculty: boolean;
    reqGrade: boolean;
    collectionId: string;
    collectionName: string;
    created: Date;
    updated: Date;
    participants: string[];
    expand?: {
        participants: UserContext_[];
    }
}