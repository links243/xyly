<template>
  <div class="index">
    <!-- 面包屑开始 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>南通市酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑结束 -->
    <!-- 搜索栏开始 -->
    <searchBar :cityList="cities" @handlePrice="getPriceInfo"></searchBar>
    <!-- 搜索栏结束 -->

    <!-- 筛选栏开始 -->
    <filterBar
      @changePrice="priceChange"
      @levelChange="changeLevel"
      @typeChange="changeType"
      @assetChange="changeAsset"
      @brandChange="changeBrand"
    ></filterBar>
    <!-- 筛选栏结束 -->
    <!-- 酒店列表开始 -->
    <!-- 酒店列表开始 -->
    <hotelItem :hotelInfo="filterHotelInfo" />
    <!-- 酒店列表结束 -->
    <!-- 分页功能开始 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
    <!-- 分页功能结束 -->
  </div>
</template>

<script>
import hotelItem from "@/components/hotel/HotelItem";
import searchBar from "@/components/hotel/SearchBar";
import filterBar from "@/components/hotel/FilterBar";
export default {
  components: {
    hotelItem,
    searchBar,
    filterBar
  },
  data() {
    return {
      // 从服务器获取到城市搜索输入框可显示城市数据
      cities: ["南京", "北京"],
      targetCity: "",
      // 筛选信息
      filterInfo: {
        city: 87
        // hotellevel:0,
        // hoteltype:0,
        // hotelbrand:0,
        // price:
      },
      // 从服务器获取的酒店信息
      hotelInfo: [],
      // 分页过滤后的酒店信息
      filterHotelInfo: [],

      // 分页模块的数据
      page: {
        // 当前页数
        currentPage: 1,
        // 当前页数量数组
        pageSizes: [2, 5, 10, 50],
        // 所有数据的总数
        total: 100,
        // 当前选中的页容量
        pageSize: 5
      }
    };
  },
  mounted() {
    // this.$axios.get("/hotels", { params: { city: 87 } }).then(res => {
    //   console.log(res);
    //   this.hotelInfo = res.data.data;
    //   this.page.total = res.data.data.length;
    // });
    this.getHotelList(true);
  },

  methods: {
    getHotelList(isfrist) {
      if (isfrist) {
        this.$axios.get("/hotels", { params: this.filterInfo }).then(res => {
          this.hotelInfo = res.data.data;
          // 给分页模块的总数赋值
          this.page.total = res.data.data.length;
          // 把酒店的打分分数改造成数组
          this.hotelInfo.forEach(v => {
            v.starsArray = this.getHalfStar(v.stars);
          });
          // 第一次加载的时候给过滤数据一个默认数据
          this.filterHotelInfo = this.hotelInfo;

          this.filterHotelInfo = this.hotelInfo.slice(
            (this.page.currentPage - 1) * this.page.pageSize,
            this.page.currentPage * this.page.pageSize
          );
        });
      } else {
        this.filterHotelInfo = this.hotelInfo.slice(
          (this.page.currentPage - 1) * this.page.pageSize,
          this.page.currentPage * this.page.pageSize
        );
      }
    },
    // 把分数改造成数组
    getHalfStar(star) {
      let starArray = [];
      while (star > 0) {
        if (star >= 1) {
          starArray.push(1);
        } else {
          starArray.push(star % 1);
        }
        star--;
      }
      return starArray;
    },
    // 切换当前页容量数组
    handleSizeChange(val) {
      console.log(val);
      this.page.pageSize = val;
      // 刷新一下数据
      this.getHotelList();
    },
    // 切换页码
    handleCurrentChange(val) {
      console.log(val);
      this.page.currentPage = val;
      // 刷新一下数据
      this.getHotelList();
    },
    // 点击查看 “价格按钮” 获取 城市 日期 人数 数据
    getPriceInfo(obj) {
      console.log(obj);
    },
    // 滑块获得价格
    priceChange(price) {
      this.filterInfo.price_lt=price
      // console.log(this.filterInfo.price_lt);
      this.getHotelList(true);
    },
    // 酒店等级
    changeLevel(level) {
      // console.log(level);
      level.forEach(e => {
        this.filterInfo.hotellevel = e;
      });
      // console.log(this.filterInfo);
      if(level.length===0){
        delete this.filterInfo.hotellevel
      }
      this.getHotelList(true);
    },
    // 酒店类型
    changeType(type) {
      type.forEach(e => {
        this.filterInfo.hoteltype = e;
      });
      // console.log(this.filterInfo);
      if(type.length===0){
        delete this.filterInfo.hoteltype
      }
      this.getHotelList(true);
    },
    // 酒店设施
    changeAsset(asset) {
      asset.forEach(e => {
        this.filterInfo.hotelasset = e;
      });
      // console.log(this.filterInfo);
      if(asset.length===0){
        delete this.filterInfo.hotelasset
      }
      this.getHotelList(true);
    },
    // 酒店品牌
    changeBrand(brand) {
      // console.log(brand);
      brand.forEach(e => {
        this.filterInfo.hotelbrand = e;
      });
      // console.log(brand);
      if(brand.length===0){
        delete this.filterInfo.hotelbrand
      }
      this.getHotelList(true);
    }
  }
};
</script>

<style lang='less' scoped>
.index {
  width: 1000px;
  margin: 0 auto;
  .breadcrumb {
    margin: 20px 0;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>