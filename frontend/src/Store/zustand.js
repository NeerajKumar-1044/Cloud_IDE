import { create } from 'zustand'
import { persist , devtools} from 'zustand/middleware'

const UserStore = (set) => ({
    user: null,

    setUser: (User) => set(() => ({
        user: User 
        }))
});

export const useUser = create(persist(devtools(UserStore), { name: 'userStore' }));
