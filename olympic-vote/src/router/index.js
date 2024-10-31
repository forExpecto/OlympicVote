
import { createRouter, createWebHistory } from 'vue-router'
import BasicMassage from '@/view/User/BasicMassage.vue';
import LoginView from '@/view/User/LoginView.vue';
import RegisterView from '@/view/User/RegisterView.vue';
import VoteView from '@/view/vote/VoteView.vue';
import DashBoard from '@/view/Administer/DashBoard.vue';


const routes = [
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
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;