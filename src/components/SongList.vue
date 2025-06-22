
<script setup>
import { Star, Download } from '@element-plus/icons-vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()

defineProps({
  songs: {
    type: Array,
    default: () => []
  }
})

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

// const playSong = (song) => {
//   playerStore.play(song)
// }

const playSong = (song, index) => {
  const playerStore = usePlayerStore()
  // 如果是歌单页面，设置整个歌单为播放列表
  if (props.songs) {
    playerStore.setPlaylist(props.songs)
    playerStore.play(props.songs[index || 0])
  } else {
    // 单个歌曲播放
    playerStore.play(song)
  }
}
</script>
<template>
  <el-table :data="songs" stripe style="width: 100%" @row-click="playSong">
    <el-table-column prop="index" label="#" width="60">
      <template #default="{ $index }">
        {{ $index + 1 }}
      </template>
    </el-table-column>

    <el-table-column prop="name" label="歌曲" min-width="200">
      <template #default="{ row }">
        <div class="song-name">{{ row.name }}</div>
        <div class="song-artist">{{ row.artist }}</div>
      </template>
    </el-table-column>

    <el-table-column prop="album" label="专辑" width="180" />

    <el-table-column prop="duration" label="时长" width="100">
      <template #default="{ row }">
        {{ formatTime(row.duration) }}
      </template>
    </el-table-column>

    <el-table-column label="操作" width="120">
      <template #default>
        <el-button size="small" type="default">
          <el-icon>
            <Star />
          </el-icon>
        </el-button>
        <el-button size="small" type="default">
          <el-icon>
            <Download />
          </el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<style scoped>
.song-name {
  font-weight: 500;
}

.song-artist {
  font-size: 12px;
  color: #999;
}

.el-table::before {
  height: 0;
}

:deep(.el-table__row) {
  cursor: pointer;
}

:deep(.el-table__row:hover) {
  background-color: #f5f7fa;
}
</style>