<template>
    <div>
        <h2>团队列表</h2>
        <ul>
            <li v-for="team in teams" :key="team.id">
                {{ team.id }}
                {{ team.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            teams: [
                { id: 1, name: '团队1' },
                { id: 2, name: '团队2' },
                { id: 3, name: '团队3' },
            ],
        };
    },
    created() {
        this.fetchTeams();
    },
    methods: {
        fetchTeams() {
            // 请求获取团队列表数据
            axios.get('/teams')
                .then(response => {
                    this.teams = response.data;
                })
                .catch(error => {
                    console.error('获取团队列表数据失败:', error);
                });
            // 请求获取团队列表
        },
    },
};
</script>
