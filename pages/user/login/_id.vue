<template>
  <div class="login">
    <div class="login_main">
      <div class="login_main_title">
        <div
          v-for="(item,index) in ['登录','注册']"
          :key="index"
          class="title_item"
          :class="index == current ? 'active' : '' "
          @click="changeActive(index)"
        >{{ item }}</div>
      </div>
      <div class="login_main_content">
        <div v-if="current == 1">
          <registerForm />
        </div>
        <div v-else>
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from "@/components/user/registerForm.vue";
import LoginForm from "@/components/user/loginForm.vue";
export default {
  components: {
    RegisterForm,
    LoginForm
  },
  data() {
    return {
      current: this.$route.params.id
    };
  },
  methods: {
    changeActive(index) {
      this.$router.push(`${index}`);
    }
  }
};
</script>

<style lang='less' scoped>
.login {
  height: 700px;
  min-width: 1000px;
  background: url(http://127.1:1337/assets/images/th03.jfif) center center;
  position: relative;
  .login_main {
    position: absolute;
    background-color: #fff;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login_main_title {
      height: 50px;
      color: #666;
      background-color: #eeeeee;
      display: flex;
      .title_item {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .active {
        color: orange;
        position: relative;
        background-color: #fff;
        font-weight: 600;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: orange;
        }
      }
    }
    .login_main_content {
      padding: 20px;
    }
  }
}
</style>
