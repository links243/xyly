<template>
  <div class="hotelDetail">
    <!-- 面包屑开始 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item>xx酒店</el-breadcrumb-item>
        <el-breadcrumb-item>好来阁商务宾馆</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑结束 -->

    <!-- 标题开始 -->
    <div class="title">
      <p class="zh_name">好歌来商务宾馆</p>
      <p class="eng_name">hao lai ge shang wu bing guan</p>
      <p class="position">
        <i class="iconfont icon-weizhi"></i>
        搞小子擦才能拉开四川那里
      </p>
    </div>
    <!-- 标题结束 -->

    <!-- 照片开始 -->
    <div class="photo">
      <div class="bigPhoto"></div>
      <div class="smallPhotos">
        <div class="photos"></div>
        <div class="photos"></div>
        <div class="photos"></div>
        <div class="photos"></div>
        <div class="photos"></div>
        <div class="photos"></div>
      </div>
    </div>
    <!-- 照片结束 -->

    <!-- 表格开始 -->
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="价格来源" width="180"></el-table-column>
        <el-table-column prop="name" label="低价房型" width="180"></el-table-column>
        <el-table-column prop="address" label="最低价格/每晚"></el-table-column>
      </el-table>
    </div>
    <!-- 表格结束 -->
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route.params.id);
  }
};
</script>

<style lang='less' scoped>
.hotelDetail {
  width: 1000px;
  margin: 0 auto;
  .breadcrumb {
    margin: 20px 0 20px 0;
  }
  .title {
    .zh_name {
      font-size: 24px;
      font-weight: 500;
      padding-bottom: 6px;
    }
    .eng_name {
      font-size: 14px;
      color: #666;
    }
    .position {
      font-size: 14px;
      color: #666;
    }
  }
  .photo {
    display: flex;
    margin: 40px 0;
    .bigPhoto {
      margin-right: 20px;
      width: 640px;
      height: 360px;
      background-color: pink;
    }
    .smallPhotos {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      background-color: #666;
      .photos {
        width: 160px;
        margin: 0 20px 15px 0;
        background-color: yellow;
        &:nth-child(2n) {
          margin-right: 0;
        }
        &:nth-child(5n) {
          margin-bottom: 0;
        }
        &:nth-child(6n) {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>