<template>
  <ul id="carList">
    <li
      class="cartItem"
      :style="flag?'background-color:#fff;border-bottom:10px solid #f5f5f5;':'background-color:#f5f5f5;border-bottom:10px solid #fff;'"
      v-for="(item,index) in productList"
      :key="index"
    >
      <div v-if="flag" class="checkbox">
        <Checkbox v-model="item.shoppingCart.checkStatus" @on-change="listen(item,index,$event)"></Checkbox>
      </div>
      <div class="productDetails">
        <div class="productImg">
          <img :src="item.product.productImg" alt>
        </div>
        <div class="product">
          <span class="productName">
            商品名称：
            <span>{{item.product.productName}}</span>
          </span>
          <span class="productNum">
            数量：
            <span class="btn-input">
              <button :disabled="currentDis == 1" @click="reduction(index,item)">-</button>
              <input
                :disabled="currentDis == 1"
                type="text"
                ref="productNum"
                v-model="item.shoppingCart.productNum"
              >
              <button :disabled="currentDis == 1" @click="add(index,item)">+</button>
            </span>
          </span>
          <span class="price">
            价格：
            <span>
              <i>￥</i>
              <strong>{{item.product.productPrice}}</strong>
            </span>
          </span>
        </div>
        <div
          v-if="flag"
          class="del_product"
          @click="$emit('delCart',{index,shoppingCart:item.shoppingCart})"
        >
          <span>删除</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "cartList",
  props: {
    productList: Array,
    flag: Boolean,
    currentDis: Number,
    orderStatus: String
  },
  data() {
    return {
      reductionNum: 0
    };
  },
  methods: {
    reduction(index, item) {
      item.shoppingCart.productNum--;

      if (item.shoppingCart.productNum <= 0) {
        item.shoppingCart.productNum = 1;
        this.$Message.info({
          content: "数量不能小于1",
          duration: 3,
          closable: true
        });
      }
      if (item.shoppingCart.checkStatus || this.orderStatus == "order") {
        // 计算总价格
        item.product.totalPrice =
          item.product.productPrice * item.shoppingCart.productNum;

        this.productList[index] = item;
        var numjj = 0;

        this.productList.forEach(el => {
          if (el.shoppingCart.checkStatus || this.orderStatus == "order") {
            numjj += el.product.totalPrice;
          }
         
        });

        this.$parent.$data.payZE = numjj.toFixed(2);
        this.$parent.$data.allPrice = numjj.toFixed(2);

        if (numjj <= 0) {
          this.$parent.$data.payZE = 0;
          this.$parent.$data.allPrice = 0;
        }
      }
    },
    add(index, item) {
      item.shoppingCart.productNum++;

      if (item.shoppingCart.checkStatus || this.orderStatus == "order") {
        // 计算总价格
        item.product.totalPrice =
          item.product.productPrice * item.shoppingCart.productNum;

        this.productList[index] = item;

        var nums = 0;

        this.productList.forEach(el => {
          if (el.shoppingCart.checkStatus || this.orderStatus == "order") {
            nums += el.product.totalPrice;
          }
        });

        this.$parent.$data.allPrice = nums.toFixed(2);
        this.$parent.$data.payZE = nums.toFixed(2);

        this.reductionNum = nums.toFixed(2);
      }
    },
    // 点击单个checkbox 监听是否全选
    listen(item, index, status) {
      if (!status) {
        this.$parent.$data.selectAllStu = false;
      }

      const newArr = this.productList.filter((el, index) => {
        return el.shoppingCart.checkStatus == true;
      });

      if (newArr.length == this.productList.length) {
        this.$parent.$data.selectAllStu = true;
      } else {
        this.$parent.$data.selectAllStu = false;
      }

      // 计算总价格
      item.product.totalPrice =
        item.product.productPrice * item.shoppingCart.productNum;

      this.productList[index] = item;

      // 向父组件传值
      this.$emit("getCheckStatus", { item, index, status });
    }
  }
};
</script>

<style scoped lang="less">
#carList {
  width: 1200px;
  margin: 0 auto 10px;
  .cartItem {
    width: 100%;
    padding: 30px;
    height: 190px;
    display: flex;
    .checkbox {
      flex: 0 26px;
    }
    .productDetails {
      flex: 1;
      display: flex;
      .productImg {
        flex: 0 130px;
        height: 130px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .product {
        box-sizing: border-box;
        padding-top: 28px;
        margin-left: 30px;
        .productName {
          display: inline-block;
          width: 120px;
          color: #666666;
          font-size: 14px;
          span {
            color: #333;
          }
        }
        .productNum {
          margin-left: 150px;
          font-size: 14px;
          color: #666666;
          .btn-input {
            border: 1px solid #ccc;
            display: inline-block;
            button {
              cursor: pointer;
              width: 24px;
              height: 24px;
              border: 0;
              font-size: 16px;
              outline: none;
              background-color: #f5f5f5;
            }
            input {
              width: 30px;
              outline: none;
              border: 0;
              text-align: center;
              background: transparent;
            }
          }
        }
        .price {
          font-size: 14px;
          margin-left: 157px;
          color: #666;
          i {
            font-size: 14px;
            color: #666;
          }
          strong {
            font-weight: bold;
            font-size: 18px;
            color: #333;
          }
        }
      }
      .del_product {
        line-height: 120px;
        flex: 1;
        text-align: right;
        span {
          border-left: 1px solid #ccc;
          padding-left: 10px;
          margin-right: 20px;
          cursor: pointer;
        }
        align-items: right;
      }
    }
  }
}
</style>
<style>
body {
  background-color: #f5f5f5;
}
</style>
