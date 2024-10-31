<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>竞猜投票</h2>
      <p>请选择预测胜利的队伍:</p>
      <div>
        <label>
          <input type="radio" v-model="selectedTeam" :value="props.match.player_one" />
          {{ props.match.player_one_name }}
        </label>
      </div>
      <div>
        <label>
          <input type="radio" v-model="selectedTeam" :value="props.match.player_two" />
          {{ props.match.player_two_name }}
        </label>
      </div>
      <button @click="submitVote" :disabled="!selectedTeam">提交</button>
      <button @click="$emit('close')">取消</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  match: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close', 'confirmVote']);
const selectedTeam = ref(null);

const submitVote = () => {
  emit('confirmVote', selectedTeam.value);
  
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.modal-content button {
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>