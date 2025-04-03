import { User } from '@/types/db';
import { create } from 'zustand'
// (db연결)
type State = {
    user: Partial<User>;
}

type Action = {
    updateUser: (user: State['user']) => void;
}

// Create your store, which includes both state and (optionally) actions
const useUserStore = create<State & Action>((set) => ({
    user: {
        id: "",
        name: ""
    },
    updateUser: (user) => set(() => ({ user })),
}));

export { useUserStore }