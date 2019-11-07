<template>
  <div class="text">
    <el-autocomplete
      class="inline-input"
      v-model="targetCity"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>
<script>
export default {
  data() {
    return {
      restaurants: [],
      targetCity:"",
      cities:[]
    };
  },
  methods: {
     querySearch(queryString, cb) {
         console.log(this.cities);
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
          console.log(restaurant);
        return (restaurant) => {
          return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
    loadAll() {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" }
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    
  },
  mounted() {
    this.restaurants = this.loadAll();
    console.log(this.restaurants);
    // this.getCityList()
    this.$axios
        .get("/cities", { params: { name: this.targetCity } })
        .then(res => {
        //   console.log(res.data.data);
          this.cities = res.data.data;
        //   console.log(this.cities);
        //   this.querySearch(this.searchInfo.targetCity)
        });
    // console.log(this.cities);
  }
};
</script>