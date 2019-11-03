<template>
  <div class="order">
    <div class="order_main">
      <OrderForm :ticket="ticket" @countPrice="countPrice"/>
    </div>
    <div class="order_aside">
      <OrderBill :price="price" :ticket="ticket" />
    </div>
  </div>
</template>

<script>
import OrderForm from "@/components/air/OrderForm";
import OrderBill from "@/components/air/OrderBill";
export default {
  data() {
    return {
      ticket: {},
      // 机票的总价
      price: 0
    };
  },
  components: {
    OrderForm,
    OrderBill
  },
  mounted() {
    console.log(this.$route.query);
    let seatXid = this.$route.query.seatXid;
    let id = this.$route.query.id;
    this.$axios
      .get(`/airs/${id}`, { params: { seat_xid: seatXid } })
      .then(res => {
        console.log(res);
        this.ticket = res.data;
      });
  },
  methods: {
    countPrice(price) {
      this.price = price;
    }
  }
};
</script>

<style lang='less' scoped>
.order {
  width: 1000px;
  margin: 0 auto;
  display: flex;
}
.order_main {
  flex: 2;
}
.order_aside {
  flex: 1;
}
</style>