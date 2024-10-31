<template>
    <div class="main-container">
        <!-- 侧边栏始终在左侧显示 -->
        <div class="sidebar-container">
            <SidebarMenu :activeIndex="activeIndex" @updateActiveIndex="changeContent" />
        </div>
        <div class="content-container">
            <!-- 使用动态组件，根据 activeIndex 显示不同组件 -->
            <component :is="currentComponent" />
        </div>
    </div>
</template>

<script>
import SidebarMenu from '@/components/SidebarMenu.vue';
import BlackList from './BlackList.vue';
import GuessList from './GuessList.vue';
import TeamList from './TeamList.vue';
import AwardManage from './AwardManage.vue';

export default {
    components: {
        SidebarMenu,
        BlackList,
        GuessList,
        TeamList,
        AwardManage,
    },
    data() {
        return {
            activeIndex: '1',
            componentsMap: {
                '1': 'BlackList',       // 对应拉黑查询组件
                '2': 'GuessList',       // 对应竞猜查询组件
                '3': 'TeamList',        // 对应团队查询组件
                '4': 'AwardManage',     // 对应用户管理组件
            },
        };
    },
    computed: {
        // 根据 activeIndex 返回当前需要显示的组件
        currentComponent() {
            return this.componentsMap[this.activeIndex];
        },
    },
    methods: {
        // 更新 activeIndex，从而切换右侧显示的内容
        changeContent(index) {
            this.activeIndex = index;
        },
    },
};
</script>

<style scoped>
.main-container {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    justify-content: center;
    align-items: center;
}

.sidebar-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 200px;
    background-color: #333;
    padding: 20px;
}

.content-container {
    flex-grow: 1;
    padding: 20px;
}
</style>
