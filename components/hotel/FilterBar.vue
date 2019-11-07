<template>
  <div class="filter_bar">
    <el-row>
      <!-- 价格 -->
      <el-col :span="6" class="optBox">
        <div class="block">
          <el-row>
            <el-col :span="12">
              <span class="demonstration">价格</span>
            </el-col>
            <el-col :span="12">
              <span>0-{{hotelPrice}}</span>
            </el-col>
          </el-row>
          <!-- 点击结束发送price回父组件 -->
          <div class="block">
            <el-slider v-model="hotelPrice" :max="4000" @change="priceSel"></el-slider>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <el-row class="selesterBolck">
          <!-- 等级 -->
          <el-col :span="6" class="optBox">
            <span class="demonstration">住宿等级</span>
            <el-select
              v-model="hotellevel"
              multiple
              collapse-tags
              style="border:none"
              placeholder="请选择"
              size="mini"
              @change="levelChanges"
            >
              <el-option
                v-for="item in hotellevelInfo"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <!-- 类型 -->
          <el-col :span="6" class="optBox">
            <span class="demonstration">住宿类型</span>
            <el-select
              v-model="hoteltype"
              multiple
              collapse-tags
              style="border:none"
              placeholder="请选择"
              size="mini"
              @change="typeChanges"
            >
              <el-option
                v-for="item in hoteltypeInfo"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <!-- 设施 -->
          <el-col :span="6" class="optBox">
            <span class="demonstration">酒店设施</span>
            <el-select
              v-model="hotelasset"
              multiple
              collapse-tags
              style="border:none"
              placeholder="请选择"
              size="mini"
              @change="assetChanges"
            >
              <el-option
                v-for="item in hotelassetInfo"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <!-- 品牌 -->
          <el-col :span="6" class="optBox" style="border-right:0">
            <span class="demonstration">酒店品牌</span>
            <el-select
              v-model="hotelbrand"
              multiple
              collapse-tags
              style="border:none"
              placeholder="请选择"
              size="mini"
              @change="brandChanges"
            >
              <el-option
                v-for="item in hotelbrandInfo"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hotelPrice: 4000,
      hotellevelInfo: [
        {
          value: "1",
          label: "1星"
        },
        {
          value: "2",
          label: "2星"
        },
        {
          value: "3",
          label: "3星"
        },
        {
          value: "4",
          label: "4星"
        },
        {
          value: "5",
          label: "5星"
        }
      ],
      hoteltypeInfo: [
        {
          value: "1",
          label: "经济型"
        },
        {
          value: "2",
          label: "舒适型"
        },
        {
          value: "3",
          label: "高档型"
        },
        {
          value: "4",
          label: "豪华型"
        },
        {
          value: "5",
          label: "度假村"
        },
        {
          value: "6",
          label: "公寓式酒店"
        }
      ],
      hotelassetInfo: [
        {
          value: "1",
          label: "WIFI"
        },
        {
          value: "2",
          label: "热水壶"
        },
        {
          value: "3",
          label: "吹风机"
        },
        {
          value: "4",
          label: "外币兑换服务"
        },
        {
          value: "5",
          label: "洗衣服务"
        },
        {
          value: "6",
          label: "电梯"
        }
      ],
      hotelbrandInfo: [],
      hotellevel: [],
      hoteltype: [],
      hotelasset: [],
      hotelbrand: []
    };
  },

  mounted() {
    this.$axios.get("/hotels").then(res => {
      //   console.log(res.data.data);
      var arr = [];
      res.data.data.map(e => {
        if (e.hotelbrand) {
          arr.push({
            value: e.hotelbrand.id,
            label: e.hotelbrand.name
          });
        }
        // console.log(this.hotelbrandInfo);
      });

      this.hotelbrandInfo = arr.filter(function(element, index, self) {
        return self.findIndex(el => el.value == element.value) === index;
      });
    });
  },
  methods: {
    //   发送价格
    priceSel() {
      this.$emit("changePrice", this.hotelPrice);
    },
    //   发送酒店等级
    levelChanges() {
      //   console.log(this.hotellevel);
      this.$emit("levelChange", this.hotellevel);
    },
    // 发送酒店类型
    typeChanges() {
      //   console.log(this.hotellevel);
      this.$emit("typeChange", this.hoteltype);
    },
    // 发送酒店设施
    assetChanges() {
      //   console.log(this.hotellevel);
      this.$emit("assetChange", this.hotelasset);
    },
    // 发送酒店品牌
    brandChanges() {
      //   console.log(this.hotellevel);
      this.$emit("brandChange", this.hotelbrand);
    }
  }
};
</script>
<style lang="less" scoped>
.filter_bar {
  margin-top: 20px;
  padding: 5px 0px;
  height: 84px;
  border: 1px solid rgb(211, 211, 211);

  .optBox {
    height: 70px;
    border-right: 1px solid rgb(211, 211, 211);
    padding: 5px 20px;
    font-size: 14px;
    color: #666;
    .demonstration {
      display: block;
      margin-bottom: 10px;
    }
  }
}
</style>