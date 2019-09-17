<template>
  <div class="personalInformation">
    <!-- <p>【个人信息】页面</p> -->
    <Row>
      <Col span="12" offset="6">
        <div class="personalInformationContainer">
          <Row>
            <Col span="24">
              <!-- 1、顶部：头像上传 -->
              <div class="pageTop">
                <p class="title">个人资料</p>
                <div class="uploadAvater">
                  <div class="avaterContainer">
                    <Upload
                      :before-upload="uoloadBefore"
                      :on-success="uoloadSuccess"
                      :on-error="uoloadError"
                      :action="uploadAvater.action"
                      :max-size="uploadAvater.maxSize"
                      :format="uploadAvater.format"
                    >
                      <Button>
                        <img :src="userInfoFrom.userHead" alt>
                      </Button>
                    </Upload>
                  </div>

                  <p class="uploadTip">仅支持JPG、GIF、PNG、JPEG、BMP格式，文件小于4M</p>
                </div>
              </div>
              <!-- 表单 -->
              <div class="myInfoForm">
                <div class="phone">
                  <Row>
                    <Col span="8">
                      <label>手机号:</label>
                    </Col>
                    <Col span="16">
                      <Input
                        disabled
                        v-model="userInfoFrom.userMobile.substr(0,3)+'****'+userInfoFrom.userMobile.substr(7)"
                        placeholder="请输入电话号码"
                      />
                    </Col>
                    <span style="line-height:40px;margin-left:10px;" @click="editPhone">修改</span>
                  </Row>
                </div>
                <div class="nickname">
                  <Row>
                    <Col span="8">
                      <label>昵称:</label>
                    </Col>
                    <Col span="16">
                      <Input v-model="userInfoFrom.userName" placeholder="请输入昵称"/>
                    </Col>
                  </Row>
                </div>
                <!-- <div class="nickname">
                  <Row>
                    <Col span="8">
                      <label>邮箱:</label>
                    </Col>
                    <Col span="16">
                      <Input v-model="userInfoFrom.userEmail" placeholder="请输入您的邮箱"/>
                    </Col>
                  </Row>
                </div>-->
              </div>
              <!-- btn -->
              <div class="submitBtn">
                <Row>
                  <Col span="18" offset="6">
                    <Button type="info" @click="submitFrom">保存</Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>

    <!-- 修改密码弹窗 1 -->
    <Modal
      v-model="layerShow"
      title="修改登录手机号"
      width="600"
      @on-ok="phoneSuccess"
      @on-cancel="cancel"
    >
      <p class="phone">
        当前手机号：
        <span>{{userInfoFrom.userMobile.substr(0,3)+"****"+userInfoFrom.userMobile.substr(7)}}</span>
      </p>
      <p class="inputs">
        <span>短信验证码* ：</span>
        <input placeholder="请输入短信验证码" v-model="phoneVal" type="text">
        <Button type="primary" :disabled="btndis" @click="postREXP">{{btnText}}</Button>
      </p>
    </Modal>

    <!-- 修改密码弹窗 2 -->
    <Modal
      v-model="layerTwoShow"
      title="修改登录手机号"
      width="600"
      @on-ok="editOkPhone"
      @on-cancel="cancel"
    >
      <p class="inputs phone">
        <span class="phone-num">手机号码* ：</span>
        <input placeholder="请输入手机号码" v-model="newPhone.phone" type="text">
      </p>
      <p class="inputs">
        <span>短信验证码* ：</span>
        <input placeholder="请输入短信验证码" v-model="newPhone.code" type="text">
        <Button type="primary" @click="postREXP">{{btnText}}</Button>
      </p>
    </Modal>
  </div>
</template>

<script>
var times = 60;
export default {
  name: "personalInformation",
  data() {
    return {
      userInfoFrom: {
        userHead: require("./../../assets/images/ziliao_touxiang.png"),
        userMobile: "",
        userName: "",
        userEmail: ""
      },
      newPhone: {
        phone: "",
        code: ""
      },
      // session
      sessionUserInfo: {},
      layerShow: false,
      layerTwoShow: false,
      btndis: false,
      btnText: "发送验证码",
      phoneVal: "",
      // 图片上传
      fromData: new FormData(),
      uploadAvater: {
        action: "/api/admin/uploadImg",
        maxSize: 4090, // KB
        format: ["JPG", "GIF", "PNG", "JPEG", "BMP"]
      }
    };
  },
  created() {
    const userInfo = JSON.parse(sessionStorage.userInfo);

    this.userInfoFrom.userHead = userInfo.user.userHead;
    this.userInfoFrom.userMobile = userInfo.user.userMobile;
    this.userInfoFrom.userName = userInfo.user.userName;
    this.userInfoFrom.userEmail = userInfo.user.userEmail;

    this.sessionUserInfo = userInfo;

    // 如果上线放在服务端把这个注解掉就好了
    this.uploadAvater.action =
      window.location.origin + "/api" + "/api/admin/uploadImg";
  },
  methods: {
    cancel() {
      this.userInfoFrom.userMobile = JSON.parse(
        sessionStorage.userInfo
      ).user.userMobile;
    },
    // 第二次弹窗
    editOkPhone() {
      if (
        this.newPhone.phone.length == 11 &&
        this.newPhone.code.length == 6 &&
        /^1[34578]\d{9}$/.test(this.newPhone.phone) &&
        /^\d{6}$/g.test(this.newPhone.code)
      ) {
        // 验证code
        this.$axios
          .post("/api/admin/SMS_verification", {
            user_mobile: this.newPhone.phone,
            code: this.newPhone.code
          })
          .then(res => {
            if (res.code) {
              // 验证码成功之后请求修改手机号码的接口
              console.log(this.newPhone.phone);
              this.$axios
                .post("/api/admin/changeMobile", {
                  user_mobile: this.newPhone.phone
                })
                .then(res => {
                  this.Alerts("success", "修改成功!");
                  JSON.parse(
                    sessionStorage.userInfo
                  ).user.userMobile = this.newPhone.phone;

                  this.newPhone.code = "";
                  this.newPhone.phone = "";
                })
                .catch(err => this.Alerts("error", err.data.msg));
            }
          })
          // code失败执行
          .catch(err => {
            this.Alerts("error", "验证码输入错误");
            setTimeout(() => {
              this.phoneVal = "";
              this.layerTwoShow = true;
              this.newPhone.code = "";
              this.newPhone.phone = "";
            }, 10);
          });
      } else {
        this.Alerts("error", "验证码输入错误或电话号码输入错误");
        setTimeout(() => {
          this.phoneVal = "";
          this.layerTwoShow = true;
          this.newPhone.code = "";
          this.newPhone.phone = "";
        }, 10);
      }
    },
    // 第一次弹窗
    phoneSuccess() {
      if (this.phoneVal.length == 6 && !isNaN(Number(this.phoneVal))) {
        this.$axios
          .post("/api/admin/SMS_verification", {
            user_mobile: this.userInfoFrom.userMobile,
            code: this.phoneVal
          })
          .then(res => {
            if (res.code) {
              this.layerTwoShow = true; // 开启另一个弹窗
              this.phoneVal = "";
              this.userInfoFrom.userMobile = "";
            }
          })
          .catch(err => {
            this.Alerts("error", "验证码输入错误");
            setTimeout(() => {
              this.phoneVal = "";
              this.layerShow = true;
            }, 10);
          });
      } else {
        this.Alerts("error", "电话或验证码输入错误");
      }
    },
    // 提示封装
    Alerts(type, msg) {
      this.$Message[type]({
        content: msg,
        duration: 3,
        closable: true
      });
    },
    // 发送验证码
    postREXP() {
      this.$axios("/api/admin/SMS_phoneValidate", {
        params: {
          user_mobile: this.userInfoFrom.userMobile
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
    },
    submitFrom() {
      // console.log( this.userInfoFrom.userMobile );
      this.$axios
        .post("api/user/changeUserInfo", {
          userHead: this.userInfoFrom.userHead,
          userName: this.userInfoFrom.userName,
          userEmail: this.userInfoFrom.userEmail
        })
        .then(res => {
          // 修改成功友情提示
          this.$Message.success("信息修改成功!");

          //更新本地sessionStrong
          this.sessionUserInfo.user.userHead = this.userInfoFrom.userHead;
          this.sessionUserInfo.user.userMobile = this.userInfoFrom.userMobile;
          this.sessionUserInfo.user.userName = this.userInfoFrom.userName;
          this.sessionUserInfo.user.userEmail = this.userInfoFrom.userEmail;
          // console.log( this.sessionUserInfo );
          sessionStorage.setItem(
            "userInfo",
            JSON.stringify(this.sessionUserInfo)
          );

          // 设置store属性
          this.$store.dispatch("changeUser", this.sessionUserInfo.user);
          // console.log( JSON.parse(sessionStorage.getItem("userInfo")) );
        })
        .catch(err => {
          this.$Message.error("信息修改失败,请稍后再试!");
        });
    },
    // 上传之前
    uoloadBefore(file) {
      this.Alerts("info", "图片上传中");
    },
    // 上传成功
    uoloadSuccess(response, file, fileList) {
      if (response.code == 100) {
        this.Alerts("success", "图片上传成功");
        this.userInfoFrom.userHead = response.data.URL.readPath; //  赋值
      } else {
        this.Alerts("error", "图片上传失败");
      }
    },
    // 上传失败
    uoloadError(error, file, fileList) {
      this.Alerts("error", "图片上传失败");
      console.log(error);
    },
    // 显示弹出层
    editPhone() {
      this.layerShow = true;
    }
  }
};
</script>

<style lang="less">
.ivu-col .ivu-col-span-24 {
  width: auto;
}
.personalInformation {
  min-height: 760px;
  .personalInformationContainer {
    margin-top: 10%;
    .pageTop {
      .title {
        color: rgba(51, 51, 51, 1);
        font-size: 16px;
        font-weight: 400;
      }
      .uploadAvater {
        // background: red;
        margin: 30px 0;
        .avaterContainer {
          margin: 0 auto;
          max-width: 130px;
          min-width: 130px;
          max-height: 130px;
          min-height: 130px;
          border-radius: 50%;
          .ivu-upload {
            .ivu-btn {
              outline: none;
              padding: 0;
              width: 130px;
              height: 130px;
              line-height: 0;
              border: none;
              img {
                width: 130px;
                height: 130px;
                border-radius: 50%;
                object-fit: cover;
              }
            }
          }
          .ivu-upload-list {
            display: none;
          }
        }
        .uploadTip {
          margin-top: 30px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
    .myInfoForm {
      text-align: left;
      width: 500px;
      margin-left: -60px;
      span {
        position: absolute;
        right: -50px;
        top: 5px;
        cursor: pointer;
        color: #00a0ea;
        font-size: 14px;
      }
      .ivu-col {
        margin-bottom: 10px;
        label {
          padding-right: 10px;
          display: inline-block;
          width: 100%;
          height: 50px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 50px;
          text-align: right;
        }
        input {
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          height: 50px;
          display: inline-block;
        }
        span {
          display: inline-block;
        }
      }
    }
    .submitBtn {
      margin-top: 60px;
      margin-left: -60px;
      button {
        width: 300px;
        height: 50px;
      }
    }
  }
}

// replace iview
.ivu-modal-body {
  font-size: 14px;
  padding: 60px 36px;
  .phone {
    margin-bottom: 40px;
    .phone-num {
      margin-left: 16px;
    }
  }
  .inputs {
    input {
      width: 260px;
      height: 50px;
      box-sizing: border-box;
      padding: 10px;
      border: 0;
      border: 1px solid #eee;
      outline: none;
      border-radius: 4px;
      font-size: 14px;
    }
    button {
      padding: 14px 19px;
      margin-left: 12px;
      font-size: 14px;
    }
  }
}
</style>
