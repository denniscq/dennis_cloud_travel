import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SearchPage from '../views/phone/SearchPage.vue';
import SortAndFilterPage from '../views/phone/SortAndFilterPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/phoneSearch',
    name: 'search',
    component: SearchPage,
  },
  {
    path: '/phoneSort',
    name: 'sort',
    component: SortAndFilterPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
