<template>
    <div class="ban-list-page">
        <h2>查询被封禁用户名单</h2>
        <el-form label-width="100px">
            <el-form-item label="页码">
                <el-input v-model.number="pageNo" placeholder="请输入页码"></el-input>
            </el-form-item>
            <el-form-item label="每页条数">
                <el-input v-model.number="pageSize" placeholder="请输入每页条数"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchBanList">查询</el-button>
            </el-form-item>
        </el-form>

        <div v-if="banList.length">
            <h3>被封禁用户名单</h3>
            <ul>
                <li v-for="user in banList" :key="user.userId">
                    用户名: {{ user.userName }}, 用户ID: {{ user.userId }}, IP地址: {{ user.userIp }}
                </li>
            </ul>
        </div>
        <p v-else>暂无被封禁的用户</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            pageNo: 1,           // 当前页码
            pageSize: 5,         // 每页显示的用户数
            banList: [],         // 存储被封禁的用户列表
        };
    },
    methods: {
        async fetchBanList() {
            try {
                const token = localStorage.getItem("token"); // 获取存储在 localStorage 中的 token
                if (!token) {
                    alert('请先登录！');
                    return;
                }

                // 创建 form-data 格式的数据
                const formData = new FormData();
                formData.append('pageNo', this.pageNo);
                formData.append('pageSize', this.pageSize);

                // 发送请求
                const response = await axios.get('/api/admin/ban/list', {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'multipart/form-data'
                    },
                    params: {
                        pageNo: this.pageNo,
                        pageSize: this.pageSize
                    }
                });

                if (response.data.code === 0) {
                    this.banList = response.data.data.userList; // 成功获取数据，保存到 banList 中
                    console.log('封禁用户列表:', this.banList);
                } else {
                    console.error('查询失败:', response.data.message);
                    alert('查询失败：' + response.data.message);
                    this.banList = [];
                }
            } catch (error) {
                console.error('请求失败:', error);
                alert('请求失败，请检查网络连接');
                this.banList = [];
            }
        },
    }
};
</script>

<style scoped>
.ban-list-page {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.ban-list-page h2 {
    text-align: center;
    margin-bottom: 20px;
}

.el-form-item {
    margin-bottom: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 5px;
    font-weight: bold;
}
</style>
