

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, Delete } from '@element-plus/icons-vue'
import PlaylistCard from '@/components/PlaylistCard.vue'
import SongList from '@/components/SongList.vue'

const router = useRouter()

// 收藏的歌单
const collectedPlaylists = ref([
  { id: 101, name: '我的最爱', cover: 'https://y.qq.com/music/common/upload/t_music_radio/3188826.jpg?max_age=2592000', count: 42 },
  { id: 102, name: '工作专注', cover: 'https://y.qq.com/music/common/upload/t_music_radio/2054525.jpg?max_age=2592000', count: 35 },
  { id: 103, name: '运动歌单', cover: 'https://y.qq.com/music/common/upload/t_music_radio/2054413.jpg?max_age=2592000', count: 28 }
])

// 创建的歌单
const createdPlaylists = ref([
  { id: 201, name: '自驾旅行', cover: 'https://y.qq.com/music/common/upload/t_music_radio/1829133.jpg?max_age=2592000', count: 15 },
  { id: 202, name: '夜晚放松', cover: 'https://y.qq.com/music/common/upload/t_music_radio/3171367.jpg?max_age=2592000', count: 22 }
])

// 最近播放的歌曲
const recentSongs = ref([
  { id: 1, name: '晴天', artist: '周杰伦', album: '叶惠美', duration: 269 },
  { id: 2, name: '七里香', artist: '周杰伦', album: '七里香', duration: 295 },
  { id: 3, name: '稻香', artist: '周杰伦', album: '魔杰座', duration: 220 },
  { id: 4, name: '夜曲', artist: '周杰伦', album: '十一月的萧邦', duration: 210 }
])

const goToPlaylist = (id) => {
  router.push(`/playlist/${id}`)
}

const playSong = (song) => {
  console.log('播放歌曲:', song)
  // 这里应该触发全局播放器播放
  // 并添加到最近播放记录
}

const showAllCollections = () => {
  // 实际项目中这里应该跳转到完整的收藏列表页
  console.log('查看全部收藏')
}

const clearHistory = () => {
  ElMessageBox.confirm('确定要清空最近播放记录吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    recentSongs.value = []
    ElMessage.success('已清空播放记录')
  }).catch(() => { })
}
</script>
<template>
  <div class="library-view">
    <h2 class="page-title">我的音乐</h2>

    <!-- 收藏歌单 -->
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">收藏歌单</h3>
        <el-button type="default" @click="showAllCollections">
          查看全部 <el-icon>
            <ArrowRight />
          </el-icon>
        </el-button>
      </div>
      <el-row :gutter="20">
        <el-col v-for="playlist in collectedPlaylists" :key="playlist.id" :xs="12" :sm="8" :md="6" :lg="4">
          <playlist-card :cover="playlist.cover" :name="playlist.name" :count="playlist.count"
            @click="goToPlaylist(playlist.id)" />
        </el-col>
      </el-row>
    </div>

    <!-- 最近播放 -->
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">最近播放</h3>
        <el-button type="default" @click="clearHistory">
          <el-icon>
            <Delete />
          </el-icon>
          清空记录
        </el-button>
      </div>
      <song-list :songs="recentSongs" @play="playSong" />
    </div>

    <!-- 创建的歌单 -->
    <div class="section" v-if="createdPlaylists.length > 0">
      <h3 class="section-title">创建的歌单</h3>
      <el-row :gutter="20">
        <el-col v-for="playlist in createdPlaylists" :key="playlist.id" :xs="12" :sm="8" :md="6" :lg="4">
          <playlist-card :cover="playlist.cover" :name="playlist.name" :count="playlist.count"
            @click="goToPlaylist(playlist.id)" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style scoped>
.library-view {
  padding: 20px;
}

.page-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-title {
  margin: 0;
  font-size: 18px;
  color: #333;
  padding-bottom: 8px;
}

.el-button--text {
  padding: 0;
  height: auto;
}
</style>