
import { createRouter, createWebHistory } from 'vue-router'
import BasicMassage from '@/view/User/BasicMassage.vue';
import LoginView from '@/view/User/LoginView.vue';
import RegisterView from '@/view/User/RegisterView.vue';
import VoteView from '@/view/vote/VoteView.vue';
import DashBoard from '@/view/Administer/DashBoard.vue';
import TestView from '@/view/test/TestView.vue';

const routes = [
    {
        path: '/',
        redirect: '/LoginView' // 重定向到登录界面  path: '/',
    },
    {
        path: '/BasicMessage',
        name: 'BasicMassage',
        component: BasicMassage
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
    },

    {
        path: '/DashBoard',
        name: 'DashBoard',
        component: DashBoard
    },
    {
        path: '/TestView',
        name: 'TestView',
        component: TestView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;