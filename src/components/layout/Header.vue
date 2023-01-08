<template>
  <a-layout-header class="custom-layout-header">

    <a-dropdown>
      <a-avatar style="margin-right: 16px;">
        <template #icon><UserOutlined /></template>
      </a-avatar>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0" @click="logout()">
            注销
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-layout-header>
</template>

<script setup>
import { UserOutlined } from '@ant-design/icons-vue';


const logout = () =>{

};

</script>
<style lang="less" scoped>
.custom-layout-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
  padding: 0

}
</style>