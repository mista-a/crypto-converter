<script setup>
const props = defineProps({
  coinsCount: String,
})

const emit = defineEmits(['handleInput'])

const onInputChange = (newValue) => {
  // const operators = ['*', '/', '+', '-']

  // operators.forEach((operator) => {
  //   console.log(newValue)
  //   const operatorIndex = newValue.indexOf(operator)

  //   if (operatorIndex !== -1 && newValue.length > operatorIndex + 1) {
  //     const firstNumber = +newValue.slice(0, operatorIndex)
  //     const secondNumber = +newValue.slice(operatorIndex + 1)
  //     let calcNewValue = 0

  //     switch (operator) {
  //       case '*':
  //         calcNewValue = firstNumber * secondNumber
  //         break
  //       case '/':
  //         calcNewValue = firstNumber / secondNumber
  //         break
  //       case '+':
  //         calcNewValue = firstNumber + secondNumber
  //         break
  //       case '-':
  //         calcNewValue = firstNumber - secondNumber
  //     }
  //     newValue = calcNewValue.toString()
  //   }
  // })

  emit('handleInput', newValue)
}
</script>

<template>
  <input
    class="count-input"
    type="number"
    min="0"
    :value="props.coinsCount"
    @input="(e) => onInputChange(e.target.value)"
  />
</template>

<style scoped>
.count-input {
  padding: 8px;
  border-radius: 5px;
  outline: none;
  border: 1px solid rgb(238, 238, 238);
}
.count-input:focus {
  outline: 2px solid rgb(214, 214, 214);
}
</style>
