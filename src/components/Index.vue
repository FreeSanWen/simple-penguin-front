<template>
  <a-layout style="height: 100%;">

    <Menu></Menu>

    <a-layout>

      <Header></Header>

      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>

      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>

    </a-layout>
  </a-layout>
</template>
<script setup>
import Header from './layout/Header.vue'
import Menu from './layout/Menu.vue'

</script>
<style scoped>

</style>