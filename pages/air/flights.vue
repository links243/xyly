<template>
  <div class="flights">
    <!-- 正文 开始 -->
    <div class="flights_main">
      <!-- 1 筛选模块 开始 -->
      <FlightsFilter
       :flightsData="flightsData"
       />
      <!-- 1 筛选模块 结束 -->

      <!-- 2 表单的头部 开始 -->
      <FlightsHead />
      <!-- 2 表单的头部 结束 -->

      <!-- 3 机票列表 开始 -->
      <div class="air_list">
        <FlightsItem v-for="item in currentFlights" :key="item.id" :data="item" />
      </div>
      <!-- 3 机票列表 结束 -->
      <!-- 分页功能开始 -->
      <div>
        <el-pagination
          :current-page="page.currentPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
      <!-- 分页功能结束 -->
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
      // 从服务器获取的机票原始数据
      flightsData: {
        info: {},
        flights: [],
        options: {}
      },

      // 分页对象
      page: {
        // 当前页码
        currentPage: 1,
        // 页容量数组
        pageSizes: [1, 2, 5, 10, 20, 100],
        // 页容量
        pageSize: 10,
        // 总条数
        total: 1
      },

      // 被分页后的 机票列表
      currentFlights: []
    };
  },
  components: {
    FlightsFilter,
    FlightsHead,
    FlightsItem
  },
  methods: {
    // 获取机票数据
    getList(isFrist) {
      if (isFrist) {
        let form = this.$route.query;
        this.$axios.get("/airs", { params: form }).then(res => {
          // 机票数据
          this.flightsData = res.data;
          // 机票总数量
          this.page.total = this.flightsData.flights.length;

          // 需要实现 数组分页  this.flightsData.flights
          // 记公式
          // let list =totalList.slice()  使用它
          // let list =totalList.slice(
          // (当前的页码-1)*当前的页容量 ),
          // 当前的页码* 当前的页容量
          // )
          // this.currentFlights = this.flightsData.flights.slice(
          //   (this.page.currentPage - 1) * this.page.pageSize, // 0
          //   this.page.currentPage * this.page.pageSize // 2
          // );
          this.currentFlights = this.flightsData.flights.slice(
            (this.page.currentPage - 1) * this.page.pageSize,
            this.page.currentPage * this.page.pageSize
          );
        });
      } else {
        this.currentFlights = this.flightsData.flights.slice(
          (this.page.currentPage - 1) * this.page.pageSize,
          this.page.currentPage * this.page.pageSize
        );
      }
    },

    // 分页数组改变触发
    handleSizeChange(value) {
      this.page.pageSize = value;
      this.getList()
    },

    // 当前页码改变触发事件
    handleCurrentChange(value) {
      this.page.currentPage = value;

      this.getList()
    }
  },
  mounted() {
    this.getList(true);
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