<template>
  <div class="header">
    <div class="main">
      <div class="main_pages">
        <nuxt-link to="/" class="pages_logo">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt>
        </nuxt-link>
        <nuxt-link to="/" class="page_item">
          首页
        </nuxt-link>
        <nuxt-link to="/post" class="page_item">
          旅游攻略
        </nuxt-link>
        <nuxt-link to="/hotel" class="page_item">
          酒店
        </nuxt-link>
        <nuxt-link to="/air" class="page_item">
          国内机票
        </nuxt-link>
      </div>
      <div class="main_login">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-bell" />
            消息
            <i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <nuxt-link to="/user/login" class="login_link">
          登录/注册
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.header {
  border-bottom: 1px solid #ccc;
  a {
    text-decoration: none;
    // 继承父元素的颜色
    color: inherit;
  }
  .main {
    width: 1000px;
    margin: 0 auto;
    height: 60px;
    display: flex;
    justify-content: space-between;

    .main_pages {
      display: flex;

      .page_item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px;

        &:hover {
          color: #0094ff;
          background-color: #fff;
          position: relative;

          // 让鼠标悬浮的时候下边框不占用元素的高度，伪元素定位不会影响里边的文字变化位置
          &::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background-color: #0094ff;
          }
        }
      }
      .nuxt-link-exact-active {
        // 当nuxt-link被选中时候生效的样式
        color: #fff !important;
        background-color: #0094ff !important;
      }
      .pages_logo {
        background-color: #fff !important;
        display: flex;
        align-items: center;
        img {
          width: 156px;
        }
      }
    }
  }
  .main_login {
    display: flex;
    align-items: center;
    justify-content: center;
    .login_link {
      font-size: 13px;
      color: #666;
      margin-left: 15px;
      &:hover {
        color: #0094ff;
      }
    }
  }
}
</style>
