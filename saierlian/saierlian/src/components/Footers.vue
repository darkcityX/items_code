<template>
  <div class="footer">
    <!--<mt-tabbar v-model="selected" fixed>-->
    <!--<mt-tab-item v-for="(item,index) in tabs" :id="item.id" :key="index" >-->
    <!--<img slot="icon" :src="item.img_tab">-->
    <!--<span>{{item.name}}</span>-->
    <!--</mt-tab-item>-->
    <!--</mt-tabbar>-->
    <router-link tag="div" to="/" class="footer_li" active-class="active">
      <img v-show="route === '/'" src="../../static/img/sy2.png" alt="">
      <img v-show="route !== '/'" src="../../static/img/sy.png" alt="">
      <div :class="{textact:route === '/'}">首页</div>
      <div :class="{textact1:route !== '/'}">首页</div>
    </router-link>
    <router-link tag="div" to="/" class="footer_li" active-class="active">
      <img v-show="route === '/'" src="../../static/img/sy2.png" alt="">
      <img v-show="route !== '/'" src="../../static/img/sy.png" alt="">
      <div :class="{textact:route === '/'}">创新挖矿</div>
      <div :class="{textact1:route !== '/'}">创新挖矿</div>
    </router-link>
    <router-link tag="div" to="/" class="footer_li" active-class="active">
      <img v-show="route === '/'" src="../../static/img/sy2.png" alt="">
      <img v-show="route !== '/'" src="../../static/img/sy.png" alt="">
      <div :class="{textact:route === '/'}">币币交易</div>
      <div :class="{textact1:route !== '/'}">币币交易</div>
    </router-link>
    <router-link tag="div" to="/car" class="footer_li" active-class="active">
      <img v-show="route === '/car'" src="../../static/img/gwc2.png" alt="">
      <img v-show="route !== '/car'" src="../../static/img/gwc.png" alt="">
      <div :class="{textact:route === '/car'}">场外交易</div>
      <div :class="{textact1:route !== '/car'}">场外交易</div>
    </router-link>
    <router-link tag="div" to="/my" class="footer_li" active-class="active">
      <img v-show="route === '/my'" src="../../static/img/wd2.png" alt="">
      <img v-show="route !== '/my'" src="../../static/img/wd.png" alt="">
      <div :class="{textact:route === '/my'}">账户</div>
      <div :class="{textact1:route !== '/my'}">账户</div>
    </router-link>

  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  computed: {
    route() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/common/css/mixin";
$background: #FE4D7E;
$noact:#717B96;

.clearfix:before,
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.clearfix {
  zoom: 1;
}
.footer {
  z-index: 555;
  background-color: #131D3D;
  /*border-top: Rem(1) solid #20222D;*/
  box-shadow:0 0 Rem(2) rgba(32,34,45,0.09);
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: Rem(49);
  justify-content: space-around;
  text-align: center;
  padding-top: Rem(3);
  box-sizing: border-box;
  line-height: Rem(19);
  .footer_li {
    width: 33%;
    text-align: center;
    div {
      text-align: center;
      font-size: Rem(12);
      font-family: "PingFang-SC-Medium";
      color: $noact;
      margin-top:Rem(2);
    }
    img {
      /*text-align: center;
      display: inline-block;
      width: Rem(25);*/
      height: Rem(19);
      /*display: inline-block;*/
    }
    div.textact{
      color: $background;
    }
    div.textact1{
      color: $noact;
    }
  }
}
</style>
