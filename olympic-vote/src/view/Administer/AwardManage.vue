<template>
    <div class="exchange-list-page">
        <h2>查询兑换列表</h2>
        <el-form label-width="100px">
            <el-form-item label="页码">
                <el-input v-model.number="page" placeholder="请输入页码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchExchangeList">查询兑换</el-button>
            </el-form-item>
        </el-form>

        <div v-if="exchangeList.length">
            <h3>兑换列表</h3>
            <ul>
                <li v-for="item in exchangeList" :key="item.rewardId">
                    奖品名称: {{ item.name }} | 所需积分: {{ item.score }} | 库存数量: {{ item.number }}
                </li>
            </ul>
        </div>
        <p v-else>当前无可兑换奖品</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            page: 1,            // 当前页码
            exchangeList: [],   // 存储兑换列表
        };
    },
    methods: {
        async fetchExchangeList() {
            try {
                const token = localStorage.getItem("token"); // 获取存储在 localStorage 中的 token
                if (!token) {
                    alert('请先登录！');
                    return;
                }

                // 发送请求
                const response = await axios.get('/api/vote/exchange', {
                    headers: {
                        'Authorization': token,
                    },
                    params: {
                        page: this.page,
                    }
                });

                // 解析返回结构
                if (response.data.code === 0) {
                    this.exchangeList = response.data.data; // 成功获取数据，将 data 数组直接赋值给 exchangeList
                    console.log('兑换列表:', this.exchangeList);
                } else {
                    console.error('查询失败:', response.data.message);
                    alert('查询失败：' + response.data.message);
                    this.exchangeList = [];
                }
            } catch (error) {
                console.error('请求失败:', error);
                alert('请求失败，请检查网络连接');
                this.exchangeList = [];
            }
        },
    }
};
</script>

<style scoped>
.exchange-list-page {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.exchange-list-page h2 {
    text-align: center;
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