<script setup>
import { ref, watchEffect } from 'vue'
import { vClickOutside } from '../directives/vClickOutside'
import { Api } from '../API/API'
import ConverterItem from './ConverterItem.vue'
import logAxiosError from '../utils/logAxiosError'
import IconArrow from './icons/IconArrow.vue'

const props = defineProps({
  coins: { id: Number, name: String, Symbol: String },
  coinName: String,
  coinSymbol: String,
  inputValue: String,
})
const { coins } = props

const displayCoinList = ref(false)
const filtredCoins = ref(coins)
const searchFetching = ref(false)
const getCoinFetching = ref(false)
const inputRef = ref(null)
const showingCoinsCount = 50

const emit = defineEmits(['handleInput', 'choseCoin'])

const onInputChange = (newValue) => emit('handleInput', newValue)
const choseCoin = async (coinId) => {
  getCoinFetching.value = true
  try {
    const coin = await Api().coin.getCoin(coinId)
    emit('choseCoin', coin)
  } catch (err) {
    logAxiosError(err)
  }
  getCoinFetching.value = false
}

watchEffect(async () => {
  searchFetching.value = true
  try {
    filtredCoins.value = await Api().coin.search(props.inputValue)
  } catch (err) {
    logAxiosError(err)
  }
  searchFetching.value = false
})

const showCoinList = () => (displayCoinList.value = true)
const hideCoinList = () => (displayCoinList.value = false)

const onInputClick = () => {
  showCoinList()
  inputRef.value.focus()
}
</script>

<template>
  <div class="converter">
    <div
      class="coin-search"
      :class="`${displayCoinList && 'coin-search-active'} ${
        getCoinFetching && 'search-input-fetching'
      }`"
      @click.stop="onInputClick()"
      v-click-outside="hideCoinList"
    >
      <!-- @click.stop="onCoinSearchClick" -->
      <input
        class="coin-search-input"
        ref="inputRef"
        :placeholder="`${props.coinName} (${props.coinSymbol.toUpperCase()})`"
        :value="displayCoinList ? inputValue : ''"
        @input="(e) => onInputChange(e.target.value)"
      />
      <IconArrow class="arrow" :class="displayCoinList && 'arrow-active'" />
    </div>
    <div
      class="converter-list"
      :class="searchFetching && 'converter-list-fetching'"
      v-if="displayCoinList"
    >
      <ConverterItem
        v-for="{ id, thumb, name, symbol } of filtredCoins.slice(
          0,
          showingCoinsCount
        )"
        :key="id"
        :thumb="thumb"
        :name="name"
        :symbol="symbol"
        @click="choseCoin(id)"
      />
    </div>
  </div>
</template>

<style scoped>
.converter {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.coin-search {
  align-items: center;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  display: flex;
  background-color: #fff;
}
.coin-search:hover .arrow {
  color: rgb(0, 0, 0);
}
.coin-search-active {
  cursor: text;
}
.coin-search-input {
  cursor: pointer;
  outline: none;
}
.coin-search-input::placeholder {
  color: black;
  cursor: pointer;
}
.coin-search-input:focus {
  cursor: text;
  outline: none;
}
.search-input-fetching {
  opacity: 0.6;
  pointer-events: none;
}
.arrow {
  width: 28px;
  color: rgb(192, 192, 192);
  transition: color 0.4s;
}
.arrow-active {
  color: rgb(0, 0, 0);
}
.converter-list {
  display: flex;
  flex-direction: column;
  max-height: 230px;
  width: 100%;
  position: absolute;
  top: calc(100% + 4px);
  overflow: auto;
  border-radius: 7px;
  animation: show 0.3s;
}
@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.converter-list-fetching {
  opacity: 0.6;
  pointer-events: none;
}
</style>
