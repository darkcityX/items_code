<template>
  <div id="order" class="clearfix">
    <div class="mbx">
      <Row>
        <Col span="24">
          <Breadcrumb class="breadCrumbs">
            <BreadcrumbItem>原子联盟</BreadcrumbItem>
            <BreadcrumbItem>我的订单</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
    </div>
    <!-- 步骤条 -->
    <div class="order-content">
      <div class="Steps">
        <Steps :current="current">
          <Step title="提交订单"></Step>
          <Step title="确认订单"></Step>
          <Step title="支付成功"></Step>
        </Steps>
      </div>
      <div class="oreder-container" v-if="current != 3">
        <div class="order-ergdx">
          <h4>填写并核对订单信息</h4>
        </div>
        <div class="order-status">
          <!-- 收货人 -->
          <div class="consignee">
            <h5 class="clearfix">
              <i></i>
              <span>收货人信息</span>
              <Button
                v-if="consigneeList.length && current == 0"
                style="float:right"
                @click="$router.push('/accountSettingsPage/shippingAddress')"
              >管理收货人信息</Button>
            </h5>
            <div class="address-content" v-if="defaultAddress.consigneeName">
              <p>
                <span>收货人：</span>
                {{defaultAddress.consigneeName}}
              </p>
              <p>
                <span>联系方式：</span>
                {{defaultAddress.consigneeMobile}}
              </p>
              <p>
                <span>地址：</span>
                {{defaultAddress.province}} {{defaultAddress.city}} {{defaultAddress.area}}
              </p>
              <p>
                <span>详细地址：</span>
                {{defaultAddress.addressDetail}}
              </p>
            </div>
            <!-- 新加地址 -->
            <div class="add_Address" v-if="!consigneeList.length || !defaultAddress.consigneeName">
              <button @click="$router.push('/accountSettingsPage/shippingAddress')">
                <img src="../assets/images/dizhi_tianjia.png" alt>
                <p>添加新地址</p>
              </button>
            </div>
          </div>
          <!-- 订单清单 -->
          <div class="order-details">
            <h5>
              <i></i>
              <span>订单清单</span>
            </h5>
            <div class="productList">
              <cart :productList="cartLists" :currentDis="current" :orderStatus='orderStatus' :flag="false"/>
            </div>
          </div>
          <!-- 配送方式 -->
          <div class="order-express">
            <h5>
              <i></i>
              <span>配送方式</span>
            </h5>
            <p>默认快递</p>
          </div>
          <!-- 支付方式 -->
          <div class="order-purchase" v-if="current == 1">
            <h5>
              <i></i>
              <span>支付方式</span>
            </h5>
            <!-- 支付 -->
            <ul>
              <li v-for="(item,index) in purchase_status" :key="index">
                <Button
                  @click="tabTrans(index)"
                  :class="{active : item.class == tabFlag}"
                >{{item.type}}</Button>
              </li>
            </ul>
            <!-- <p>默认快递</p> -->
          </div>
        </div>
      </div>
      <div class="oreder-container" v-if="current == 3">
        <div class="order-success">
          <div class="successpay">
            <div class="successIcon">
              <img src="../assets/images/chenggong@2x.png" alt>
            </div>
            <div class="successText">
              <p class="success-big">支付成功</p>
              <p>
                实付
                <span>
                  <i>￥</i>
                  {{payPrice}}
                </span>
              </p>
            </div>
          </div>
          <p class="text-msg">
            恭喜您获得奖励
            <span>{{getYZB}}</span>枚原子币
          </p>
          <div class="success-btn">
            <Button type="primary" @click="$router.push({path:'/myProduct/all_product',query:{orderStatus:2}})">查看订单</Button>
            <Button @click="$router.push('/home')">返回首页</Button>
          </div>
        </div>
      </div>
    </div>
    <div class="price-container" v-if="current != 3">
      <div class="Allprice">
        <p>
          应付总额：
          <span>
            <i>￥</i>
            {{payZE}}
          </span>
        </p>
      </div>
      <p v-if="current == 1" style="margin-bottom:20px;">
        支付方式：
        <span>{{purchase_status[tabFlag].type}}</span>
      </p>
      <Button v-if="current == 0" type="primary" @click="next">提交订单</Button>
      <Button v-if="current == 1" type="primary" @click="pay">支付</Button>
    </div>
    <!-- 支付弹出层 -->
    <Modal v-model="isZf" @on-ok="isPay" @on-cancel="noPay" title="打开微信扫一扫进行支付" width="300">
      <p style="text-align:center;">
        <qrcode ref="qrcode" :options="{ width: 200 }"></qrcode>
        <p style="text-align:center">扫码付款后点击“确定”进入下一步</p>
      </p>
    </Modal>
  </div>
</template>

<script>
import cart from "../components/CartList";
// 微信支付二维码
import VueQrcode from "@chenfengyuan/vue-qrcode";
export default {
  name: "order",
  data() {
    return {
      current: 0,
      cartLists: [],
      consigneeList: [],
      defaultAddress: {},
      purchase_status: [
        { type: "微信支付", class: 0 },
        { type: "支付宝支付", class: 1 }
      ],
      tabFlag: 0,
      orderId: 0,
      isZf: false,
      payPrice: "",
      getYZB: "",
      payZE:0,
      orderStatus:''
    };
  },
  methods: {
    // 提交订单
    next() {
      let a = 0,
        productMapList = [],
        shoppingCartIdList = [];
      
      this.cartLists.forEach(el => {
        a += el.product.productPrice * el.shoppingCart.productNum;
        // 商品网数组里添加
        productMapList.push({
          productId: el.product.productId,
          productNum: el.shoppingCart.productNum
        });

        // 购物车id数组添加
        shoppingCartIdList.push(el.shoppingCart.shoppingCartId)
      });

      this.payZE = a;  // 给总价格赋值
      
      // 判断是购物车下单还是直接购买
      
      if (this.$route.params.isCart) {   // 购物车订单
        // 提交购物车订单
        this.$axios
          .post("/api/shoppingCart/placeOrderByCart", {
            productMapList,
            totalPrice: a,
            consigneeId: this.defaultAddress.consigneeId,
            shoppingCartIdList,
          })
          .then(res => {
            if (res.orderInfo.transactionOrder.orderId) {
              // 提示
              this.$Message.success({
                content: "提交订单成功",
                duration: 3,
                closable: true
              });
              this.orderId = res.orderInfo.transactionOrder.orderId;
            }

            if (this.current == 3) {
              this.current = 0;
            } else {
              this.current += 1;
            }
          });
      }else {
        // 提交非购物车订单
        this.$axios
          .post("/api/transactionOrder/placeOrder", {
            productMapList,
            totalPrice: a,
            consigneeId: this.defaultAddress.consigneeId
          })
          .then(res => {
            if (res.orderInfo.transactionOrder.orderId) {
              // 提示
              this.$Message.success({
                content: "提交订单成功",
                duration: 3,
                closable: true
              });
              this.orderId = res.orderInfo.transactionOrder.orderId;
            }

            if (this.current == 3) {
              this.current = 0;
            } else {
              this.current += 1;
            }
          });
      }
    },
    // 支付类型切换tab
    tabTrans(index) {
      this.tabFlag = index;
    },
    // 开始支付
    pay() {
      if (!this.tabFlag) {   // 微信支付
        this.$axios
          .post("/api/transactionOrder/wechatPrePayForPC", {
            orderId: this.orderId
          })
          .then(res => {
            this.isZf = true;

            this.$nextTick(e => {
              this.$refs.qrcode.value = res.result.code_url;
            });
          });
      } else {      // 支付宝支付
        alert("支付宝支付暂未开放哦~");
      }
    },
    // 验证是否支付成功
    isPay() {
      this.$axios
        .post("/api/transactionOrder/checkIfOrderPay", {
          orderId: this.orderId
        })
        .then(res => {
          if (res.awardAtoshiNumber) {
            this.payPrice = res.orderAmount;
            this.getYZB = res.awardAtoshiNumber;
            this.current = 3;
          }
        })
        .catch(e => {
          this.$Message.error({
            content: "未完成支付...",
            duration: 3,
            closable: true
          });
        });
    },
    noPay() {
      this.$Message.error({
        content: "未完成支付...",
        duration: 3,
        closable: true
      });
    }
  },
  components: {
    cart,
    qrcode: VueQrcode
  },
  created() {
    let routerDatas = this.$route.params;
    
    // 点击付款按钮进来的
    if (routerDatas.type == 2) {
      // 设置支付页面
      this.current = 1;
      
      // 设置默认地址
      this.defaultAddress = routerDatas.cartList.consignee 

      // 给地址的数组添加数据
      this.consigneeList.push(routerDatas.cartList.consignee)

      // 遍历数组添加对象
      routerDatas.cartList.orderItems.map((el,index) => {
        this.orderId = el.orderItem.orderId
        this.payZE += el.orderItem.productNum * el.product.productPrice
        return Object.assign(el,{shoppingCart:{productNum:el.orderItem.productNum}})       
      });

      this.cartLists = routerDatas.cartList.orderItems  // 赋值商品

    }else {
      console.log(this.$route.params.isCart);
      // 正常进来的
      this.orderStatus =  this.$route.params.status
      
      this.cartLists =
        JSON.parse(sessionStorage.cartList) || this.$route.params.cartList;

      let num = Number(this.payZE);

      this.cartLists.forEach(el => {
        num += el.product.productPrice * el.shoppingCart.productNum
      })
      
      this.payZE = num;

      this.$axios.post("/api/consignee/listConsignee").then(res => {
        this.consigneeList = res.consigneeList;

        res.consigneeList.forEach(el => {
          if (el.isDefault == 1) {
            this.defaultAddress = el;
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="less">
#order {
  width: 1200px;
  margin: 0 auto 40px;
  overflow: hidden;
  text-align: left;
  .mbx {
    margin: 10px 0;
  }
  .order-content {
    margin: 0 0 50px;
    width: 1200px;
    overflow: hidden;
    font-size: 14px;
    color: #333;
    background-color: #fff;
    .Steps {
      width: 100%;
      margin-left: 12%;
      padding: 80px 0;
    }
  }
  .oreder-container {
    width: 100%;
    box-sizing: border-box;
    padding: 0 40px;
    .order-ergdx {
      h4 {
        font-size: 16px;
        color: #666;
      }
      padding-bottom: 30px;
    }
    .order-status {
      .consignee,
      .order-details,
      .order-express,
      .order-purchase {
        border-top: 1px solid #ccc;
        padding: 41px 0 29px;
        h5 {
          height: 32px;
          font-size: 0;
          i {
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
            width: 2px;
            height: 16px;
            background-color: #00a0ea;
          }
          span {
            font-size: 16px;
            color: #222222;
            vertical-align: middle;
            font-weight: bold;
          }
        }
        .add_Address {
          margin-top: 30px;
          height: 160px;
          button {
            display: inline-block;
            width: 240px;
            height: 100%;
            background-color: transparent;
            border: 1px solid #eee;
            border-radius: 4px;
            outline: none;
            cursor: pointer;
            vertical-align: bottom;
            img {
              display: block;
              width: 38px;
              height: 38px;
              margin: 20px auto;
            }
            p {
              font-size: 14px;
              display: block;
              color: #222;
              margin: 0 auto;
            }
          }
        }
      }
      .order-details {
        .productList {
          margin-top: 30px;
          #carList {
            width: 100%;
          }
        }
      }
      .order-express {
        padding-bottom: 50px;
        p {
          margin: 30px 0 0 10px;
        }
      }
      .consignee {
        p {
          line-height: 30px;
          color: #222;
          span {
            display: inline-block;
            width: 70px;
            color: #666;
          }
        }
      }
    }
    .order-success {
      width: 800px;
      margin: 0 auto;
      text-align: center;
      .successpay {
        margin-top: 40px;
        .successIcon {
          display: inline-block;
          width: 60px;
          height: 60px;
          margin: 0 auto;
          vertical-align: middle;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .successText {
          margin-left: 20px;
          display: inline-block;
          vertical-align: middle;
          text-align: left;
          .success-big {
            font-size: 24px;
            color: #333;
            margin-bottom: 12px;
          }
        }
      }
      .text-msg {
        margin: 61px auto 80px;
        span {
          font-size: 24px;
          color: #ff6600;
          padding: 0 10px;
          font-weight: bold;
        }
      }
      .success-btn {
        text-align: center;
        padding-bottom: 219px;
        button {
          margin: 0 50px;
          width: 160px;
          height: 50px;
          font-size: 16px;
        }
      }
    }
  }
  .price-container {
    float: right;
    .Allprice {
      margin-bottom: 20px;
      p {
        font-size: 14px;
        color: #333;
        span {
          i {
            font-size: 14px;
            color: #ea4d00;
          }
          color: #ea4d00;
          font-size: 24px;
          font-weight: bold;
        }
      }
    }
    button {
      width: 160px;
      height: 50px;
      font-size: 16px;
    }
  }
  .order-purchase {
    ul {
      margin-top: 31px;
      li {
        display: inline-block;
        margin-right: 40px;
        button {
          width: 140px;
          height: 50px;
        }
      }
    }
  }
}
</style>
<style>
body {
  background-color: #f5f5f5;
}
.ivu-steps .ivu-steps-tail > i {
  height: 5px;
  border-radius: 9px;
}

.order-purchase .active {
  position: relative;
}
.order-purchase .active::after {
  content: "";
  width: 20px;
  height: 20px;
  background: url(../assets/images/zhifufangshi.png) bottom right no-repeat;
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>

