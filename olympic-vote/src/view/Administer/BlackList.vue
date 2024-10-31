<template>
    <div>
        <h2>黑名单用户</h2>
        <ul>
            <li v-for="user in blacklist" :key="user.id">
                {{ user.username }}
                <button @click="unbanUser(user.id)">解除封禁</button>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:4523/m1/5377239-5049828-default/admin'; // 设置后端接口的基础URL
export default {
    data() {
        return {
            blacklist: [
                { id: 1, username: '张三' },
                { id: 2, username: '李四' },
                { id: 3, username: '王五' },

            ],
        };
    },
    // created() {
    //     this.fetchBlacklist();
    // },
    methods: {
        fetchBlacklist() {
            // 请求获取黑名单用户数据
            axios.get('/ban/list')
                .then(response => {
                    this.blacklist = response.data;
                })
                .catch(error => {
                    console.error('获取黑名单用户数据失败:', error);
                });
        },
        unbanUser(id) {
            console.log('解除封禁用户 ID:', id);
            // 解除封禁逻辑
        },
    },
};
</script>
