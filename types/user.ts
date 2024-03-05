export interface User {
  username: string;
  email: string;
  emailVisibility?: boolean;
  password: string;
  passwordConfirm: string;
  name: string;
}

export interface UserPatch {
  username?: string;
  email?: string;
  emailVisibility?: boolean;
  password?: string;
  passwordConfirm?: string;
  name?: string;
  oldPassword?: string;
}

export interface UserContext_ {
  id: string;
  username: string;
  email: string;
  name: string;
  admin: boolean;
  picture: any;
  collectionId: string;
  activeMember: boolean;
  created: Date;
  updated: Date;
  token: string;
  phoneNo: string;
  schoolNo: string;
  faculty: string;
  boardMember: boolean;
  grade:
    | "Hazırlık"
    | "1. Sınıf"
    | "2. Sınıf"
    | "3. Sınıf"
    | "4. Sınıf"
    | "5. Sınıf"
    | "6. Sınıf"
    | "Yüksek Lisans"
    | "Doktora"
    | "";
  majoring: string;
}
export interface UserContextType {
  user: UserContext_ | null;
  setUser: (user: UserContext_ | null) => void;
}
