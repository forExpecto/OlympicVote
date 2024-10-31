<template>
    <div>
        <h2>竞猜数据管理</h2>

        <!-- 添加竞猜数据表单 -->
        <form @submit.prevent="submitGuess">
            <label>比赛名称：</label>
            <input v-model="newGuess.matchName" required />

            <label>队伍1名称：</label>
            <input v-model="newGuess.teamOneName" required />

            <label>队伍1成员：</label>
            <input v-model="newGuess.teamOneMembers" placeholder="用逗号分隔成员" required />

            <label>队伍2名称：</label>
            <input v-model="newGuess.teamTwoName" required />

            <label>队伍2成员：</label>
            <input v-model="newGuess.teamTwoMembers" placeholder="用逗号分隔成员" required />

            <button type="submit">提交竞猜数据</button>
        </form>

        <!-- 搜索表单 -->
        <input v-model="query" placeholder="查询竞猜数据" @input="fetchGuesses" />

        <!-- 搜索结果列表 -->
        <ul>
            <li v-for="guess in filteredGuesses" :key="guess.voteId">
                {{ guess.matchName }} - {{ guess.result === 0 ? '未决' : '已决' }}
                <button @click="updateGuess(guess.voteId)">更新</button>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            guesses: [],
            query: '',
            newGuess: {
                matchName: '',
                teamOneName: '',
                teamOneMembers: '',
                teamTwoName: '',
                teamTwoMembers: '',
            },
        };
    },
    computed: {
        filteredGuesses() {
            return this.guesses.filter(guess =>
                guess.matchName.includes(this.query) ||
                guess.teamOneName.includes(this.query) ||
                guess.teamTwoName.includes(this.query)
            );
        },
    },
    methods: {
        async fetchGuesses() {
            try {
                const response = await axios.get('/api/guesses', { params: { query: this.query } });
                this.guesses = response.data;
            } catch (error) {
                console.error("获取竞猜数据失败:", error);
            }
        },
        async submitGuess() {
            try {
                const formattedGuess = {
                    ...this.newGuess,
                    voteId: this.guesses.length,
                    result: 0,
                    teamOneMembers: this.newGuess.teamOneMembers.split(','),
                    teamTwoMembers: this.newGuess.teamTwoMembers.split(','),
                };
                const response = await axios.post('/api/guesses', formattedGuess);
                this.guesses.push(response.data);
                this.resetForm();
                console.log("成功提交竞猜数据:", response.data);
            } catch (error) {
                console.error("提交竞猜数据失败:", error);
            }
        },
        updateGuess(id) {
            console.log('更新竞猜数据 ID:', id);
            // 更新竞猜数据逻辑
        },
        resetForm() {
            this.newGuess = {
                matchName: '',
                teamOneName: '',
                teamOneMembers: '',
                teamTwoName: '',
                teamTwoMembers: '',
            };
        }
    },
    mounted() {
        this.fetchGuesses();
    },
};
</script>
