<script setup>
const { thumb, name, symbol } = defineProps({
  thumb: String,
  name: String,
  symbol: String,
})
</script>

<template>
  <div class="coin">
    <img class="thumb" :src="thumb" alt=" " />
    <span class="text"> {{ name }} ({{ symbol }})</span>
  </div>
</template>

<style scoped>
.coin {
  display: flex;
  gap: 5px;
  width: 100%;
  padding: 6px 5px;
  cursor: pointer;
  background: rgb(41, 41, 41);
  transition: background 0.4s;
}
.coin:hover {
  background: rgb(61, 61, 61);
}
.thumb {
  width: 24px;
  height: 24px;
}
</style>
