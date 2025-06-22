
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const banners = ref([
  { id: 1, image: 'https://y.qq.com/music/common/upload/t_music_radio/2929760.jpg?max_age=2592000' },
  { id: 2, image: 'https://y.qq.com/music/common/upload/t_music_radio/2054525.jpg?max_age=2592000' },
  { id: 3, image: 'https://y.qq.com/music/common/upload/t_music_radio/1260297.jpg?max_age=2592000' }
])

const recommendPlaylists = ref([
  { id: 1, name: '每日推荐', cover: 'https://y.qq.com/music/common/upload/t_music_radio/2054458.jpg?max_age=2592000' },
  { id: 2, name: '热门歌曲', cover: 'https://y.qq.com/music/common/upload/t_music_radio/3171367.jpg?max_age=2592000' },
  { id: 3, name: '新歌首发', cover: 'https://y.qq.com/music/common/upload/t_music_radio/1829120.jpg?max_age=2592000' },
  { id: 4, name: '经典老歌', cover: 'https://y.qq.com/music/common/upload/t_music_radio/1260297.jpg?max_age=2592000' },
  { id: 5, name: '欧美流行', cover: 'https://y.qq.com/music/common/upload/t_music_radio/2054429.jpg?max_age=2592000' },
  { id: 6, name: '港台歌曲', cover: 'https://y.qq.com/music/common/upload/t_music_radio/2054460.jpg?max_age=2592000' }
])

const goToPlaylist = (id) => {
  router.push(`/playlist/${id}`)
}
</script>
<template>
  <div class="home-view">
    <el-carousel :interval="4000" height="300px">
      <el-carousel-item v-for="item in banners" :key="item.id">
        <img :src="item.image" class="banner-image">
      </el-carousel-item>
    </el-carousel>

    <div class="section">
      <h3>推荐歌单</h3>
      <el-row :gutter="20">
        <el-col v-for="playlist in recommendPlaylists" :key="playlist.id" :span="4" @click="goToPlaylist(playlist.id)">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <img :src="playlist.cover" class="playlist-cover">
            <div style="padding: 10px;">
              <span>{{ playlist.name }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.section {
  margin-top: 30px;
}

.playlist-cover {
  width: 100%;
  height: 120px;
  object-fit: cover;
  cursor: pointer;
}

.el-card {
  margin-bottom: 20px;
}
</style>