
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PlaylistCard from '@/components/PlaylistCard.vue'
import SongList from '@/components/SongList.vue'

const router = useRouter()

const hotPlaylists = ref([
  { id: 1, name: '热歌榜', cover: 'https://y.qq.com/music/common/upload/t_music_radio/3171367.jpg?max_age=2592000', count: 100 },
  { id: 2, name: '新歌榜', cover: 'https://y.qq.com/music/common/upload/t_music_radio/1829120.jpg?max_age=2592000', count: 50 },
  { id: 3, name: '原创榜', cover: 'https://y.qq.com/music/common/upload/t_music_radio/1260297.jpg?max_age=2592000', count: 80 },
  { id: 4, name: '飙升榜', cover: 'https://y.qq.com/music/common/upload/t_music_radio/1829086.jpg?max_age=2592000', count: 60 },
  { id: 5, name: '电音榜', cover: 'https://y.qq.com/music/common/upload/t_music_radio/1829079.jpg?max_age=2592000', count: 40 }
])

const newSongs = ref([
  { id: 1, name: '夏天的风', artist: '周杰伦', album: '七里香', duration: 235 },
  { id: 2, name: '夜曲', artist: '周杰伦', album: '十一月的萧邦', duration: 210 },
  { id: 3, name: '青花瓷', artist: '周杰伦', album: '我很忙', duration: 245 },
  { id: 4, name: '稻香', artist: '周杰伦', album: '魔杰座', duration: 220 }
])

const goToPlaylist = (id) => {
  router.push(`/playlist/${id}`)
}

const playSong = (song) => {
  console.log('播放歌曲:', song)
  // 这里应该触发全局播放器播放
}
</script>
<template>
  <div class="discover-view">
    <div class="content-container">
    <h2 class="page-title">发现音乐</h2>

    <div class="section">
      <h3 class="section-title">热门推荐</h3>
      <el-row :gutter="20">
        <el-col v-for="playlist in hotPlaylists" :key="playlist.id" :xs="12" :sm="8" :md="6" :lg="4">
          <playlist-card :cover="playlist.cover" :name="playlist.name" :count="playlist.count"
            @click="goToPlaylist(playlist.id)" />
        </el-col>
      </el-row>
    </div>

    <div class="section">
      <h3 class="section-title">新歌首发</h3>
      <div class="song-list-container">
          <song-list :songs="newSongs" @play="playSong" />
        </div>
    </div>
  </div>
  </div>
</template>


<style scoped>
.discover-view {
  padding: 20px;
  background-color: #f5f5f7;
  width: 100%;
}

/* 添加统一的容器样式 */
.content-container {
  max-width: 1200px; /* 或其他适合的值 */
  margin: 0 auto; /* 居中 */
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.song-list-container {
  overflow-x: auto; /* 如果表格太宽，可以横向滚动 */
}

.page-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.section {
  margin-bottom: 40px;
  width: 100%;
}

.section-title {
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}
</style>