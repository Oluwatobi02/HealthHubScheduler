import { createContext } from "react";

export interface AppContextType {
  logout: () => void;
  login: (email: string, password: string, isStaff: boolean) => void;
  isAuthenticated: boolean;
  token: string;
  error: boolean;
  message: { success: boolean | null; message: string };
  user: {
    name: string;
    email: string;
    medical_record: {
      basic_info: {
        address: string;
        age: number;
        height: number;
        weight: number;
        home_number: string;
        work_number: string;
      };
      emergency_contact: {
        name: string;
        address: string;
        email: string;
        home_number: string;
        work_number: string;
      };
      medical_history: {
        allergies: string;
        medications: string;
        medical_problems: string;
      };
    };
    notifications: {
        message: string;
        id: string;
        created_at: string;
    }[]
  };
}

export const UserContext = createContext<AppContextType | undefined>(undefined);
