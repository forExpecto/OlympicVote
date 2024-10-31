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

    <VoteModal v-if="showVoteModal" :match="selectedMatch" @close="closeVoteModal" @confirmVote="submitVote"></VoteModal>
	
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MatchTable from '../../components/MatchTable.vue';
import VoteModal from '../../components/VoteModel.vue';
import axios from 'axios';



const matchList = ref([]);
const selectedDate = ref('');
const currentPage = ref(1);
const showVoteModal = ref(false);
const selectedMatch = ref(null);

// 默认的数据，用于网络请求失败的情况
const defaultMatches = Array(10).fill({
  vote_id:1,
  match_start_time: '2024-12-01 18:00',
  match_name: '男足决赛',
  player_one_name: '队伍A',
  player_two_name: '队伍B',
  player_one:'12345',
  player_two:'23456'
});

const fetchMatchesByDate = async () => {
  try {
    const response = await axios.get('/vote/info', {
      params: { date: selectedDate.value, page: currentPage.value },
    });
    matchList.value = response.data.matches;
  } catch (error) {
    console.error('获取比赛列表失败:', error);
    // 使用默认数据
    matchList.value = defaultMatches;
  }
};

const viewMatchDetails = (match) => {
  selectedMatch.value = match;
  showVoteModal.value = true;
};

const closeVoteModal = () => {
  showVoteModal.value = false;
  selectedMatch.value = null;
};

const submitVote = async (choice) => {
  try {
    await axios.post('/vote/action', {
      vote_id: selectedMatch.value.match_name,
      choice,
    }, {
      headers: {
        Authorization: "Bearer"+localStorage.getItem("token"), // 替换为实际的 token
      },
    });
    alert('投票成功！');
    closeVoteModal();
  } catch (error) {
	alert(error);
    console.error('投票失败:', error);
	closeVoteModal();
  }
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