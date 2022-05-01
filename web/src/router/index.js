import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/browse',
    name: 'browse',
    component: () => import(/* webpackChunkName: "browse" */ '@/views/BrowseView.vue')
  },
  {
    path: '/read',
    name: 'read',
    component: () => import(/* webpackChunkName: "read" */ '@/views/ReadView.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import(/* webpackChunkName: "edit" */ '@/views/EditView.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import(/* webpackChunkName: "add" */ '@/views/AddView.vue')
  },
  {
    path: '/delete',
    name: 'delete',
    component: () => import(/* webpackChunkName: "delete" */ '@/views/DeleteView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
