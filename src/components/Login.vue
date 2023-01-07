<template>
  <div class="login-container">
    <a-form ref="form" :model="loginForm" class="login-form">
      <h2 class="title">用户登录</h2>
      <a-form-item>
        <a-input v-model:value="loginForm.username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon"/>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input-password v-model:value="loginForm.password">
          <template #prefix>
            <LockOutlined class="site-form-item-icon"/>
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-button class="submit" type="primary" @click="onSubmit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import {defineComponent, reactive, computed} from 'vue';
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import 'ant-design-vue/es/message/style/css'
import request from '../util/request'
import router from '../util/router';

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const loginForm = reactive({
      username: 'admin',
      password: '2022.admin',
      remember: true,
    });

    const onSubmit = () => {
      request.post(`/provider/doLogin`, loginForm).then(res => {
        if (res.code === 200) {
          message.success("登陆成功")
          window.localStorage.setItem(res.data.tokenName, res.data.tokenValue);
          router.push("/index")
        } else {
          message.error("登陆失败！");
        }
      }).catch(err => {
        message.error("登陆失败！");
      })
    };
    return {
      loginForm,
      onSubmit
    };
  },
});
</script>
<style>
/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../assets/login/login_background.jpg") no-repeat;
  background-size: 100% 100%;
  text-align: center;
}

.login-form {
  width: 565px;
  height: 372px;
  margin: 200px auto;
  padding: 40px 110px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}
</style>