<template>
  <el-card :body-style="{ padding: '0px' }" shadow="hover" class="playlist-card" @click="$emit('click')">
    <img :src="cover" class="playlist-cover">
    <div class="playlist-info">
      <div class="playlist-name">{{ name }}</div>
      <div class="playlist-count">{{ count }}首</div>
    </div>
  </el-card>
</template>

<script setup>
defineProps({
  cover: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
})

defineEmits(['click'])
</script>

<style scoped>
.playlist-card {
  cursor: pointer;
  transition: transform 0.3s;
  margin-bottom: 20px;
}

.playlist-card:hover {
  transform: translateY(-5px);
}

.playlist-cover {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

.playlist-info {
  padding: 12px;
}

.playlist-name {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.playlist-count {
  font-size: 12px;
  color: #999;
}
</style>