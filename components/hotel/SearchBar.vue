<template>
  <el-row>
    <!-- 城市搜索 -->
    <el-col :span="4">
      <el-autocomplete
        class="citySel"
        v-model="searchInfo.targetCity"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        @select="handleSelect"
      ></el-autocomplete>
    </el-col>

    <!-- 日期选择 -->
    <el-col :span="8" style="margin-left:10px">
      <el-date-picker
        class="dateSel"
        v-model="checkIndate"
        type="daterange"
        range-separator="-"
        start-placeholder="入住日期"
        end-placeholder="离店日期"
      ></el-date-picker>
    </el-col>
    <!-- 人数选择 -->
    <el-col :span="6" style="margin-left:25px">
      <el-input
        class="personSel"
        placeholder="人数未定"
        suffix-icon="el-icon-user"
        v-model="totalGuestNum"
        v-popover:popover1
      ></el-input>
      <el-popover ref="popover1" placement="bottom-start" title width="300" trigger="click">
        <el-row style="height:60px;line-height:40px">
          <el-col :span="8">
            <span style="font-size:12px">每间</span>
          </el-col>
          <el-col :span="8" style="padding-left:4px">
            <el-select v-model="value_adult" placeholder="请选择" size="mini">
              <el-option
                v-for="item in adult_num"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" style="padding-left:4px">
            <el-select v-model="value_child" placeholder="请选择" size="mini">
              <el-option
                v-for="item in child_num"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span>{{item.value}}</span>
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <hr />
        <el-col style="position:relative;height:40px">
          <el-button
            type="primary"
            size="mini"
            style="position:absolute;right:0;bottom:0"
            @click="getGuestNum"
          >确认</el-button>
        </el-col>
      </el-popover>
    </el-col>
    <!-- 按钮 -->
    <el-col :span="4" style="margin-left:10px">
      <el-button type="primary" @click="checkPrice">查看价格</el-button>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: ["cityList"],
  data() {
    return {
        // 城市
      searchInfo: {
        targetCity: "",
        cities: []
      },
    //   日期
      checkIndate: "",
      pickerOptions2: {
        shortcuts: [
          {
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
    //   人数
      adult_num: [
        {
          value: "1成人"
          //   label: "1"
        },
        {
          value: "2成人"
          //   label: "2"
        },
        {
          value: "3成人"
          //   label: "3"
        },
        {
          value: "4成人"
          //   label: "4"
        },
        {
          value: "5成人"
          //   label: "5"
        },
        {
          value: "6成人"
          //   label: "6"
        },
        {
          value: "7成人"
          //   label: "7"
        }
      ],
      child_num: [
        {
          value: "0儿童"
          //   label: "0"
        },
        {
          value: "1儿童"
          //   label: "1"
        },
        {
          value: "2儿童"
          //   label: "2"
        },
        {
          value: "3儿童"
          //   label: "3"
        },
        {
          value: "4儿童"
          //   label: "4"
        }
      ],
      value_adult: "2成人",
      value_child: "",
      totalGuestNum: ""
    };
  },
  methods: {
    //   搜索城市
    querySearch(queryString, cb) {
    //   this.$axios
    //     .get("/cities", { params: { name: this.searchInfo.targetCity } })
    //     .then(res => {
    //       var arr = [];
    //       res.data.data.map(e => {
    //           arr.push({
    //             value: e.id,
    //             label: e.name
    //           })
    //         console.log(arr);
    //       });
    //     });
        var restaurants = this.searchInfo.cities;
        var results = queryString
          ? restaurants.filter(this.createFilter(queryString))
          : restaurants;
          
        // 调用 callback 返回建议列表的数据
        cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    // 确定人数
    getGuestNum(e) {
      // console.log(this.value_adult,this.value_child)
      this.totalGuestNum = this.value_adult + this.value_child;
      e.currentTarget.parentNode.parentNode.style.display = "none";
    },
    // 传送按钮功能
    checkPrice(){
        let priceInfo={city:'',date:this.checkIndate,num:this.totalGuestNum}
        console.log(priceInfo);
        this.$emit("handlePrice",priceInfo)
    }
  },
  mounted() {
    this.$axios
      .get("/cities", { params: { name: this.searchInfo.targetCity } })
      .then(res => {
        this.searchInfo.cities = res.data.data;
        // console.log(this.searchInfo.cities);
      });
  }
};
</script>
<style lang="less" scoped>
.search_bar {
  display: flex;
}
</style>