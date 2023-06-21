import { atom } from "recoil";

// auth modal types
export interface AuthModalState {
  open: boolean;
  view: "login" | "signup" | "resetPassword";
}

//default state
const defaultModalState: AuthModalState = {
  open: false,
  view: "login",
};

//the atom
export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: defaultModalState,
});
