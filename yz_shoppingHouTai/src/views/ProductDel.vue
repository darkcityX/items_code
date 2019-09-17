<template>
  <div id="productDel">
    <div class="mbx">
      <Row>
        <Col span="24">
          <Breadcrumb class="breadCrumbs">
            <BreadcrumbItem>原子联盟</BreadcrumbItem>
            <BreadcrumbItem>产品信息</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
    </div>
    <section class="container">
      <!-- 轮播图和产品信息 -->
      <div class="imgAndDetail">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in Productdels.productImgs" :key="index">
              <img :src="item.productImg" :alt="item.productImgId">
            </div>
          </div>
          <!-- Add Arrows -->
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
        <div class="product-details">
          <div class="product-names">
            <h2>{{Productdels.product.productName}}</h2>
            <p>{{Productdels.product.productDescription}}</p>
          </div>
          <div class="product-price">
            <p>
              价格：
              <span>
                <i>￥</i>
                {{Productdels.product.productPrice}}
              </span>
            </p>
          </div>
          <div class="product-num">
            <span>数量：</span>
            <p>
              <button @click="btnAdd ">+</button>
              <input type="text" v-model="productsNum" @blur="blurInputs">
              <button @click="btnJianjian">-</button>
            </p>
          </div>
          <div class="product-sub">
            <Button type="primary" ghost @click="addCart">加入购物车</Button>
            <Button type="primary" @click="gotoDm()">立即购买</Button>
            <button class="btnFx" @click="isShow = true">
              <img src="../assets/images/xiangqing_fenxiang.png" alt>
            </button>
          </div>
        </div>
      </div>
      <div class="product-dir">
        <h3>商品介绍</h3>
      </div>
    </section>
    <!-- 分享对话框 -->
    <Modal v-model="isShow">
      <div class="numOne">
        <div class="textAndUrl">
          <p>
            方式一：
            <span>复制以下链接分享给小伙伴</span>
          </p>
          <input ref="copyUrls" type="text" v-model="CopyURL">
        </div>
        <div class="copyText">
          <Button type="primary" @click="copyingURL">复制</Button>
        </div>
      </div>
      <div class="numTwo">
        <p>
          方式二：
          <span>让小伙伴扫描以下二维码</span>
        </p>
        <div class="rwm-Box">
          <qrcode :value="CopyURL" tag="img"></qrcode>
          <!-- <img :src="rwmURL" alt> -->
        </div>
      </div>
      <p>注：如果小伙伴购买产品，根据你的销售业绩可获得8%-30%的奖励和抽奖奔驰、特斯拉的机会，详情请点开
        <router-link to="/AlliancePage/rewardRules">奖励规则</router-link>
      </p>
      <div slot="footer">
        <span></span>
      </div>
    </Modal>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import VueQrcode from "@chenfengyuan/vue-qrcode";
export default {
  name: "productDel",
  data() {
    return {
      Productdels: {},
      productsNum: "1",
      isShow: false,
      CopyURL: window.location.href
    };
  },
  components:{
    'qrcode': VueQrcode
  },
  methods: {
    blurInputs() {
      if (this.productsNum <= 0) {
        this.productsNum = "1";
        alert("最小值为1");
      }
    },
    btnAdd() {
      this.productsNum++;
    },
    btnJianjian() {
      this.productsNum--;

      if (this.productsNum <= 0) {
        this.productsNum = "1";
        alert("最小值为1,再减几把干你");
      }
    },
    copyingURL() {
      let val = this.$refs.copyUrls;
      val.select();
      document.execCommand("Copy");
      this.$Message.success({
        content: "复制成功",
        duration: 10,
        closable: true
      });
    },
    addCart() {
      console.log(this.productsNum);
      this.$axios
        .post("/api/shoppingCart/addProductToCart", {
          productId: this.Productdels.product.productId,
          productNum: this.productsNum
        })
        .then(res => {
          this.$router.push("/cart");
        });
    },
    gotoDm() {
      // 把数据传给我的订单页
      let shoppingCart = {
        productNum: this.productsNum
      };

      let { product } = this.Productdels;

      product.totalPrice = 0;

      this.$router.push({
        name: "order",
        params: { cartList: [{ product, shoppingCart }], status: "order" }
      });

      sessionStorage.cartList = JSON.stringify([{ product, shoppingCart }]);
    }
  },
  created() {
    let product =
      JSON.parse(this.$route.query.product) || JSON.parse(sessionStorage.product);
    this.Productdels = product;
  },
  mounted() {
    new Swiper(".swiper-container", {
      autoplay: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
  }
};
</script>

<style scoped lang="less">
@import "../common/css/mixin.less";
#productDel {
  width: 1200px;
  margin: 0 auto;
  text-align: left;
  .mbx {
    margin: 10px 0;
  }
  .container {
    background-color: #fff;
    .imgAndDetail {
      display: flex;
      box-sizing: border-box;
      padding: 80px 0 76px;
      .swiper-container {
        flex: 1;
        height: 383px;
        margin: 0 40px;
        .swiper-slide {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
      .product-details {
        flex: 0 519px;
        border-left: 1px solid #ccc;
        box-sizing: border-box;
        padding: 0 80px;
        div {
          color: #333;
          border-bottom: 1px solid #eee;
        }
        .product-names {
          h2 {
            font-size: 24px;
            margin-bottom: 12px;
          }
          p {
            font-size: 14px;
            color: #666;
            padding-bottom: 21px;
          }
        }
        .product-price {
          margin-top: 40px;
          font-size: 14px;
          padding-bottom: 20px;
          span {
            margin-left: 10px;
            font-size: 18px;
            font-weight: bold;
            display: inline-block;
            i {
              font-weight: 400 !important;
              font-size: 14px;
              margin: 0;
              display: inline-block;
            }
          }
        }
        .product-num {
          padding: 40px 0 20px;
          span {
            display: inline-block;
            margin-right: 10px;
          }
          p {
            border: 1px solid #ccc;
            display: inline-block;
            button {
              width: 24px;
              height: 24px;
              border: 0;
              background-color: #f5f5f5;
              outline: none;
              cursor: pointer;
            }
            input {
              display: inline-block;
              box-sizing: border-box;
              text-align: center;
              width: 30px;
              font-size: 14px;
              border: 0;
              outline: none;
            }
          }
        }
        .product-sub {
          margin-top: 60px;
          font-size: 0;
          border: 0;
          button {
            width: 160px;
            height: 60px;
            font-size: 16px;
          }
          button:nth-of-type(2) {
            margin-left: 10px;
          }
          .btnFx {
            width: 20px;
            height: 20px;
            border: 0;
            background-color: transparent;
            outline: none;
            cursor: pointer;
            margin-left: 4px;
            vertical-align: middle;
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }
        }
      }
      // 轮播图按钮
      .swiper-button-next {
        .bgImg("../../assets/images/xiangqing_you_pre.png", cover);
      }
      .swiper-button-prev {
        .bgImg("../../assets/images/xiangqing_zuo_pre.png", cover);
      }
    }
    .product-dir {
      border-top: 10px solid #f5f5f5;
      box-sizing: border-box;
      padding: 38px 100px;
      height: 300px;
      h3 {
        font-size: 20px;
        color: #333;
      }
    }
  }
}
</style>

<style>
/* 覆盖view 的样式 */
body {
  background-color: #f5f5f5;
}
.ivu-modal-content {
  width: 740px;
  box-sizing: border-box;
  padding: 60px 130px;
}
.ivu-modal-footer {
  border: 0;
}
.numOne,
.numTwo {
  font-size: 16px;
}
.textAndUrl span,
.numTwo span {
  font-size: 14px;
}
.textAndUrl input {
  border: 0;
  border-bottom: 1px solid #666;
  padding-bottom: 5px;
  outline: none;
  display: block;
  margin: 18px 0 0 70px;
  font-size: 14px;
  width: 229px;
}
.copyText,
.textAndUrl {
  display: inline-block;
}
.copyText button {
  font-size: 16px;
  width: 120px;
  height: 44px;
  margin-left: 50px;
}

.numTwo {
  margin-top: 41px;
}
.numTwo .rwm-Box {
  width: 230px;
  height: 230px;
  margin: 0 0 39px 60px;
}

.numTwo .rwm-Box img {
  width: 100%;
  height: 100%;
}

/* iview */
.ivu-modal-body {
  padding: 0;
}
</style>