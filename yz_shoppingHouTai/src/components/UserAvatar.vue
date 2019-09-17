<template>
  <div id="userAvatar">
    <Card class="mainLeftTop" :bordered="false">
      <div class="userInfo">
        <p class="avatar">
          <img :src="userInfo.userHead">
        </p>
        <p>{{userInfo.userName}}</p>
        <Progress class="progressBar" :percent="userInfo.userIntegral / 10000">
          <!-- {{userInfo.userIntegral}} -->
          <Icon type="checkmark-circled"></Icon>
        </Progress>
        <router-link to="/AlliancePage/increaseRewards">如何升级?</router-link>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "userAvatar",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userInfo: "getUser"
    })
  }
};
</script>

<style scoped lang="less">
// 左侧头部区域【头像、进度条、链接】
.mainLeftTop {
  .userInfo {
    .avatar {
      border-radius: 14px;
      overflow: hidden;
      width: 70px;
      height: 70px;
      margin: 0 auto 10px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .progressBar {
      margin: 5px 0;
      font-size: 0;
    }
    .ivu-progress {
      .ivu-progress-text {
        display: none;
      }
    }
    a {
      display: block;
      text-align: right;
    }
  }
}
</style>