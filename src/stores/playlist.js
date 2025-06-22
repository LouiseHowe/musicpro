import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlaylistStore = defineStore('playlist', () => {
  // 收藏的歌单
  const collectedPlaylists = ref([])

  // 创建的歌单
  const createdPlaylists = ref([])

  // 添加收藏
  const addCollection = (playlist) => {
    if (!collectedPlaylists.value.some(item => item.id === playlist.id)) {
      collectedPlaylists.value.push(playlist)
    }
  }

  // 移除收藏
  const removeCollection = (playlistId) => {
    collectedPlaylists.value = collectedPlaylists.value.filter(item => item.id !== playlistId)
  }

  // 创建歌单
  const createPlaylist = (playlist) => {
    createdPlaylists.value.push(playlist)
  }

  return {
    collectedPlaylists,
    createdPlaylists,
    addCollection,
    removeCollection,
    createPlaylist
  }
},{persist:true})