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

        <el-table v-if="voteList.length" :data="voteList" style="width: 100%">
            <el-table-column prop="matchName" label="比赛名称" />
            <el-table-column prop="matchStartTime" label="比赛开始时间" />
            <el-table-column prop="matchEndTime" label="比赛结束时间" />
            <el-table-column prop="teamOneName" label="队伍1名称" />
            <el-table-column prop="teamOneMembers" label="队伍1队员" />
            <el-table-column prop="teamTwoName" label="队伍2名称" />
            <el-table-column prop="teamTwoMembers" label="队伍2队员" />
            <el-table-column prop="winTeamName" label="胜出队伍" />
        </el-table>

        <p v-else>暂无竞猜数据</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            pageNo: 1,
            pageSize: 10,
            voteList: [],
        };
    },
    methods: {
        async fetchVoteList() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert('请先登录！');
                    return;
                }

                const response = await axios.get('/api/admin/vote/list', {
                    headers: {
                        'Authorization': token,
                    },
                    params: {
                        pageNo: this.pageNo,
                        pageSize: this.pageSize,
                    }
                });

                if (response.data.code === 0) {
                    this.voteList = response.data.data.voteList;
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
</style>
