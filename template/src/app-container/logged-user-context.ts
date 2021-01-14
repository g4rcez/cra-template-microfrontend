import { createContext } from "react";

export type Groups = {
  profile: string;
  code: string;
  group: string;
  name: string;
};

export type User = {
  groups: Groups[];
  name: string;
  company: string;
  claims: string[];
  code: string;
  jobTitle: string;
  sub: string;
  email: string;
};

export const UserContext = createContext<User | null>(null);

export const LoggedUserProvider = UserContext.Provider;
