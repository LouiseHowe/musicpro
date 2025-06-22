
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePlayerStore } from '@/stores/player'
import { VideoPlay, Star, Share } from '@element-plus/icons-vue'
import SongList from '@/components/SongList.vue'

const route = useRoute()

const playlist = computed(() => {
  const id = route.params.id
  // 实际项目中这里应该根据id获取歌单数据
  return {
    id,
    name: '热门歌曲精选',
    cover: 'https://y.qq.com/music/common/upload/t_music_radio/2054474.jpg?max_age=2592000',
    creator: {
      id: 1,
      name: '音乐小站',
      avatar: 'https://y.qq.com/music/common/upload/t_music_radio/2054505.jpg?max_age=2592000'
    },
    description: '精选热门歌曲，每日更新',
    songs: [
      { id: 1, name: '晴天', artist: '周杰伦', album: '叶惠美', duration: 269 },
      { id: 2, name: '七里香', artist: '周杰伦', album: '七里香', duration: 295 },
      { id: 3, name: '简单爱', artist: '周杰伦', album: '范特西', duration: 278 },
      { id: 4, name: '东风破', artist: '周杰伦', album: '叶惠美', duration: 312 }
    ]
  }
})
// 播放测试1
// const playSong = (song) => {
//   console.log('播放歌曲:', song)
//   // 这里应该触发全局播放器播放
// }

const playerStore = usePlayerStore()
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
// 播放测试2
const playAll = () => {
  if (playlist.value.songs.length > 0) {
    playerStore.play(playlist.value.songs[0])
    // 实际项目中应该设置整个播放列表
  }
}
</script>
<template>
  <div class="playlist-view">
    <div class="playlist-header">
      <div class="cover-container">
        <img :src="playlist.cover" class="playlist-cover">
      </div>

      <div class="playlist-info">
        <h2 class="playlist-title">{{ playlist.name }}</h2>
        <div class="playlist-creator">
          <el-avatar :size="30" :src="playlist.creator.avatar" />
          <span class="creator-name">{{ playlist.creator.name }}</span>
        </div>
        <div class="playlist-desc">{{ playlist.description }}</div>
        <div class="playlist-actions">
          <el-button type="primary" round>
            <el-icon>
              <VideoPlay />
            </el-icon>
            播放全部
          </el-button>
          <el-button round>
            <el-icon>
              <Star />
            </el-icon>
            收藏
          </el-button>
          <el-button round>
            <el-icon>
              <Share />
            </el-icon>
            分享
          </el-button>
        </div>
      </div>
    </div>

    <div class="playlist-content">
      <song-list :songs="playlist.songs" @play="playSong" />
    </div>
  </div>
</template>

<style scoped>
.playlist-view {
  padding: 20px;
}

.playlist-header {
  display: flex;
  margin-bottom: 30px;
}

.cover-container {
  width: 200px;
  height: 200px;
  margin-right: 30px;
  flex-shrink: 0;
}

.playlist-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.playlist-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.playlist-title {
  margin: 0 0 15px 0;
  font-size: 24px;
}

.playlist-creator {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.creator-name {
  margin-left: 10px;
  color: #666;
}

.playlist-desc {
  margin-bottom: 20px;
  color: #666;
  line-height: 1.6;
}

.playlist-actions {
  display: flex;
  gap: 10px;
}

.playlist-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
</style>