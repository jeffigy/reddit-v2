import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

// Community types
export interface Community {
  id: string;
  creatorId: string;
  numberOfMember: number;
  privacyType: "public" | "restricted " | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}
//CommunitySnippet types
export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}
// CommunityState types which contains an array of CommunitySnippet
interface CommunityState {
  mySnippets: CommunitySnippet[];
}

//defaultCommunityState is the default value of CommunityState
const defaultCommunityState: CommunityState = {
  mySnippets: [],
};
// communityState is the atom which contains the CommunityState
export const communityState = atom<CommunityState>({
  key: "communityState",
  default: defaultCommunityState,
});
