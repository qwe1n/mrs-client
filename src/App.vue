<template>
  <a-config-provider>
    <router-view></router-view>
  </a-config-provider>
  <footer>
    <p>&copy; 2023 My Website. All rights reserved.</p>
  </footer>
</template>

<script setup>
</script>

<style lang="scss" scoped>
footer {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
