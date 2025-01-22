import { User } from '@/type/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserAuthStoreType = {
  user: User | null
  setLoginUser: (userData: User) => void
  logoutUser: () => void
}

const useAuthStore = create<UserAuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      setLoginUser: (userData) => set({ user: userData }),
      logoutUser: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore
