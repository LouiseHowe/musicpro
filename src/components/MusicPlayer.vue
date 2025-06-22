<script setup>
import { computed, ref, watch, onUnmounted } from 'vue'
import {
  VideoPlay,
  VideoPause,
  ArrowLeft,
  ArrowRight,
  Headset, List
} from '@element-plus/icons-vue'

import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

const isPlaying = computed(() => playerStore.isPlaying)
const nowPlaying = computed(() => playerStore.nowPlaying)

// 播放进度
const progress = computed({
  get: () => playerStore.progress,
  set: (value) => { playerStore.progress = value }
})
// 声音
const volume = computed({
  get: () => playerStore.volume,
  set: (value) => { playerStore.volume = value }
})

// 音乐当前时间
const currentTime = ref(0)
//音乐总时长
const duration = ref(0)

// 官方store数据监听（监听整个Store）
// playerStore.$subscribe((mutation, state) => { 
//   // console.log('store change',mutation, state);  
//   console.log(state.audio.duration);

// })
// watch监听（监听具体数据），获取音乐时长
let cleanupFn = null
watch(() => playerStore.audio, (newAudio) => {
  if (!newAudio) return
  // 添加元数据加载事件
  newAudio.onloadedmetadata = () => {
    duration.value = newAudio.duration
    console.log('音频时长:', duration.value)
  }

  // 如果已经可以获取 duration
  if (!isNaN(newAudio.duration)) {
    duration.value = newAudio.duration
  }
  // 直接获取 audio 元素的当前时间
  const updateTime = () => {
    currentTime.value = newAudio.currentTime 
  }

  // 开始监听
  newAudio.addEventListener('timeupdate', updateTime)
  // 移除监听
  cleanupFn = () => {
    newAudio.removeEventListener('timeupdate', updateTime)
  }

}, { deep: true, immediate: true })
// 组件卸载时移除监听
onUnmounted(() => {
  cleanupFn && cleanupFn()
})
// 切换播放、暂停
const togglePlay = () => {
  playerStore.togglePlay()
}
// 上一首
const prev = () => {
  playerStore.prev()
}
// 下一首
const next = () => {
  playerStore.next()
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

const showPlaylist = ref(false)

const togglePlaylist = () => {
  showPlaylist.value = !showPlaylist.value
}
</script>
<template>
  <div class="music-player">
    <!-- 播放信息 -->
    <div class="player-info" v-if="nowPlaying">
      <img :src="'http://localhost:8888/'+nowPlaying.pic" class="song-cover">
      <div class="song-info">
        <div class="song-name">{{ nowPlaying.name }}</div>
        <div class="song-artist">{{ nowPlaying.artist }}</div>
      </div>
    </div>
    <div class="player-info" v-else>
      <div class="song-name">未播放</div>
    </div>

    <!-- 播放控制 -->
    <div class="player-controls">
      <el-button circle @click="prev">
        <el-icon>
          <ArrowLeft />
        </el-icon>
      </el-button>

      <el-button circle @click="togglePlay">
        <el-icon :size="20">
          <VideoPlay v-if="!isPlaying" />
          <VideoPause v-else />
        </el-icon>
      </el-button>

      <el-button circle @click="next">
        <el-icon>
          <ArrowRight />
        </el-icon>
      </el-button>

      <el-slider v-model="progress" :format-tooltip="formatTime" class="progress-slider" />

      <div class="time-display">
        {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
      </div>
    </div>

    <!-- 音量控制 -->
    <div class="player-volume">
      <el-slider v-model="volume" :max="100" :show-tooltip="false" vertical height="60px" />
      <el-icon>
        <Headset />
      </el-icon>
    </div>
    <!-- 添加播放列表按钮 -->
    <div class="player-actions">
      <el-button circle @click="togglePlaylist">
        <el-icon>
          <List />
        </el-icon>
      </el-button>
      <!-- ...其他按钮... -->
    </div>

    <!-- 添加播放列表面板 -->
    <playlist-panel v-model:visible="showPlaylist" />
  </div>
</template>

<style scoped>
.music-player {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
}

.player-info {
  display: flex;
  align-items: center;
  width: 200px;
}

.song-cover {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  margin-right: 10px;
}

.song-name {
  font-weight: bold;
}

.song-artist {
  font-size: 12px;
  color: #999;
}

.player-controls {
  flex: 1;
  display: flex;
  align-items: center;
  max-width: 600px;
  padding: 0 20px;
}

.progress-slider {
  flex: 1;
  margin: 0 15px;
}

.time-display {
  font-size: 12px;
  color: #999;
  width: 80px;
}

.player-actions {
  display: flex;
  gap: 10px;
}

.el-button {
  border: none;
  background: transparent;
}
</style>