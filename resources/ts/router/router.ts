import { createRouter, createWebHistory } from "vue-router";
import home from "@/views/Home.vue";
import mypage from "@/views/Mypage.vue";

const routes = [
    {path: '/spa/home', name: 'home', component: home},
    {path: '/spa/mypage', name: 'mypage', component: mypage},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
