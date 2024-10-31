<template>
    <div class="team-list-page">
        <h2>查询团队列表</h2>
        <el-button type="primary" @click="fetchTeamList">查询团队列表</el-button>

        <el-table v-if="teamList.length" :data="teamList" style="width: 100%">
            <el-table-column prop="teamName" label="团队名称" />
            <el-table-column prop="teamId" label="团队ID" />
        </el-table>

        <p v-else>暂无团队数据</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            teamList: [], // 存储团队列表
        };
    },
    methods: {
        async fetchTeamList() {
            try {
                const token = localStorage.getItem("token"); // 获取存储在 localStorage 中的 token
                if (!token) {
                    alert('请先登录！');
                    return;
                }

                // 发送请求
                const response = await axios.get('/api/admin/team/list', {
                    headers: {
                        'Authorization': token,
                    }
                });

                // 解析新的返回结构
                if (response.data.code === 0) {
                    this.teamList = response.data.data; // 成功获取数据，将 data 数组直接赋值给 teamList
                    console.log('团队列表:', this.teamList);
                } else {
                    console.error('查询失败:', response.data.message);
                    alert('查询失败：' + response.data.message);
                    this.teamList = [];
                }
            } catch (error) {
                console.error('请求失败:', error);
                alert('请求失败，请检查网络连接');
                this.teamList = [];
            }
        },
    }
};
</script>

<style scoped>
.team-list-page {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.team-list-page h2 {
    text-align: center;
    margin-bottom: 20px;
}
</style>
