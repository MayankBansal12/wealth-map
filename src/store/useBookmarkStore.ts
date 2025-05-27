import { create } from 'zustand'

export interface Bookmark {
  _id: string
  userId: string
  property: any
  createdAt: string
  updatedAt: string
}

interface BookmarkStore {
  bookmarks: Bookmark[]
  setBookmarks: (bookmarks: Bookmark[]) => void
  addBookmark: (bookmark: Bookmark) => void
  removeBookmark: (bookmarkId: string) => void
  isBookmarked: (attomId: number) => boolean
}

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarks: [],
  setBookmarks: (bookmarks) => set({ bookmarks }),
  addBookmark: (bookmark) => set((state) => ({ bookmarks: [bookmark, ...state.bookmarks] })),
  removeBookmark: (bookmarkId) =>
    set((state) => ({ bookmarks: state.bookmarks.filter((b) => b._id !== bookmarkId) })),
  isBookmarked: (attomId) => {
    return get().bookmarks.some((b) => b.property.attomId === attomId)
  },
}))
