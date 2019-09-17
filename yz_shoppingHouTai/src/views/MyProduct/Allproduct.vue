<template>
  <div id="all_product">
    <ul>
      <li v-for="(item,index) in orderInfoList" :key="index">
        <c-product
          :productOrder="item.transactionOrder"
          :time="item.transactionOrder.orderTime"
          :productList="item.orderItems"
          :productStatus="item.transactionOrder.orderStatus"
          :expressCompany="item.transactionOrder.expressCompany"
          :expressNumber="item.transactionOrder.expressNumber"
          :orderData="item"
        ></c-product>
      </li>
    </ul>
    <!-- 分页 -->
    <div class="totalPage">
      <Page :total="100" @on-change="goToPageNum"/>
    </div>
  </div>
</template>

<script>
import productTem from "@/components/ProductList";
export default {
  name: "all_product",
  data() {
    return {
      orderInfoList: []
    };
  },
  methods: {
    goToPageNum(val) {
      this.getProductList();
    },
    getProductList(orderStatus) {
      this.$axios
        .post("api/transactionOrder/listOrder", { orderStatus })
        .then(res => {
          console.log(res);
          this.orderInfoList = res.orderInfoList.reverse();
        });
    }
  },
  created() {
    this.$route.query.orderStatus
      ? this.getProductList(this.$route.query.orderStatus)
      : this.getProductList("");
  },
  watch: {
    $route(to, from) {
      to.query.orderStatus
        ? this.getProductList(to.query.orderStatus)
        : this.getProductList("");
    }
  },
  components: {
    "c-product": productTem
  }
};
</script>

<style scoped lang="less">
.totalPage {
  background-color: #f5f7f9;
  text-align: right;
  padding: 50px 0 80px;
}
</style>