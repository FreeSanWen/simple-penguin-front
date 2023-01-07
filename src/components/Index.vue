<template>
  <a-layout style="height: 100%;">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-sub-menu v-for="menuList in menu.userNavList" :key="menuList.id">
          <template #title>
            <span>{{ menuList.resourcesName }}</span>
          </template>
          <a-sub-menu v-for="childList in menuList.childList" :key="childList.id">
            <template #title>
              <span>{{ childList.resourcesName }}</span>
            </template>
            <a-menu-item v-for="child in childList.childList" :key="child.path">
              {{ child.resourcesName }}
            </a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="custom-layout-header">
        <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
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
      <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import {defineComponent, reactive, ref} from 'vue';
import request from '../util/request'
import {message} from "ant-design-vue";
import router from "../util/router.js";
export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  setup() {
    const menu=reactive({
      userNavList:[]
    });

    const initMenu = () => {
      request.get(`/provider/resources/init-menu-list`).then(res => {
        if (res.code === 200) {
          menu.userNavList = res.data;
        }else{
          message.success("获取菜单接口失败！")
        }
      }).catch(err => {
        message.error("获取菜单接口失败！");
      })
    };

    initMenu();

    const logout = () =>{

    };

    return {
      selectedKeys: ref(['1']),
      collapsed: ref(false),
      menu,
      logout
    };
  },
});
</script>
<style scoped>
.trigger{
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.custom-layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 0

}
</style>