<template>
    <div class="vote-list-page">
        <h2>查询竞猜数据</h2>
        <el-form label-width="100px">
            <el-form-item label="页码">
                <el-input v-model.number="pageNo" placeholder="请输入页码"></el-input>
            </el-form-item>
            <el-form-item label="每页条数">
                <el-input v-model.number="pageSize" placeholder="请输入每页条数"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchVoteList">查询竞猜数据</el-button>
            </el-form-item>
        </el-form>

        <div v-if="voteList.length">
            <h3>竞猜数据列表</h3>
            <ul>
                <li v-for="vote in voteList" :key="vote.voteId">
                    <p>比赛名称: {{ vote.matchName }}</p>
                    <p>比赛开始时间: {{ vote.matchStartTime }}</p>
                    <p>比赛结束时间: {{ vote.matchEndTime }}</p>
                    <p>队伍1: {{ vote.teamOneName }} - 队员: {{ vote.teamOneMembers.join(', ') }}</p>
                    <p>队伍2: {{ vote.teamTwoName }} - 队员: {{ vote.teamTwoMembers.join(', ') }}</p>
                    <p>胜出队伍: {{ vote.winTeamName || '待定' }}</p>
                    <hr />
                </li>
            </ul>
        </div>
        <p v-else>暂无竞猜数据</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            pageNo: 1,            // 当前页码
            pageSize: 10,         // 每页显示的条数
            voteList: [],         // 存储竞猜数据列表
        };
    },
    methods: {
        async fetchVoteList() {
            try {
                const token = localStorage.getItem("token"); // 获取存储在 localStorage 中的 token
                if (!token) {
                    alert('请先登录！');
                    return;
                }

                // 发送请求
                const response = await axios.get('/api/admin/vote/list', {
                    headers: {
                        'Authorization': token,
                    },
                    params: {
                        pageNo: this.pageNo,
                        pageSize: this.pageSize,
                    }
                });

                // 解析返回结构
                if (response.data.code === 0) {
                    this.voteList = response.data.data.voteList; // 成功获取数据，将 data.voteList 数组直接赋值给 voteList
                    console.log('竞猜数据列表:', this.voteList);
                } else {
                    console.error('查询失败:', response.data.message);
                    alert('查询失败：' + response.data.message);
                    this.voteList = [];
                }
            } catch (error) {
                console.error('请求失败:', error);
                alert('请求失败，请检查网络连接');
                this.voteList = [];
            }
        },
    }
};
</script>

<style scoped>
.vote-list-page {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.vote-list-page h2 {
    text-align: center;
    margin-bottom: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 20px;
    font-weight: bold;
}
</style>