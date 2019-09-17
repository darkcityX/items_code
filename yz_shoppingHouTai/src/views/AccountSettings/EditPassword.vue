<template>
  <div id="changePassword">
    <h4 class="editpwd_titles">修改原子联盟密码</h4>
    <div class="changedatas">
      <ul>
        <li class="phone">
          <label>手机号*</label>
          <input v-model="change.phone" type="text" placeholder="请输入手机号码">
        </li>
        <li class="code">
          <label>校验码*</label>
          <input v-model="change.code" type="text" placeholder="请输入校验码">
          <span class="codeImg">
            <Sidentify :identifyCode="identifyCode"></Sidentify>
            <span @click="refreshCode">看不清楚换一张</span>
          </span>
        </li>
        <li class="oldPwd">
          <label>请输入原密码*</label>
          <input v-model="change.oldPwd" type="text" placeholder="请输入原密码">
          <router-link to="/telChangePwd">忘记密码</router-link>
        </li>
        <li class="newPassword">
          <label>请输入新密码*</label>
          <input v-model="change.newPwd" type="text" placeholder="6~15个字符，数字，字母组合">
        </li>
        <li class="newPassword">
          <label>确认密码*</label>
          <input v-model="change.isOkPwd" type="text" placeholder="请再次输入密码">
        </li>
      </ul>
      <Button type="primary" @click="changedPwd" class="editPwdBtn">修改密码</Button>
    </div>
  </div>
</template>

<script>
import Sidentify from "@/components/identify.vue";
export default {
  name: "changePassword",
  data() {
    return {
      // 校验码组件数据
      identifyCodes: "1234567890",
      identifyCode: "",
      change: {
        phone: "",
        code: "",
        oldPwd: "",
        newPwd: "",
        isOkPwd: ""
      }
    };
  },
  methods: {
    changedPwd() {
      if (this.change.code == this.identifyCode) {
        if (
          /^1[34578]\d{9}$/.test(this.change.phone) &&
          this.change.newPwd == this.change.isOkPwd &&
          this.change.oldPwd
        ) {
          // this.$axios.post('')
        } else {
          this.$Message.error({
            content: "两次密码不一致或新手机号不能为空",
            duration: 3,
            closable: true
          });
        }
      } else {
        this.$Message.error({
          content: "验证码输入错误",
          duration: 3,
          closable: true
        });
      }
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
  },
  created() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  components: {
    Sidentify
  }
};
</script>

<style scoped lang="less">
#changePassword {
  height: 700px;
  .editpwd_titles {
    padding: 60px 0 50px;
  }
  .changedatas {
    text-align: left;
    ul {
      margin: 0 auto;
      width: 780px;
      li {
        margin-bottom: 40px;
        label {
          width: 120px;
          display: inline-block;
          text-align: right;
          margin-right: 6px;
        }
        input {
          width: 400px;
          height: 50px;
          box-sizing: border-box;
          padding: 20px;
          font-size: 14px;
          outline: none;
          border: 0;
          border-radius: 4px;
          border: 1px solid #333;
        }
        .codeImg {
          cursor: pointer;
          margin-left: 20px;
          display: inline-block;
          vertical-align: middle;
          .s-canvas {
            display: inline-block;
          }
          span {
            display: inline-block;
            font-size: 14px;
          }
        }
      }
      .oldPwd {
        a {
          text-decoration: underline;
          margin-left: 20px;
        }
      }
    }
    .editPwdBtn {
      margin: 0 auto;
      display: block;
      width: 480px;
      height: 60px;
      font-size: 16px;
    }
  }
}
</style>