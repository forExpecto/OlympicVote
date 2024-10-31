<template>
    <div>
        <h2>团队查询</h2>

        <!-- 查询团队输入框 -->
        <div>
            <label for="search-team">输入团队 ID 或名称：</label>
            <input v-model="searchQuery" id="search-team" placeholder="团队 ID 或名称" />
            <button @click="fetchTeamInfo">查询团队</button>
        </div>

        <!-- 团队信息显示 -->
        <div v-if="teamInfo">
            <h3>团队信息</h3>
            <p>团队编号：{{ teamInfo.team_id }}</p>
            <p>团队名称：{{ teamInfo.name }}</p>
            <h4>团队成员</h4>
            <ul>
                <li v-for="(member, index) in teamInfo.members" :key="index">
                    成员序号 {{ index + 1 }}: {{ member }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchQuery: '', // 用户输入的查询内容（团队 ID 或名称）
            teamInfo: null, // 查询到的团队信息
        };
    },
    methods: {
        // 根据团队 ID 或名称查询团队信息
        fetchTeamInfo() {
            if (!this.searchQuery) {
                alert('请输入团队 ID 或名称');
                return;
            }

            axios.get('/team/info', { params: { query: this.searchQuery } })
                .then(response => {
                    this.teamInfo = response.data;
                    console.log('查询到的团队信息:', response.data);
                })
                .catch(error => {
                    console.error('查询团队信息失败:', error);
                    alert('未找到该团队，请检查输入');
                    this.teamInfo = null;
                });
        },
    },
};
</script>
