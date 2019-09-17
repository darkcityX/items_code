<template>
  <div id="increaseRewards">
    <!-- 1-1、提高奖励页面 -->
    <div class="banner">
      <img src="../../assets/images/tigaojiangli_banner.jpg" alt>
    </div>
    <div class="rewards-content">
      <div class="content-title">
        <h5>升级方式</h5>
        <i></i>
      </div>
      <div class="rewards-sele">
        <p class="rewards-title">一.增加自己参与金额，获取原子币</p>
        <p>
          <!-- 1 -->
          <i>①</i>
          <span>
            <router-link to>币币兑换</router-link>
          </span>
          <!-- 2 -->
          <i>②</i>
          <span>
            <router-link to="/home">原子恋商城</router-link>
          </span>
        </p>
        <p class="rewards-title">二.增加团队人数</p>
        <p class="selsect">
          <router-link to="/AlliancePage/myInvitation">点击分享邀请码</router-link>
        </p>
      </div>
      <div class="rewards-sj">
        <div>
          <p>1.通过币币兑换、原子恋商城获得原子币就能升级；</p>
          <p>2.团队业绩做的越高，下属人越多，升级越快；</p>
          <p>
            以上两点两手都抓，两手都硬。阅读
            <span class="selsect">
              <router-link to="/AlliancePage/rewardRules">详细奖励规则</router-link>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "increaseRewards",
  data() {
    return {};
  }
};
</script>

<style lang="less">
@import "../../common/css/mixin.less";
#increaseRewards {
  padding-bottom: 100px;
  .banner {
    width: 100%;
    height: 220px;
    margin-bottom: 50px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .rewards-content {
    .content-title {
      margin-bottom: 40px;
      position: relative;
      h5 {
        font-size: 16px;
        color: #222;
        width: 100px;
        background-color: #fff;
        margin: 0 auto;
        position: relative;
        z-index: 1;
      }
      i {
        position: absolute;
        width: 140px;
        height: 2px;
        background-color: #00a0ea;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .rewards-sele {
      text-align: left;
      width: 430px;
      margin: 0 auto;
      font-size: 14px;
      .rewards-title {
        margin-bottom: 20px;
      }
      span,
      .selsect {
        a {
          cursor: pointer;
          display: inline-block;
          color: #00a0ea;
          text-decoration: underline;
          margin-right: 99px;
          margin-bottom: 40px;
        }
      }
      i {
        display: inline-block;
        text-indent: 20px;
      }
      .selsect {
        text-indent: 20px;
      }
    }
    .rewards-sj {
      margin: 30px auto 0;
      width: 430px;
      height: 101px;
      .bgImg("../../assets/images/jiangli_miaozhao.png", contain);
      div {
        padding: 20px 0 0 30px;
        text-align: left;
        p {
          line-height: 24px;
          font-size: 14px;
          .selsect {
            color: #00a0ea;
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>