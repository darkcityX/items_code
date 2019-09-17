<template>
  <div id="PorductList">
    <!-- 订单编号 -->
    <div class="product-header clearfix">
      <span class="product-num">订单编号：{{productOrder.orderId}}</span>
      <span class="product-time">{{OrderTime}}</span>
    </div>
    <!-- 订单详情 -->
    <div class="clearfix" style="display:flex">
      <div class="productOrder">
        <div class="product-details" v-for="(item,index) in productList" :key="index">
          <!-- 产品图片 -->
          <div class="product-img">
            <img :src="item.product.productImg" alt>
          </div>
          <!-- 产品标签 -->
          <div class="prodcut-label">
            <ul>
              <li>订单商品：{{item.product.productName}}</li>
              <li class="clearfix">
                <span>订单数量：{{item.orderItem.productNum}}</span>
                <span class="fr">订单价格：{{item.orderItem.productNum * item.product.productPrice}}</span>
              </li>
              <li>订单状态：{{productOrder.orderStatus == 1 ? '待支付' : productOrder.orderStatus == 2 ? '已完成' : productOrder.orderStatus == 3 ? '过期订单': '异常订单'}}</li>
              <li v-if="expressNumber">
                物流单号：{{expressNumber}} &nbsp;&nbsp;&nbsp;&nbsp; {{expressCompany}}
                <a
                  href="javascript:void(0);"
                >快递查询网址</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 产品按钮 -->
      <div class="product-btn">
        <!-- <button class="lookGetyzb">查看获得原子币</button> -->
        <button class="pro-fk" v-if="productStatus == 1" @click="gotoPay">付款</button>
        <p class="price" v-if="productStatus == 1"></p>
        <button class="zcgm" v-if="productStatus == 2 || productStatus == 3" @click="isGm">再次购买</button>
      </div>
    </div>
  </div>
</template>

<script>
import transTime from "@/common/js/TimeStamp";
export default {
  name: "PorductList",
  props: {
    productOrder: Object,
    time: String,
    productList: Array,
    // 按钮状态
    lookYzb: Boolean,
    productStatus: Number,
    // 快递状态
    expressCompany: String,
    expressNumber: String,
    // 订单数据
    orderData:Object
  },
  computed: {
    OrderTime() {
      return transTime(this.time);
    }
  },
  methods:{
    // 付款的页面
    gotoPay(){
      this.$router.push({name:'order',params:{cartList:this.orderData,type:2}})
      sessionStorage.cartList = JSON.stringify(this.orderData)
      sessionStorage.isPay = 2;
    },
    // 再次购买的页面
    isGm(){
      this.orderData.orderItems.map(el => {
        el.product.totalPrice = el.product.productPrice * el.orderItem.productNum;
        return Object.assign(el,{shoppingCart:{productNum:el.orderItem.productNum}})
      })
      sessionStorage.cartList = JSON.stringify(this.orderData.orderItems)
      this.$router.push({name:'order',params:{cartList:this.orderData.orderItems,status:'order'}})
    }
  }
};
</script>

<style scoped lang="less">
#PorductList {
  text-align: left;
  box-sizing: border-box;
  padding: 0 30px;
  border-bottom: 8px solid #f5f5f5;
  .product-header {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    span {
      font-size: 14px;
      color: #333;
    }
    .product-time {
      float: right;
    }
  }
  .productOrder {
    width: 80%;
    float: left;
    vertical-align: middle;
    .product-details:nth-last-child(1) {
      border-bottom: 0;
    }
    .product-details {
      border-bottom: 1px solid #eee;
      border-right: 1px solid #eee;
      width: 100%;
      vertical-align: middle;
      display: inline-block;
      padding: 50px 0;
      .product-img {
        display: inline-block;
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .prodcut-label {
        margin-left: 39px;
        display: inline-block;
        ul {
          li {
            margin-bottom: 10px;
            width: 400px;
            .fr {
              display: inline-block;
              float: right;
            }
          }
        }
      }
    }
  }
  .product-btn {
    width: 20%;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p,
    button {
      display: block;
      cursor: pointer;
    }
    button {
      outline: none;
      width: 130px;
      height: 44px;
      border: 0;
      background-color: #00a0ea;
      border-radius: 4px;
      color: #fff;
      font-size: 14px;
      margin: 10px 0;
    }
    .lookGetyzb {
      background-color: transparent;
      border: 1px solid #757575;
      color: #757575;
    }
  }
}
</style>