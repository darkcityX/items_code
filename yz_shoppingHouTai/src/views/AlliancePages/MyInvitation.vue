<template>
  <div id="myInvitation">
    <!-- 1-1、我的邀请页面 -->
    <div class="fx-left">
      <div class="yzb-bg">
        <!-- 修改北京模板 -->
        <h4 class="titles">修改背景模板</h4>
        <div class="selsect">
          <Select style="width:288px;" placeholder="原子币背景" @on-change="getImgURL">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <!-- 修改邀请语 -->
        <h4 class="titles">修改邀请语</h4>
        <div class="selsect">
          <Input
            ref="inputs"
            v-model="userName"
            placeholder="你的好友XX邀请你加入原子联盟"
            clearable
            style="width: 230px"
          />
          <Button :disabled="!userName" type="primary" @click="isFenXiang">确认</Button>
        </div>
        <!-- 修改邀请语 -->
        <h4 class="titles">您的邀请码</h4>
        <div class="selsect">
          <input type="text" disabled placeholder="您的邀请码" :value="inviteCode" class="inputs-yqm">
          <Button type="primary" @click="copyInviteCode(inviteCode)">复制</Button>
        </div>
      </div>
      <Button type="primary" class="download" @click="downLoadImg">下载</Button>
      <input type="text" style="width:8px;height:8px;display:block;opacity:0;" ref="setCopy">
    </div>
    <!-- 右侧 -->
    <div class="fx-right">
      <div class="image-titles">
        <img src="../../assets/images/yaoqinghaibao.jpg" alt>
      </div>
      <div class="drawImg">
        <img :src="changeImg" alt>
      </div>
    </div>
    <!-- 分享对话框 -->
    <Modal v-model="isShow" width="360">
      <p slot="header" style="color:#333;text-align:center">
        <span>提示</span>
      </p>
      <p>您的专属海报已经生成，赶快分享给朋友们</p>
      <div slot="footer">
        <Button type="primary" size="large" @click="fenxiang">分享</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "myInvitation",
  data() {
    return {
      userName: "",
      inviteCode: "",
      isDisbled_ok: "",
      isShow: false,
      changeImg:
        "http://a.hiphotos.baidu.com/image/pic/item/5243fbf2b211931330751d8b6b380cd791238dd3.jpg",
      cityList: [
        {
          label: "图片一",
          value:
            "http://a.hiphotos.baidu.com/image/pic/item/5243fbf2b211931330751d8b6b380cd791238dd3.jpg"
        },
        {
          label: "图片二",
          value:
            "http://c.hiphotos.baidu.com/image/pic/item/a5c27d1ed21b0ef4b9e8896ad3c451da81cb3e85.jpg"
        },
        {
          label: "图片三",
          value:
            "http://c.hiphotos.baidu.com/image/h%3D300/sign=4482be3a8994a4c21523e12b3ef41bac/a8773912b31bb0516a13ec1d387adab44aede0d4.jpg"
        }
      ]
    };
  },
  methods: {
    // copy 功能
    copyInviteCode(val) {
      this.$refs.setCopy.value = val.toLowerCase();
      this.$refs.setCopy.select();
      document.execCommand("copy");
    },
    // 图片切换
    getImgURL(imgUrl) {
      this.changeImg = imgUrl;
    },
    // 下载图片
    downLoadImg() {
      this.isShow = true;
      console.log("下载");
    },
    isFenXiang() {},
    fenxiang() {
      this.isShow = false;
      this.$Message.success({
        content: "分享成功",
        duration: 10,
        closable: true
      });
    }
  },
  created() {
    this.inviteCode = JSON.parse(
      sessionStorage.userInfo
    ).user.inviteCode.toUpperCase();
    this.userName = `你的好友${
      JSON.parse(sessionStorage.userInfo).user.userName
    }邀请你加入原子联盟`;
  }
};
</script>

<style lang="less" scoped>
@import "../../common/css/mixin.less";
#myInvitation {
  display: flex;
  padding: 40px 0;
  .fx-left {
    flex: 1;
    text-align: left;
    margin-left: 100px;
    border-right: 1px dashed #ccc;
    width: 100%;
    .yzb-bg {
      h4 {
        font-size: 14px;
        position: relative;
        height: 40px;
        text-indent: 20px;
        margin-top: 60px;
        color: #333;
      }
      h4:nth-of-type(1) {
        margin-top: 0;
      }
      h4::before {
        content: "";
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 150px;
        height: 20px;
        .bgImg("../../assets/images/yaoqing_zhuangshi.png", contain);
      }
      .selsect {
        margin-top: 20px;
        .ivu-select-selection {
          height: 40px;
        }
        .inputs-yqm {
          width: 230px;
          border: 0;
          height: 44px;
          font-size: 18px;
          font-weight: bold;
          border-bottom: 1px solid #ccc;
          text-align: center;
          background-color: transparent;
          outline: none;
        }
      }
    }
    .download {
      width: 288px;
      height: 60px;
      margin: 80px auto 132px;
      font-size: 18px;
    }
  }
  .fx-right {
    flex: 1;
    width: 100%;
    .image-titles {
      text-align: center;
      margin-bottom: 15px;
    }
    .drawImg {
      width: 340px;
      height: 550px;
      margin: 0 auto;
      text-align: center;
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.8);
      img {
        width: 100%;
        height: 100%;
        // object-fit: cover;
      }
    }
  }
}
</style>