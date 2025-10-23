<template>
  <div class="vue-remote-container">
    <h2>Vue Remote App</h2>
    <p>This is a Vue component loaded via Module Federation</p>
    <button @click="handleClick">Click Me</button>
  </div>
</template>

<script setup>
const handleClick = () => {
  alert("Vue button clicked!");
};
</script>

<style scoped>
.vue-remote-container {
  padding: 20px;
  border: 2px solid green;
  border-radius: 8px;
}

h2 {
  color: green;
  margin: 0 0 10px 0;
}

button {
  padding: 8px 16px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: darkgreen;
}
</style>
