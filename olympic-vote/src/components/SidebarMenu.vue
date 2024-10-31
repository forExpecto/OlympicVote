<template>
    <el-menu :default-active="activeIndex" @select="handleSelect" class="sidebar-menu" background-color="#333"
        text-color="#fff" active-text-color="#888">
        <el-menu-item index="1">
            <el-icon><i class="el-icon-s-tools"></i></el-icon>
            <span>拉黑查询</span>
        </el-menu-item>
        <el-menu-item index="2">
            <el-icon><i class="el-icon-document"></i></el-icon>
            <span>竞猜管理</span>
        </el-menu-item>
        <el-menu-item index="3">
            <el-icon><i class="el-icon-user-solid"></i></el-icon>
            <span>团队查询</span>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon><i class="el-icon-s-custom"></i></el-icon>
            <span>奖品管理</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    props: {
        activeIndex: {
            type: String,
            default: '1',
        },
    },
    methods: {
        handleSelect(index) {
            this.$emit('updateActiveIndex', index);
        },
    },
};
</script>

<style scoped>
.sidebar-menu {
    width: 200px;
    height: 100vh;
    background-color: #333;
    /* 侧边栏背景色为黑色 */
    color: #fff;
    /* 文字颜色为白色 */
}

.el-menu-item {
    color: #fff;
    /* 默认文字颜色为白色 */
}

.el-menu-item.is-active {
    color: #888 !important;
    /* 被选中的文字颜色为灰色 */
}
</style>
