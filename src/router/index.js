import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/HomePage.vue'
import NodeDataPage from '../components/NodeDataPage.vue'
import LinkDataPage from '../components/LinkDataPage.vue'
import ModelPage from '../components/ModelPage.vue'
import SettingPage from '../components/SettingPage.vue'
import AboutPage from '../components/AboutPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/nodedata',
    name: 'NodeData',
    component: NodeDataPage,
  },
  {
    path: '/linkdata',
    name: 'LinkData',
    component: LinkDataPage,
  },
  {
    path: '/model',
    name: 'Model',
    component: ModelPage,
  },
  {
    path: '/setting',
    name: 'Setting',
    component: SettingPage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
]

const router = new VueRouter({
  routes
})

export default router
