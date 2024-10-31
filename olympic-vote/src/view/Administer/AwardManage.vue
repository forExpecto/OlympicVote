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

        <el-table v-if="exchangeList.length" :data="exchangeList" style="width: 100%">
            <el-table-column prop="name" label="奖品名称" />
            <el-table-column prop="score" label="所需积分" />
            <el-table-column prop="number" label="库存数量" />
        </el-table>

        <p v-else>当前无可兑换奖品</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            page: 1,
            exchangeList: [],
        };
    },
    methods: {
        async fetchExchangeList() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert('请先登录！');
                    return;
                }

                const response = await axios.get('/api/vote/exchange', {
                    headers: {
                        'Authorization': token,
                    },
                    params: {
                        page: this.page,
                    }
                });

                if (response.data.code === 0) {
                    this.exchangeList = response.data.data;
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
</style>
