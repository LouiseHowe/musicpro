<script setup>
import {
  House,
  Search,
  Headset
} from '@element-plus/icons-vue'
</script>
<template>
  <div class="sidebar">
    <div class="logo">
      <img src="@/assets/images/logo.png" class="logo-img"></img>
      <h2>My Music</h2>
    </div>

    <el-menu active-text-color="#ff5c5c" background-color="#fff"
     :default-active="$route.path" router>
      <el-menu-item index="/">
        <el-icon>
          <House />
        </el-icon>
        <span>首页</span>
      </el-menu-item>

      <el-menu-item index="/discover">
        <el-icon>
          <Search />
        </el-icon>
        <span>发现音乐</span>
      </el-menu-item>

      <el-menu-item index="/library">
        <el-icon>
          <Headset />
        </el-icon>
        <span>我的音乐</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped>
.sidebar {
  height: 100%;
  background-color: #fff;
  border-right: 1px solid #e6e6e6;
}

.logo {
  display:flex;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #e6e6e6;
}
.logo-img{
  width: 44px;
  margin-right: 10px;
}
.el-menu {
  border-right: none;
}
</style>