<template>
  <div id="changePassword">
    <h4 class="editpwd_titles">
      <img src="../assets/images/zhuce_logo.png" alt>
    </h4>
    <div class="changedatas">
      <ul>
        <li class="phone">
          <label>手机号*</label>
          <input v-model="change.phone" type="text" placeholder="请输入手机号码">
        </li>
        <li class="code">
          <label>校验码*</label>
          <input v-model="change.imgCode" type="text" placeholder="请输入校验码">
          <span class="codeImg">
            <Sidentify :identifyCode="identifyCode"></Sidentify>
            <span @click="refreshCode">看不清楚换一张</span>
          </span>
        </li>
        <li class="oldPwd">
          <label>验证码*</label>
          <input v-model="change.code" type="text" placeholder="请输入验证码">
          <Button :disabled="btndis" @click="postCode">{{btnText}}</Button>
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
var times = 60;
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
        imgCode: "",
        newPwd: "",
        isOkPwd: ""
      },
      btnText: "发送验证码",
      btndis: false
    };
  },
  methods: {
    postCode() {
      if (/^1[34578]\d{9}$/.test(this.change.phone)) {
        this.$axios("/api/admin/SMS_phoneValidate", {
          params: {
            user_mobile: this.change.phone
          }
        }).then(res => {
          this.time = setInterval(() => {
            if (times > 1) {
              this.btndis = true;
              times--;
              this.btnText = `${times < 10 ? "0" + times : times} 秒后重新发送`;
            } else {
              clearInterval(this.time);
              this.btndis = false;
              this.btnText = `发送验证码`;
              times = 120;
            }
          }, 1000);
        });
      } else {
        this.Alets("error", "手机号码输入有误");
      }
    },
    changedPwd() {
      if (this.change.imgCode == this.identifyCode) {
        if (this.change.code) {
          this.$axios
            .post("/api/admin/SMS_verification", {
              user_mobile: this.change.phone,
              code: this.change.code
            })
            .then(res => {
              if (this.change.newPwd == this.change.isOkPwd) {
                this.$axios
                  .post("/api/admin/forgetPassword", {
                    newPassword: this.change.newPwd,
                    rePassword: this.change.isOkPwd,
                    user_mobile: this.change.phone
                  })
                  .then(res => {
                    this.Alets("success", "密码修改成功");
                    this.$router.push(
                      "/accountSettingsPage/personalInformation"
                    );
                  })
                  .catch(res => this.Alets("success", res.data.msg));
              }
            })
            .catch(err => this.Alets("error", "验证码输入错误"));
        } else {
        }
      } else {
        this.Alets("error", "效验码输入错误");
      }
    },
    Alets(type, msg) {
      this.$Message[type]({
        content: msg,
        duration: 3,
        closable: true
      });
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
  width: 1200px;
  margin: 0 auto 20px;
  padding-bottom: 50px;
  background-color: #fff;
  .editpwd_titles {
    margin: 30px auto 60px;
    padding-top: 30px;
    text-align: center;
  }
  .changedatas {
    text-align: left;
    ul {
      margin: 0 auto;
      width: 780px;
      margin-left: 52%;
      transform: translateX(-50%);
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
        button {
          height: 50px;
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
<style>
body {
  background-color: #f5f5f5;
}
</style>
