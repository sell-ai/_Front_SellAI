import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore, useSettingStore } from '@/store';

//Call routes
import dashboardRoutes from './dashboard.routes';
import articlesRoutes from './articles.routes';
import usersRoutes from './users.routes';
//End call routes

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    { ...dashboardRoutes },
    { ...articlesRoutes },
    { ...usersRoutes },
    // catch all redirect to home page
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
});

router.beforeEach(async (to) => {
    document.title = `${ process.env.VUE_APP_TITLE } - ${ to.name }`;
    const store = useAuthStore();
    const storeSetting = useSettingStore();
    if (to.meta.auth && to.name !== 'Login') {
        let token = store.token;
        if (!token || token === 'undefined' || token.length == 0) {
          store.returnUrl = to.fullPath;
          return { name: 'Login' }
        }
    }
    if (to.meta.chat) {
      storeSetting.chat = true;
    }
    else {
      storeSetting.chat = false;
    }
})

export default router;
