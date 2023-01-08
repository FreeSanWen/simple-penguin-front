<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo"/>
    <a-menu v-model:selectedKeys="selectedKeys" @openChange="openChange" v-model:open-keys="openKeys" theme="dark" mode="inline">
      <template v-for="item in menu.userNavList" :key="item.id">
        <template v-if="item.childList.length==0">
          <a-menu-item :key="item.path">
            <template #icon>
              <PieChartOutlined />
            </template>
            {{ item.resourcesName }}
          </a-menu-item>
        </template>
        <template v-else>
          <CustomSubMenu :key="item.id" :menu-info="item" />
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import {PieChartOutlined,MailOutlined} from '@ant-design/icons-vue';
import {reactive, ref, watch} from "vue";

import {SubMenu,MenuItem} from "ant-design-vue";
import request from "../../util/request.js";
import {message} from "ant-design-vue";
import {useRoute} from "vue-router";
import router from "../../util/router.js";

const CustomSubMenu = {
  name: 'CustomSubMenu',
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  template: `
    <a-sub-menu :key="menuInfo.id">
      <template #icon><MailOutlined /></template>
      <template #title>{{ menuInfo.resourcesName }}</template>
      <template v-for="item in menuInfo.childList" :key="item.id">
        <template v-if="item.childList.length==0">
          <a-menu-item :key="item.path">
            <router-link :to="item.path">{{ item.resourcesName }}</router-link>
          </a-menu-item>
        </template>
        <template v-else>
          <CustomSubMenu :menu-info="item" :key="item.id" />
        </template>
      </template>
    </a-sub-menu>
  `,
  components: {
    PieChartOutlined,
    'a-menu-item':MenuItem,
    'a-sub-menu':SubMenu,
    MailOutlined,
  },
};
const collapsed = ref(false);
const route = useRoute();
//选中对应菜单
const selectedKeys = ref([route.path]);
//需要展开的菜单
const openKeys = ref([]);

const menu = reactive({
  userNavList: []
});

//点击菜单展开或者合起
const openChange = (openKey) =>{
  window.localStorage.setItem('currentMenuPathArray', openKey);
}
//监听路由变化，刷新页面后重新定位对应位置并展开
watch(() => router.currentRoute.value.path, (toPath) => {
  const path = window.localStorage.getItem('currentMenuPathArray');
  if(!path){
    return;
  }
  const array = path.split(",");
  openKeys.value = array;
}, { immediate: true, deep: true })

//加载菜单
const initMenu = () => {
  request.get(`/provider/resources/init-menu-list`).then(res => {
    if (res.code === 200) {
      menu.userNavList = res.data;
    } else {
      message.warn("获取菜单接口失败！")
    }
  }).catch(err => {
    message.error("获取菜单接口失败！");
  })
};

initMenu();
</script>

<style lang="less" scoped>
.logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>