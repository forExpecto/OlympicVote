
import { createRouter, createWebHistory } from 'vue-router'
import BasicMasage from '@/view/User/BasicMasage.vue';
import LoginView from '@/view/User/LoginView.vue';
import RegisterView from '@/view/User/RegisterView.vue';
import VoteView from '@/view/vote/VoteView.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/BasicMasage',
        name: 'BasicMasage',
        component: BasicMasage
    },
    {
        path: '/LoginView',
        name: 'LoginView',
        component: LoginView
    },
    {
        path: '/RegisterView',
        name: 'RegisterView',
        component: RegisterView
    },
    {
        path: '/VoteView',
        name: 'VoteView',
        component: VoteView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;