<script setup>
import Converter from './components/Converter.vue'
</script>

<template>
  <main class="main">
    <Suspense>
      <Converter />
    </Suspense>
  </main>
</template>

<style>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0 15px;
}

input {
  width: 100%;
  border: none;
  font-weight: 600;
  font-size: 15px;
}

button {
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  padding: 0;
  font-size: 0;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

:root {
  --vt-c-white: #ffffff;
  --vt-c-white-soft: #f8f8f8;
  --vt-c-white-mute: #f2f2f2;

  --vt-c-black: #181818;
  --vt-c-black-soft: #222222;
  --vt-c-black-mute: #282828;

  --vt-c-text-dark-1: var(--vt-c-white);
  --vt-c-text-dark-2: rgba(235, 235, 235, 0.64);
}

:root {
  --color-background: var(--vt-c-black);
  --color-text: var(--vt-c-text-dark-2);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}

body {
  min-height: 100vh;
  color: var(--color-text);
  background: var(--color-background);
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
