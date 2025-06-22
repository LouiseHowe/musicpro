<script setup>
import { computed } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

const props = defineProps({
  visible: Boolean
})

const emit = defineEmits(['update:visible'])

const playlist = computed(() => playerStore.playlist)


const currentSongId = computed(() => playerStore.nowPlaying?.id)

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

const playThis = (index) => {
  playerStore.currentIndex = index
  playerStore.play(playlist.value[index])
}

const close = () => {
  emit('update:visible', false)
}
const clearPlaylist=() => {
  playerStore.clearPlaylist()
  close()
}

</script>
<template>
  <transition name="slide-up">
    <div class="playlist-panel" v-show="visible">
      <div class="panel-header">
        <h3>播放列表 ({{ playlist.length }})</h3>
        <el-button type="default" @click="close">
          <el-icon><Close /></el-icon>
        </el-button>
      </div>
      
      <el-scrollbar class="playlist-scroll">
        <ul class="song-list">
          <li 
            v-for="(song, index) in playlist" 
            :key="song.id"
            :class="{ active: currentSongId === song.id }"
            @click="playThis(index)"
          >
            <span class="song-index">{{ index + 1 }}</span>
            <div class="song-info">
              <div class="song-name">{{ song.name }}</div>
              <div class="song-artist">{{ song.artist }}</div>
            </div>
            <div class="song-duration">{{ formatTime(song.duration) }}</div>
          </li>
        </ul>
        <div class="panel-actions">
            <el-button size="small" @click="clearPlaylist">清空列表</el-button>
        </div>
      </el-scrollbar>
     
    </div>
  </transition>
</template>

<style scoped>
.playlist-panel {
  position: fixed;
  right: 20px;
  bottom: 90px;
  width: 300px;
  max-height: 60vh;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}

.playlist-scroll {
  height: calc(100% - 50px);
}

.song-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.song-list li {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.song-list li:hover {
  background-color: #f5f5f7;
}

.song-list li.active {
  background-color: #f0f7ff;
}

.song-index {
  width: 24px;
  color: #999;
  font-size: 14px;
}

.song-info {
  flex: 1;
  margin: 0 12px;
  overflow: hidden;
}

.song-name {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-artist {
  font-size: 12px;
  color: #999;
}

.song-duration {
  font-size: 12px;
  color: #999;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>