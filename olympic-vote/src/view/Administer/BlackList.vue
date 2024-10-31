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
            <el-table :data="banList" style="width: 100%">
                <el-table-column prop="userName" label="用户名" width="180"></el-table-column>
                <el-table-column prop="userId" label="用户ID" width="180"></el-table-column>
                <el-table-column prop="userIp" label="IP地址" width="180"></el-table-column>
            </el-table>
        </div>
        <p v-else>暂无被封禁的用户</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            pageNo: 1,
            pageSize: 5,
            banList: [],
        };
    },
    methods: {
        async fetchBanList() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert('请先登录！');
                    return;
                }

                const formData = new FormData();
                formData.append('pageNo', this.pageNo);
                formData.append('pageSize', this.pageSize);

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
                    this.banList = response.data.data.userList;
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

.el-table {
    margin-top: 20px;
}
</style>
