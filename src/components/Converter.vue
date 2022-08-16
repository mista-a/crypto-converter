<script setup>
import { ref, watch } from 'vue'
import { Api } from '../API/API'
import ConverterSelect from './ConverterSelect.vue'
import IconSwap from './icons/IconSwap.vue'
import CountCoinsInput from './CountCoinsInput.vue'
import logAxiosError from '../utils/logAxiosError'

const calculateInputCount = (count, firstCoinUsd, secondCoinUsd) => {
  return ((count * firstCoinUsd) / secondCoinUsd).toFixed(5)
}
const getUsdPrice = (coin) => coin.value.market_data.current_price.usd

const calculateFirstInputCount = () => {
  return calculateInputCount(
    secondCountInput.value,
    getUsdPrice(secondCoin),
    getUsdPrice(firstCoin)
  )
}
const calculateSecondInputCount = () => {
  return calculateInputCount(
    firstCountInput.value,
    getUsdPrice(firstCoin),
    getUsdPrice(secondCoin)
  )
}

const coins = ref([])
const firstCoin = ref(await Api().coin.getCoin('bitcoin'))
const firstCountInput = ref('1')
const firstSelectInput = ref('')
const secondCoin = ref(await Api().coin.getCoin('ethereum'))
const secondCountInput = ref(calculateSecondInputCount())
const secondSelectInput = ref('')

try {
  coins.value = await Api().coin.getCoins()
} catch (err) {
  logAxiosError(err)
}

watch([secondCountInput, secondCoin], () => {
  if (secondCountInput.value !== calculateSecondInputCount()) {
    firstCountInput.value = calculateFirstInputCount()
  }
})

watch([firstCountInput, firstCoin], () => {
  if (firstCountInput.value !== calculateFirstInputCount()) {
    secondCountInput.value = calculateSecondInputCount()
  }
})

const choseFirstCoin = (coin) => {
  firstCoin.value = coin
  firstSelectInput.value = ''
}
const choseSecondCoin = (coin) => {
  secondCoin.value = coin
  secondSelectInput.value = ''
}

const changeFirstSelectorInput = (newValue) => {
  firstSelectInput.value = newValue
}
const changeSecondSelectorInput = (newValue) => {
  secondSelectInput.value = newValue
}

const changeFirstCountInput = (newValue) => {
  firstCountInput.value = newValue
}
const changeSecondCountInput = (newValue) => {
  secondCountInput.value = newValue
}

const swapCoins = () => {
  //prettier-ignore
  [firstCoin.value, secondCoin.value]
    =
  [secondCoin.value, firstCoin.value];

  //prettier-ignore
  [firstCountInput.value, secondCountInput.value]
    =
  [secondCountInput.value,firstCountInput.value]
}
</script>

<template>
  <div class="wrapper">
    <h1 class="header">Конвертер криптовалют</h1>
    <div class="converters">
      <div class="coin-inputs">
        <CountCoinsInput
          :coinsCount="firstCountInput.toString()"
          @handle-input="changeFirstCountInput"
        />
        <ConverterSelect
          :coins="coins"
          :coinName="firstCoin.name"
          :coinSymbol="firstCoin.symbol"
          :inputValue="firstSelectInput"
          @chose-coin="choseFirstCoin"
          @handle-input="changeFirstSelectorInput"
        />
      </div>
      <button class="swap-button" @click="swapCoins">
        <IconSwap class="swap-icon" />
      </button>
      <div class="coin-inputs">
        <CountCoinsInput
          :coinsCount="secondCountInput.toString()"
          @handle-input="changeSecondCountInput"
        />
        <ConverterSelect
          :coins="coins"
          :coinName="secondCoin.name"
          :coinSymbol="secondCoin.symbol"
          :inputValue="secondSelectInput"
          @chose-coin="choseSecondCoin"
          @handle-input="changeSecondSelectorInput"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
  width: 100%;
}
.header {
  text-align: center;
}
.converters {
  display: flex;
  align-items: center;
  gap: 10px;
}
.coin-inputs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.swap-button {
  border-radius: 8px;
  padding: 8px 15px;
  background: rgb(255, 255, 255);
  transition: background 0.3s;
}
.swap-button:hover {
  background: rgb(206, 206, 206);
}
.swap-button:active {
  background: rgb(121, 121, 121);
  transition: background 0.1s;
}
</style>
