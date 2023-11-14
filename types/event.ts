export interface Event{
    id: string;
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
}