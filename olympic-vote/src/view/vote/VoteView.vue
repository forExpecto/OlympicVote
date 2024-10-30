<template>
  <div class="vote-page">
    <h1 class="title">竞猜投票</h1>
    <MatchTable :matches="matchList" @viewDetails="viewMatchDetails">
      <template #header>
        <div>选择日期: <input type="date" v-model="selectedDate" @change="fetchMatchesByDate" min="2024-07-24" max="2024-08-11"></div>
      </template>
      <template #footer>
        <div>分页器: <button @click="prevPage">上一页</button><button @click="nextPage">下一页</button></div>
      </template>
    </MatchTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MatchTable from '../../components/MatchTable.vue';
import axios from 'axios';

const matchList = ref([]);
const selectedDate = ref('');
const currentPage = ref(1);

// 默认的数据，用于网络请求失败的情况
const defaultMatches = Array(10).fill({
  start_time: '2024-12-01 18:00',
  event: '足球',
  match_name: '男足决赛',
  player_one: '队伍A',
  player_two: '队伍B',
});

const fetchMatchesByDate = async () => {
  try {
    const response = await axios.get('/api/matches', {
      params: { date: selectedDate.value, page: currentPage.value },
    });
    matchList.value = response.data.matches;
  } catch (error) {
    console.error('获取比赛列表失败:', error);
    // 使用默认数据
    matchList.value = defaultMatches;
  }
};

const viewMatchDetails = (matchId) => {
  alert(`预测比赛：${matchId}`);
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchMatchesByDate();
  }
};

const nextPage = () => {
  currentPage.value++;
  fetchMatchesByDate();
};

onMounted(() => {
  fetchMatchesByDate();
});
</script>

<style scoped>
.vote-page {
  padding: 20px;
}
</style>