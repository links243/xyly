<template>
  <div class="flights_filter">
    <div class="filter_main">
      <div class="main_path" @click="aaa">单程: 广州-上海/ 2019-10-28</div>
      <div class="main_selects" v-if="flightsData.flights.length">
        <div class="select_item">
          <el-select placeholder="起飞机场" size="mini" v-model="airport">
            <el-option
              v-for="item in filterData.airport"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="select_item">
          <el-select placeholder="起飞时间" size="mini" v-model="flightTimes">
            <el-option
              v-for="item in filterData.flightTimes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="select_item">
          <el-select placeholder="航空公司" size="mini" v-model="company">
            <el-option
              v-for="item in  filterData.company"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="select_item">
          <el-select placeholder="机型" size="mini" v-model="sizes">
            <el-option
              v-for="item in  filterData.planeSize"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="filters_btns">
      筛选:
      <el-button type="primary" round size="mini">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["flightsData"],
  data() {
    return {
      // 起飞机场默认值
      airport: "",
      // 起飞时间
      flightTimes: "",
      // 航空公司
      company: "",
      // 机型
      sizes: ""
    };
  },
  computed: {
    filterData() {
      let airport = [];
      let flightTimes = [];
      let company = [];
      let planeSize = [];
      // 起飞机场
      this.flightsData.options.airport.forEach(val => {
        val && airport.push({ value: val, label: val });
      });

      // 起飞时间
      flightTimes = this.flightsData.options.flightTimes.map(val => ({
        label: `${val.from}:00 - ${val.to}:00`,
        value: `${val.from}|${val.to}`
      }));

      // 航空公司
      company = this.flightsData.options.company.map(val => ({
        label: val,
        value: val
      }));

      // 机型
      planeSize = [
        {value: 'S' ,label: '小型机型'},
        {value: 'M' ,label: '中等机型'},
        {value: 'L' ,label: '大型机型'}
      ]
      return { airport, flightTimes, company, planeSize };
    }
  },
  methods: {
    aaa() {
      console.log(this.filterData);
      console.log(this.flightsData);
    }
  }
};
</script>
<style lang="less" scoped>
.flights_filter {
  .filter_main {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .main_path {
      font-size: 13px;
    }
    .main_selects {
      display: flex;

      .select_item {
        width: 120px;
        margin-left: 5px;
      }
    }
  }
  .filters_btns {
    padding: 10px 0;
  }
}
</style>