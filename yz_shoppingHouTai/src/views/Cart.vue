<template>
  <div id="Cart">
    <!-- 面包屑 -->
    <div class="mbx">
      <Row>
        <Col span="24">
          <Breadcrumb class="breadCrumbs">
            <BreadcrumbItem>原子联盟</BreadcrumbItem>
            <BreadcrumbItem>购物车</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
    </div>
    <div class="cartList">
      <cart
        :flag="true"
        @getCheckStatus="getStatus($event)"
        :productList="cartLists.shoppingCartList"
        @delCart="delCarts($event)"
      />
    </div>
    <div class="computed clearfix">
      <span class="checkbox">
        <Checkbox v-model="selectAllStu" @on-change="selectAll">全选</Checkbox>
      </span>
      <span class="all_del" @click="allDelete">删除</span>
      <div class="all_price">
        <p>
          合计（不含运费）：
          <span>
            <i>￥</i>
            {{allPrice}}
          </span>
        </p>
        <button @click="gotoOrder">结算</button>
      </div>
    </div>
  </div>
</template>

<script>
// 解决js小数计算流失精度的
Math.formatFloat = function(f, digit) {
  var m = Math.pow(10, digit);
  return parseInt(f * m, 10) / m;
};
import cart from "@/components/CartList";
export default {
  name: "Cart",
  data() {
    return {
      cartLists: [],
      allPrice: 0,
      selectAllStu: false,
      allProduct: [],
      editallPrice: 0
    };
  },
  methods: {
    // 删除公共方法
    delCarts({ index, shoppingCart: { shoppingCartId } }) {
      this.$axios
        .post("/api/shoppingCart/deleteProductInCart", { shoppingCartId })
        .then(res => {
          this.cartLists.shoppingCartList.splice(index, 1);
          this.allPrice = 0;
          this.$Message.success({
            content: "删除成功！",
            duration: 3,
            closable: true
          });
        });
    },
    // 全选
    selectAll(status) {
      let allPrice = 0; // 价格的根值

      if (status) {
        // 当点击全选按钮并且 status 为 true
        // 遍历把 checkStatus 都设置为true  并往数组里面添加数据
        this.cartLists.shoppingCartList.forEach(el => {
          el.shoppingCart.checkStatus = true;

          // 过滤新数里面有没有数据
          const arr = this.allProduct.filter(
            item => item.product.productId == el.product.productId
          );

          // 如果有数据就不添加  没有数据添加
          if (!arr.length) {
            this.allProduct.push(el);
          }

          // 计算总价格
          allPrice += el.product.productPrice * el.shoppingCart.productNum;
        });

        this.allPrice = allPrice.toFixed(2);
        this.editallPrice = allPrice.toFixed(2);
      } else {
        // 如果取消全选 那么就把所有的CheckBoxStatus 都设置为false 并清除数组中所有的值

        this.cartLists.shoppingCartList.forEach(el => {
          el.shoppingCart.checkStatus = false;
          this.allProduct.splice(0);
        });

        this.allPrice = 0;
        this.editallPrice = 0;
      }
    },
    // 子组件传过来的参数
    getStatus({ status, item }) {
      const isIndex = this.allProduct.findIndex(
        el => el.product.productId == item.product.productId
      );

      // 结果
      let numbers = item.product.totalPrice;

      if (status) {
        // 判断是不是选中状态 如果选中状态 就向数组里面添加数据
        this.allPrice = (Number(this.allPrice) + numbers).toFixed(2);
        this.allProduct.push(item);
      } else {
        // 判断是未选中状态 就向数组里面删除数据
        this.allPrice = (Number(this.allPrice) - numbers).toFixed(2);
        this.allProduct.splice(isIndex, 1);
      }
    },
    // 选择删除产品
    allDelete() {
      if (this.allProduct.length) {
        // 遍历调用删除接口
        this.allProduct.forEach((el, index) => {
          const delIndex = this.cartLists.shoppingCartList.findIndex(item => {
            return el.product.productId == item.product.productId;
          });
          this.delCarts({ delIndex, shoppingCart: el.shoppingCart });

          el.shoppingCart.checkStatus = false;
          this.selectAllStu = false;
        });
      } else {
        alert("没有可删除的数据");
      }
    },
    // 去 订单页
    gotoOrder() {
      if (this.allProduct.length) {
        this.$router.push({
          name: "order",
          params: { cartList: this.allProduct ,isCart:1},
        });
        sessionStorage.cartList = JSON.stringify(this.allProduct);
      } else {
        alert("还没有选择结算的商品哦");
      }
    }
  },
  components: {
    cart
  },
  created() {
    // 获取购物车数据
    this.$axios.post("api/shoppingCart/listProductInCart").then(res => {
      res.shoppingCartList.forEach(el => {
        el.shoppingCart.checkStatus = false;
        el.product.totalPrice = 0;
      });

      this.cartLists = res;
      console.log(res);
    });
  }
};
</script>

<style scoped lang="less">
#Cart {
  width: 1200px;
  margin: 0 auto 40px;
  text-align: left;
  .mbx {
    margin: 10px 0;
  }
  .computed {
    // position: fixed;
    // bottom: 80px;
    // left: 50%;
    // transform: translateX(-50%);
    margin: 50px 0;
    width: 1200px;
    line-height: 60px;
    font-size: 14px;
    color: #333;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    .checkbox {
      margin-left: 30px;
    }
    .all_del {
      margin-left: 40px;
      cursor: pointer;
    }
    .all_price {
      float: right;
      p,
      button {
        display: inline-block;
        cursor: pointer;
      }
      p {
        margin-right: 30px;
        span {
          font-size: 20px;
          color: #ea4d00;
          font-weight: bold;
          i {
            font-size: 14px;
          }
        }
      }
      button {
        width: 160px;
        height: 100%;
        background-color: #00a0ea;
        font-size: 18px;
        color: #fff;
        border: 0;
        outline: none;
      }
    }
  }
}
</style>