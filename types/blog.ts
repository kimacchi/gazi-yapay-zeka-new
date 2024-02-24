import { UserContext_ } from "./user";

export interface Blog {
    id: string;
    title: string;
    category: string;
    summary: string;
    content: string;
    thumbnail: string;
    createdAt: string;
    updatedAt: string;
    author: string;
    expand?: {
        author: UserContext_;
    };
    collectionId: string;
}