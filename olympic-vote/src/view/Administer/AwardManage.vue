<template>
    <div>
        <h2>奖品管理</h2>

        <!-- 添加/修改奖品的表单 -->
        <form @submit.prevent="submitReward">
            <label>奖品编号：</label>
            <input v-model="reward.reward_id" :disabled="isEditing" required />

            <label>奖品数量：</label>
            <input v-model.number="reward.number" type="number" required />

            <label>要求积分：</label>
            <input v-model.number="reward.score" type="number" required />

            <label>奖品名称：</label>
            <input v-model="reward.name" required />

            <button type="submit">{{ isEditing ? '更新奖品' : '添加奖品' }}</button>
        </form>

        <!-- 奖品列表 -->
        <h3>奖品列表</h3>
        <ul>
            <li v-for="reward in rewards" :key="reward.reward_id">
                {{ reward.name }} (编号: {{ reward.reward_id }}, 数量: {{ reward.number }}, 积分: {{ reward.score }})
                <button @click="editReward(reward)">编辑</button>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            rewards: [],
            reward: {
                reward_id: '',
                number: '',
                score: '',
                name: '',
            },
            isEditing: false, // 用于标记当前是否处于编辑状态
        };
    },
    methods: {
        // 获取奖品数据
        async fetchRewards() {
            try {
                const response = await axios.get('/api/rewards');
                this.rewards = response.data;
            } catch (error) {
                console.error("获取奖品列表失败:", error);
            }
        },

        // 提交表单：添加或更新奖品
        async submitReward() {
            try {
                if (this.isEditing) {
                    // 更新奖品信息
                    await axios.put(`/api/rewards/${this.reward.reward_id}`, this.reward);
                    console.log("奖品更新成功");
                } else {
                    // 添加新奖品
                    await axios.post('/api/rewards', this.reward);
                    console.log("奖品添加成功");
                }

                // 重新获取奖品列表并重置表单
                this.fetchRewards();
                this.resetForm();
            } catch (error) {
                console.error("提交奖品失败:", error);
            }
        },

        // 编辑奖品
        editReward(reward) {
            this.reward = { ...reward };
            this.isEditing = true;
        },

        // 重置表单
        resetForm() {
            this.reward = {
                reward_id: '',
                number: '',
                score: '',
                name: '',
            };
            this.isEditing = false;
        },
    },
    mounted() {
        this.fetchRewards();
    },
};
</script>
