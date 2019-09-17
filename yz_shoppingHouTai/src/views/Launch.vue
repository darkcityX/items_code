<template>
  <div id="Launch">
    <ul class="navlist">
      <li v-for="(item,index) in swiperList" :key="index">
        <div>{{item.content}}</div>
      </li>
    </ul>
    <!-- 用户选项 -->
    <div class="isUser">
      <p class="reading">阅读
        <router-link to="/home">详细奖励规则</router-link>
      </p>
      <div class="submit" @click="gotoHomePage">
        <Button type="primary">开启原子联盟</Button>
      </div>
      <div class="checkbox-isTy">
        <Checkbox v-model="single">同意
          <router-link to="/home">《原子链用户使用协议》</router-link>
        </Checkbox>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Launch",
  data() {
    return {
      swiperList: [
        { content: "A发邀请码给B,B发邀请码给C，C购买后，奖励B同时也奖励A。" },
        {
          content:
            "A发邀请码给B，B发给C，C到D，D…...形成一条线：A,B,C,D…XYZ这一条线上和旁边线的所有人都是你的团队，每个人做的业绩都是您团队的业绩。"
        },
        { content: "A发邀请码给B,B发邀请码给C，C购买后，奖励B同时也奖励A。" }
      ],
      single: false
    };
  },
  methods: {
    gotoHomePage() {
      if (this.single) {
        this.$router.push("/home");
      } else {
        this.$Message.error({
          content: "请同意后在进行下一步！",
          duration: 3,
          closable: true
        });
      }
    }
  },
  created() {}
};
</script>

<style scoped lang="less">
@import "../common/css/mixin.less";
#Launch {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  // 调用封装的bg
  .bgImg("../../assets/images/qidongye_bg.jpg", cover);
  .navlist {
    position: absolute;
    top: 55%;
    width: 100%;
    box-sizing: border-box;
    padding: 0 280px;
    display: flex;
    justify-content: space-around;
    cursor: pointer;
    li {
      width: 380px;
      height: 100px;
      div {
        margin: 0 auto;
        width: 100%;
        height: 100%;
        transition: 0.4s all;
        opacity: 0;
        box-sizing: border-box;
        padding: 20px;
        font-size: 14px;
        line-height: 20px;
        text-align: left;
        overflow: hidden;
      }
      div:hover {
        .bgImg("../../assets/images/qidongye_lunbo.png", cover);
        opacity: 1;
      }
    }
  }
  .isUser {
    position: absolute;
    bottom: 170px;
    left: 50%;
    transform: translateX(-50%);
    .reading {
      font-size: 14px;
      margin-bottom: 10px;
    }
    .submit {
      width: 260px;
      height: 60px;

      button {
        width: 100%;
        height: 100%;
        font-size: 18px;
        border-radius: 8px;
      }
    }
    .checkbox-isTy {
      margin-top: 10px;
    }
  }
}
</style>