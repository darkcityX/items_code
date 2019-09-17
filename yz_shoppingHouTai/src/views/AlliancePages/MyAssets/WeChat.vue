<template>
  <div class="weChat">
    <!-- <p>【微信绑定】页面/【绑定成功】提示框</p> -->
    <Row>
      <Col span="12" offset="6">
        <p class="pageTitle">
          <span>绑定微信</span>
        </p>
        <div class="pageContent">
          <Row class="alipayCode">
            <Col span="8">
              <label>微信号:</label>
            </Col>
            <Col span="12">
              <Input v-model="weChatInfo.wechatId" placeholder="请输入微信号"/>
            </Col>
          </Row>
          <!-- <Row class="alipayUserName">
            <Col span="8">
              <label>姓名:</label>
            </Col>
            <Col span="12">
              <Input placeholder="请输入个人真实姓名"/>
            </Col>
          </Row> -->
        </div>
        <div class="submitBtn">
          <Row>
            <Col span="18" offset="4">
              <Button type="primary" @click="checkFrom();">绑定微信</Button>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
    <!-- 绑定成功提示框 -->
    <!-- 3、登陆成功跳转提示框 -->
    <div class="successBinding" v-show="isView">
      <Row>
        <Col span="4" offset="10">
          <div class="successTip">
            <p>绑定成功!</p>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
	export default {
		name: "weChat",
		data(){
			return {

				weChatInfo : {
					wechatId : '',					
				},

				isView : false

			}
		},
		methods: {
			// 表单验证
			checkFrom(){
				if (!this.weChatInfo.wechatId) {
					// 微信号验证
					this.$Message.error("请输入您的微信号!");
				}else{
					// 发送请求
					this.getBinding();
				}
			},
			// 发送请求
			getBinding(){
				console.log( "--------isView----------:" + this.isView );
				var _this = this;
				this.$axios.post('api/user/bindingWechat',{
					wechatId: this.weChatInfo.wechatId
				}).then(res=>{
					/* ------------------- 友好提示 ----------------- */ 
					this.isView = true;
					console.log( "----------isView----------------:" + this.isView );
					let id = setTimeout(function() {
						_this.isView = false;   
						clearTimeout(id);
					}, 3000);
					/* ------------- 更新当前本地存储 ---------------- */ 
					let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
					// console.log(" -- 更新前 -- ");
					// console.log( userInfo.user );

					userInfo.user.wechatId = this.weChatInfo.wechatId;
					sessionStorage.setItem("userInfo", JSON.stringify(userInfo));

					console.log(" -- 更新后 -- ");
					console.log( userInfo.user );
				}).catch(err=>{
					console.log( err );
					this.$Message.success("绑定失败，请稍后再试!");
				})
			}
		}
	};
</script>

<style lang="less">
.weChat {
  padding: 100px 0;
  min-height: 760px;
  .pageTitle {
    color: rgba(34, 34, 34, 1);
    font-size: 16px;
    font-weight: 400;
    span {
      position: relative;
      margin: 0 auto;
      padding: 0 10px;
      display: inline-block;
      height: 32px;
      border-bottom: 2px solid rgba(0, 160, 234, 1);
      &:after {
        position: absolute;
        top: 32px;
        left: 42%;
        display: block;
        content: "";
        width: 0;
        border: 8px solid #fff;
        border-color: transparent;
        border-top-color: #00a0ea;
      }
    }
  }
  .pageContent {
    margin: 40px 0;
    > div {
      margin-bottom: 20px;
      label {
        padding: 0 10px;
        display: block;
        font-size: 14px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        height: 50px;
        line-height: 50px;
        text-align: right;
        white-space: nowrap;
      }
      input {
        height: 50px;
      }
      .codeImg {
        padding-left: 10px;
        img {
          display: inline-block;
          width: 100%;
          height: 50px;
          border-radius: 4px;
          background: #ff0000;
        }
      }
    }
  }
  .submitBtn {
    button {
      width: 100%;
      font-size: 16px;
      height: 50px;
      background: #00a0ea;
    }
  }
  .successBinding {
    // display: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    .successTip {
      margin: 0 auto;
      margin-top: 100%;
      padding: 20px 0;
      width: 100%;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.6);
      p {
        font-size: 16px;
        color: #fff;
      }
    }
  }
}
</style>