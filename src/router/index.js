import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('@/views/HomeView.vue')
const DiscoverView = () => import('@/views/DiscoverView.vue')
const LibraryView = () => import('@/views/LibraryView.vue')
const PlaylistView = () => import('@/views/PlaylistView.vue')
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/discover',
    name: 'discover',
    component: DiscoverView
  },
  {
    path: '/library',
    name: 'library',
    component: LibraryView
  },
  {
    path: '/playlist/:id',
    name: 'playlist',
    component: PlaylistView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
