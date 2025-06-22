<template>
  <div class="app-container">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="220px">
        <Sidebar />
      </el-aside>

      <!-- 主内容区 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>

    <!-- 底部播放器 -->
    <div class="player-container">
      <MusicPlayer />
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-container {
  flex: 1;
  overflow: hidden;
}

.el-main {
  padding: 20px;
  background-color: #f5f5f7;
}

.player-container {
  height: 80px;
  background-color: #fff;
  border-top: 1px solid #e6e6e6;
}
</style>