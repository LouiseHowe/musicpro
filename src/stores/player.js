import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { download, songBySongId } from '../api/index'



export const usePlayerStore = defineStore('player', () => {
  // 存储 Audio 实例
  const audio = ref(null)
  // 当前播放状态
  const isPlaying = ref(false)
  // 当前歌曲
  const currentSong = ref(null)
  // 播放列表
  // http://localhost:8888/song/Beyond-光辉岁月.mp3
  const playlist = ref([
    { id: 1, name: '晴天', artist: '周杰伦', album: '叶惠美', duration: 269 },
    { id: 2, name: '七里香', artist: '周杰伦', album: '七里香', duration: 295 },
    { id: 3, name: '稻香', artist: '周杰伦', album: '魔杰座', duration: 220 },
    { id: 4, name: '夜曲', artist: '周杰伦', album: '十一月的萧邦', duration: 210 }
  ])
  // 当前播放歌曲索引
  const currentIndex = ref(0)
  // 播放进度
  const progress = ref(0)
  // 音量
  const volume = ref(80)

  // 播放历史
  const playHistory = ref([])

  // 获取当前歌曲
  const nowPlaying = computed(() => currentSong.value)
  // 测试用
  const test = () => {
    songBySongId(78).then(res => {
      currentSong.value = res
    })
  }
  // 初始化 Audio
  const initAudio = () => {
    audio.value = new Audio()
    audio.value.volume = volume.value / 100
    audio.value.playbackRate = 1.0 //播放速度
    audio.value.addEventListener('ended', next) // 播放结束时自动下一首
    audio.value.addEventListener('timeupdate', () => {
      // console.log(audio.value.currentTime ,audio.value.duration);      
      progress.value = (audio.value.currentTime / audio.value.duration) * 100
    })
  }




  // 播放/暂停
  const togglePlay = () => {
   
    if (isPlaying.value) {
      audio.value.pause()
    } else {
      initAudio()
      test()
      audio.value.src = 'http://localhost:8888/song/Beyond-光辉岁月.mp3'
      audio.value.play()
    }
    isPlaying.value = !isPlaying.value
  }

  // 播放特定歌曲
  const play = async (song) => {
    if (!audio.value) initAudio()

    try {
      currentSong.value = song
      audio.value.src = 'http://localhost:8888/song/Beyond-光辉岁月.mp3'//song.url
      await audio.value.play()
      isPlaying.value = true
    } catch (err) {
      console.error("播放失败:", err)
      ElMessage.error("播放失败: " + err.message)
    }
    addToHistory(song)
  }

  // 添加到播放历史
  const addToHistory = (song) => {
    // 避免重复添加
    if (!playHistory.value.some(item => item.id === song.id)) {
      playHistory.value.unshift(song)
      // 限制历史记录数量
      if (playHistory.value.length > 50) {
        playHistory.value.pop()
      }
    }
  }

  // 清空播放历史
  const clearHistory = () => {
    playHistory.value = []
  }

  // 下一首
  const next = () => {
    if (playlist.value.length > 0) {
      currentIndex.value = (currentIndex.value + 1) % playlist.value.length
      currentSong.value = playlist.value[currentIndex.value]
      addToHistory(currentSong.value)
    }
  }

  // 上一首
  const prev = () => {
    if (playlist.value.length > 0) {
      currentIndex.value = (currentIndex.value - 1 + playlist.value.length) % playlist.value.length
      currentSong.value = playlist.value[currentIndex.value]
      addToHistory(currentSong.value)
    }
  }




  // 设置播放列表
  const setPlaylist = (newPlaylist) => {
    playlist.value = newPlaylist
    currentIndex.value = 0
    if (newPlaylist.length > 0) {
      currentSong.value = newPlaylist[0]
    }
  }
  // 清除播放列表
  const clearPlaylist = () => {
    playlist.value = []
    currentIndex.value = 0
    currentSong.value = null
  }


  return {
    audio,
    playlist,
    currentIndex,
    isPlaying,
    nowPlaying,
    progress,
    volume,
    playHistory,
    togglePlay,
    play,
    next,
    prev,
    addToHistory,
    clearHistory,
    setPlaylist,
    clearPlaylist,
    test
  }
}, {
  // persist: true 
  })