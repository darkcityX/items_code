
<template>
  <div id="app">
    <router-view/>
    <!--<div class="fix-menu">-->
    <!--<mt-palette-button-->
    <!--content="+"-->
    <!--@expand="main_log('expand')"-->
    <!--@expanded="main_log('expanded')"-->
    <!--@collapse="main_log('collapse')"-->
    <!--direction="lt"-->
    <!--class="pb"-->
    <!--:radius="80"-->
    <!--ref="target_1"-->
    <!--mainButtonStyle="color:#fff;background-color:#26a2ff;"-->
    <!--style="left:30px;">-->
    <!--<div class="my-icon-button indexicon icon-popup" @click.stop="sub_log(1)"><</div>-->
    <!--<div class="my-icon-button indexicon icon-popup" @click.stop="sub_log(2)">首页</div>-->
    <!--<div class="my-icon-button indexicon icon-popup" @click.stop="sub_log(3)">我的</div>-->
    <!--</mt-palette-button>-->
    <!--</div>-->
  </div>
</template>

<script>
import PublicJs from "../static/js/public";
import { PaletteButton } from "mint-ui";

window.V = PublicJs;
export default {
  name: "app",
  components: {
    "mt-palette-button": PaletteButton
  },
  watch: {
    "$route.path"() {
      // this.$refs.target_1.collapse()
    }
  },
  methods: {
    main_log(val) {
      console.log("main_log", val);
    },
    sub_log(val) {
      console.log("sub_log", val);
      switch (val) {
        case 1:
          this.$router.back();
          break;
        case 2:
          this.$router.push({ path: "/" });
          break;
        case 3:
          const ztData = localStorage.getItem("zt_data");
          if (!ztData) {
            this.$router.push({ path: "/login" });
          } else {
            this.$router.push({ path: "/public_personal_center" });
          }
          break;
        default:
          break;
      }
      this.$refs.target_1.collapse();
    }
  }
};
</script>

<style lang="scss">
@import "src/common/css/reset";
@import "src/common/css/common";

html,
body {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}

.fix-menu {
  position: fixed;
  bottom: 80px;
  right: 40px;
  z-index: 999;
  .mint-main-button {
    width: 60px;
    color: rgb(255, 255, 255);
    background-color: rgb(38, 162, 255);
    height: 60px;
    font-size: 25px;
    line-height: 60px;
  }
  .mint-sub-button-container {
    * {
      left: 10px;
      top: 20px;
    }
    .indexicon {
      width: 40px;
      color: rgb(255, 255, 255);
      background-color: rgb(38, 162, 255);
      height: 40px;
      font-size: 12px;
      line-height: 40px;
      border-radius: 20px;
    }
  }
}

// 替换mint ui 样式
.mint-loadmore-text {
  color: #fff;
  font-size: 0.186667rem;
}
</style>

