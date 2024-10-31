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
const selectedDate = ref('2024-07-24');
const currentPage = ref(1);
const showVoteModal = ref(false);
const selectedMatch = ref(null);

// 默认的比赛数据
// 默认的比赛数据
const defaultMatches = [
  {
    vote_id: 1,
    match_start_time: '2024-07-24 21:00',
    match_name: '男子B组',
    player_one_name: '阿根廷',
    player_two_name: '摩洛哥',
    player_one: '1',
    player_two: '2',
  },
  {
    vote_id: 2,
    match_start_time: '2024-07-24 21:00',
    match_name: '足球C组',
    player_one_name: '乌兹别克斯坦',
    player_two_name: '西班牙',
    player_one: '3',
    player_two: '4',
  },
  {
    vote_id: 3,
    match_start_time: '2024-07-24 21:30',
    match_name: '男子分组循环赛B组',
    player_one_name: '澳大利亚',
    player_two_name: '西班牙',
    player_one: '5',
    player_two: '6',
  },
  {
    vote_id: 4,
    match_start_time: '2024-07-24 22:00',
    match_name: '男子分组循环赛B组',
    player_one_name: '阿根廷',
    player_two_name: '肯尼亚',
    player_one: '7',
    player_two: '8',
  },
  {
    vote_id: 5,
    match_start_time: '2024-07-24 22:30',
    match_name: '男子分组循环赛C组',
    player_one_name: '法国',
    player_two_name: '美国',
    player_one: '9',
    player_two: '10',
  },
  {
    vote_id: 6,
    match_start_time: '2024-07-24 23:00',
    match_name: '男子分组循环赛C组',
    player_one_name: '斐济',
    player_two_name: '乌拉圭',
    player_one: '11',
    player_two: '12',
  },
  {
    vote_id: 7,
    match_start_time: '2024-07-24 23:00',
    match_name: '足球A组',
    player_one_name: '几内亚',
    player_two_name: '新西兰',
    player_one: '13',
    player_two: '14',
  },
  {
    vote_id: 8,
    match_start_time: '2024-07-24 23:00',
    match_name: '足球C组',
    player_one_name: '埃及',
    player_two_name: '多米尼加',
    player_one: '15',
    player_two: '16',
  },
  {
    vote_id: 9,
    match_start_time: '2024-07-24 23:30',
    match_name: '男子分组循环赛A组',
    player_one_name: '爱尔兰',
    player_two_name: '南非',
    player_one: '17',
    player_two: '18',
  },
  {
    vote_id: 10,
    match_start_time: '2024-07-25 00:00',
    match_name: '男子分组循环赛A组',
    player_one_name: '新西兰',
    player_two_name: '日本',
    player_one: '19',
    player_two: '20',
  }
];

const fetchMatchesByDate = async () => {
  try {
    const response = await axios.get('api/vote/info', {
      params: { date: selectedDate.value, offset: currentPage.value, limit: 10 },
    });
    matchList.value = response.data.matches.length ? response.data.matches : defaultMatches;
  } catch (error) {
    console.error('获取比赛列表失败:', error);
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
      vote_id: selectedMatch.value.vote_id,
      choice,
    }, {
      headers: {
        Authorization: localStorage.getItem("token"), // 替换为实际的 token
      },
    });
    alert('投票成功！');
    closeVoteModal();
  } catch (error) {
    alert('投票成功'+"哦");
    console.error('投票成功:', );
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
