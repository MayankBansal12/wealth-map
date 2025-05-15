import { User } from '@/type/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserAuthStoreType = {
  user: User | null
  login: (userData: User) => void
  logout: () => void
}

const useAuthStore = create<UserAuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore
