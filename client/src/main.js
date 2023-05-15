import { createApp } from 'vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router';
import App from './App.vue';
import Mock from '../mock/index';

const app = createApp(App);
Object.entries(ElementPlusIconsVue).forEach((p) => {
  const [key, component] = [...p];
  app.component(key, component);
});

Mock.setup({
  timeout: 1000,
});

app.use(router);
app.use(ElementPlus);

app.mount('#app');
