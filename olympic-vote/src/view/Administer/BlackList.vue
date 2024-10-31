<template>
    <div>
        <h2>添加黑名单用户</h2>

        <!-- 封禁用户输入框 -->
        <div>
            <label for="ban-user-id">输入用户 ID 封禁：</label>
            <input v-model="userIdToBan" type="number" id="ban-user-id" placeholder="用户 ID" />
            <button @click="addbanUser">封禁用户</button>
        </div>

        <!-- 黑名单用户列表 -->
        <h2>黑名单用户列表</h2>

        <ul>
            <li v-for="user in blacklist" :key="user.id">
                {{ user.username }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            blacklist: [
                { id: 1, username: '张三' },
                { id: 2, username: '李四' },
                { id: 3, username: '王五' },
            ],
            userIdToBan: '', // 输入的用户 ID
        };
    },
    methods: {
        // 获取黑名单用户数据
        fetchBlacklist() {
            axios.get('/ban/list')
                .then(response => {
                    this.blacklist = response.data;
                })
                .catch(error => {
                    console.error('获取黑名单用户数据失败:', error);
                });
        },

        // 封禁用户
        addbanUser() {
            if (!this.userIdToBan) {
                alert('请输入用户 ID');
                return;
            }

            axios.post('/ban', { id: this.userIdToBan })
                .then(response => {
                    console.log('用户已成功封禁:', response.data);
                    alert(`用户 ID ${this.userIdToBan} 已被封禁`);
                    this.fetchBlacklist(); // 更新黑名单
                    this.userIdToBan = ''; // 清空输入框
                })
                .catch(error => {
                    console.error('封禁用户失败:', error);
                    alert('封禁用户失败，请检查输入');
                });
        },
    },
    // mounted() {
    //     this.fetchBlacklist();
    // },
};
</script>
