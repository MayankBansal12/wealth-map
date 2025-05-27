import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useBookmarkStore, Bookmark } from '@/store/useBookmarkStore'
import api from '@/services/api'

const BOOKMARKS_QUERY_KEY = ['bookmarks']

export function useBookmarks() {
  const setBookmarks = useBookmarkStore((s) => s.setBookmarks)
  return useQuery<Bookmark[]>({
    queryKey: BOOKMARKS_QUERY_KEY,
    queryFn: async () => {
      const { data } = await api.get('/members/bookmarks')
      setBookmarks(data)
      return data
    },
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  })
}

export function useAddBookmark() {
  const addBookmark = useBookmarkStore((s) => s.addBookmark)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (property: any) => {
      const { data } = await api.post('/members/bookmark', {
        property: {
          attomId: property?.identifier?.attomId,
          address: property?.address,
          vintage: property?.vintage,
        },
      })
      return data
    },
    onSuccess: (data) => {
      addBookmark(data)
      queryClient.setQueryData(BOOKMARKS_QUERY_KEY, (old: Bookmark[] = []) => [data, ...old])
    },
  })
}

export function useRemoveBookmark() {
  const removeBookmark = useBookmarkStore((s) => s.removeBookmark)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (bookmarkId: string) => {
      await api.delete(`/members/bookmark/${bookmarkId}`)
      return bookmarkId
    },
    onSuccess: (bookmarkId) => {
      removeBookmark(bookmarkId)
      queryClient.setQueryData(BOOKMARKS_QUERY_KEY, (old: Bookmark[] = []) =>
        old.filter((b) => b._id !== bookmarkId)
      )
    },
  })
}
