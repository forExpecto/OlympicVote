<template>
  <div class="match-table">
    <slot name="header"></slot>
    <table>
      <thead>
        <tr>
          <th>比赛时间</th>
          <th>比赛大项</th>
          <th>比赛</th>
          <th>对战双方</th>
          <th>竞猜投票</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(match, index) in props.matches" :key="index">
          <td>{{ match.start_time }}</td>
          <td>{{ match.event }}</td>
          <td>{{ match.match_name }}</td>
          <td>{{ match.player_one }} vs {{ match.player_two }}</td>
          <td><button @click="$emit('viewDetails', match)">预测</button></td>
        </tr>
      </tbody>
    </table>
    <slot name="footer"></slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  matches: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.match-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.match-table table {
  width: 100%;
  border: 1px solid #ccc;
}
.match-table th, .match-table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}
.match-table th {
  background-color: #f5f5f5;
}
</style>