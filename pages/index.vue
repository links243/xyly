<template>
  <div class="xyly_index">
    <!-- 轮播图开始 -->
    <div class="index_carousel">
      <el-carousel height="700px">
        <el-carousel-item v-for="(item,index) in swiperList" :key="index">
          <div :style=" `background:url(${ $axios.defaults.baseURL + item.url}) center center;height:700px;` " />
        </el-carousel-item>
      </el-carousel>

      <!-- tab栏开始 -->
      <div class="index_tabs">
        <TypesTab />
      </div>
    <!-- tab栏结束 -->
    </div>
    <!-- 轮播图结束 -->
  </div>
</template>

<script>
import TypesTab from '@/components/index/typesTab.vue'
export default {
  components: {
    TypesTab
  },
  data () {
    return {
      swiperList: []
    }
  },
  asyncData (context) {
    const $axios = context.app.$axios
    // console.log($axios)
    return $axios.get('/scenics/banners')
      .then((res) => {
        return {
          swiperList: res.data.data
        }
      })
  }
  // mounted () {
  //   this.$axios.get('/scenics/banners')
  //     .then((res) => {
  //       // console.log(res)
  //       this.swiperList = res.data.data
  //       console.log(this.swiperList)
  //     })
  // }
}
</script>

<style lang='less' scoped>
.xyly_index{
  min-width: 1000px;
}
.index_carousel {
position: relative;

.index_tabs {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
}
</style>
