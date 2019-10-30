<template>
  <div class="flights">
    <!-- 正文 开始 -->
    <div class="flights_main">
      <!-- 1 筛选模块 开始 -->
      <FlightsFilter v-if='false'/>
      <!-- 1 筛选模块 结束 -->

      <!-- 2 表单的头部 开始 -->
      <FlightsHead/>
      <!-- 2 表单的头部 结束 -->

      <!-- 3 机票列表 开始 -->
      <div class="air_list">
        <FlightsItem 
          v-for="item in flightsData.flights" :key="item.id"
          :data='item'
        />
      </div>
      <!-- 3 机票列表 结束 -->
    </div>
    <!-- 正文 结束 -->

    <!-- 侧边栏 开始 -->
    <div class="flights_aside">2</div>
    <!-- 侧边栏 结束 -->

  </div>
</template>

<script>
import FlightsFilter from "@/components/air/FlightsFilter";
import FlightsHead from "@/components/air/FlightsHead";
import FlightsItem from "@/components/air/FlightsItem";
export default {
  data() {
    return {
      flightsData:{}
    }
  },
  components: {
    FlightsFilter,FlightsHead,FlightsItem
  },
  mounted() {
      let form = this.$route.query
      this.$axios.get('/airs',{ params: form })
        .then(res => {
          console.log(res)
          this.flightsData = res.data
          console.log(this.flightsData)
        })
  }
};
</script>

<style lang="less" scoped>
.flights {
  width: 1000px;
  margin: 0 auto;
  display: flex;
}
.flights_main {
  flex: 5;
}
.flights_aside {
  flex: 2;
}
</style>